"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  IconButton,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageIcon from "@mui/icons-material/Image";
import Navbar from "@/app/navbar/page";
import AfterLogin from "@/app/navbar/AfterLogin"
import { useAuth } from "@/app/context/AuthProvider";
import { useRouter } from "next/navigation";

interface Comment {
  _id: string;
  userName: string;
  content: string;
  replies: Comment[];
}

interface Post {
  _id: string;
  title: string;
  detail: string;
  postImage: string;
  views: any[];
  comments: Comment[];
  likes: any[];
  userId: string;
  userName: string;
  tags: string[];
  createdAt: string;
  likeCount: number;
  likedUsers: string[];
}

export default function Page() {
  const { isLoggedIn, user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const [updatedLikes, setUpdatedLikes] = useState<{ [key: string]: number }>({});
  const [selectedTag, setSelectedTag] = useState<string>("ทั้งหมด");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLike = async (postId: string) => {
    if (!user?.userId) {
      alert("กรุณาเข้าสู่ระบบเพื่อทำการไลค์");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/contents/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.userId }),
      });

      if (!res.ok) throw new Error("Failed to update like status");

      const updatedPost = await res.json();

      // อัปเดตสถานะไลค์
      setLiked(prev => ({
        ...prev,
        [postId]: updatedPost.likedUsers.includes(user.userId)
      }));

      // อัปเดตจำนวนไลค์
      setUpdatedLikes(prev => ({
        ...prev,
        [postId]: updatedPost.likeCount
      }));

      // อัพเดท state ของโพสต์
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              likes: updatedPost.likedUsers,
              likeCount: updatedPost.likeCount
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handlePostClick = (postId: string) => {
    try {
      router.push(`/home/highlights/${postId}`);
    } catch (error) {
      console.error("Error navigating to post:", error);
    }
  };

  // เพิ่มฟังก์ชันการจัดเรียง
  const sortPosts = (posts: Post[], sortType: string) => {
    const sortedPosts = [...posts];
    switch (sortType) {
      case "newest":
        return sortedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "oldest":
        return sortedPosts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case "mostLikes":
        return sortedPosts.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
      case "mostViews":
        return sortedPosts.sort((a, b) => (b.views?.length || 0) - (a.views?.length || 0));
      default:
        return sortedPosts;
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/contents/all");
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);

        // รวบรวมแท็กที่มีทั้งหมด
        const tags = new Set<string>();
        data.forEach((post: Post) => {
          post.tags?.forEach(tag => tags.add(tag));
        });
        setAvailableTags(["ทั้งหมด", ...Array.from(tags)]);

        if (user?.userId) {
          const initialLikedState: { [key: string]: boolean } = {};
          const initialLikesCount: { [key: string]: number } = {};

          data.forEach((post: Post) => {
            initialLikedState[post._id] = post.likes?.includes(user.userId) || false;
            initialLikesCount[post._id] = post.likes?.length || 0;
          });

          setLiked(initialLikedState);
          setUpdatedLikes(initialLikesCount);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error instanceof Error ? error.message : "Failed to load posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  // เพิ่มฟังก์ชันการกรองตามแท็ก
  useEffect(() => {
    let filtered = [...posts];
    if (selectedTag !== "ทั้งหมด") {
      filtered = filtered.filter(post => post.tags?.includes(selectedTag));
    }
    const sorted = sortPosts(filtered, sortBy);
    setFilteredPosts(sorted);
  }, [selectedTag, sortBy, posts]);

  // แปลงเวลาให้เป็นรูปแบบที่ต้องการ
  const formatTimeAgo = (createdAt: string) => {
    if (!createdAt) return '';

    try {
      const now = new Date();
      const postDate = new Date(createdAt);
      const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60));

      if (diffInMinutes < 60) {
        return `${diffInMinutes} นาที`;
      } else if (diffInMinutes < 1440) {
        return `${Math.floor(diffInMinutes / 60)} ชั่วโมง`;
      } else {
        return `${Math.floor(diffInMinutes / 1440)} วัน`;
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return '';
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
        {/* Sidebar and Navbar */}
        {isLoggedIn ? (
          <AfterLogin
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            handleSearch={handleSearch}
          />
        ) : (
          <Navbar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            handleSearch={handleSearch}
          />
        )}


        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: isSidebarOpen ? "240px" : "72px",
            transition: "margin-left 0.3s",
            paddingTop: "80px",
            paddingX: 2,
            paddingBottom: 2,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "#98c9a3",
              marginBottom: "30px",
              borderBottom: "2px solid #c9dbc4",
              display: "inline-block",
              paddingBottom: "5px",
            }}
          >
            บทความน่าสนใจ
          </Typography>

          {/* เพิ่มส่วนตัวกรองและการเรียงลำดับ */}
          <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>หมวดหมู่</InputLabel>
              <Select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                label="หมวดหมู่"
              >
                {availableTags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>เรียงลำดับ</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="เรียงลำดับ"
              >
                <MenuItem value="newest">ล่าสุด</MenuItem>
                <MenuItem value="oldest">เก่าสุด</MenuItem>
                <MenuItem value="mostLikes">ยอดไลค์มากที่สุด</MenuItem>
                <MenuItem value="mostViews">ยอดดูมากที่สุด</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Typography>กำลังโหลด...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Typography color="error">{error}</Typography>
            </Box>
          ) : filteredPosts.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Typography>ไม่พบบทความ</Typography>
            </Box>
          ) : (
            <List sx={{
              bgcolor: 'background.paper',
              borderRadius: 1,
              boxShadow: 1,
              overflow: 'hidden'
            }}>
              {filteredPosts.map((post) => (
                <ListItem
                  key={post._id}
                  alignItems="flex-start"
                  onClick={() => handlePostClick(post._id)}
                  sx={{
                    borderBottom: '1px solid #eee',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)'
                    },
                    cursor: 'pointer',
                    padding: 2
                  }}
                >
                  <Box sx={{
                    width: '100%',
                    display: 'flex',
                    gap: 2
                  }}>
                    {/* รูปภาพประจำโพสต์ */}
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        flexShrink: 0,
                        borderRadius: 1,
                        overflow: 'hidden',
                        bgcolor: 'grey.100'
                      }}
                    >
                      {post.postImage ? (
                        <img
                          src={post.postImage}
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'grey.200'
                          }}
                        >
                          <ImageIcon sx={{ color: 'grey.400' }} />
                        </Box>
                      )}
                    </Box>

                    {/* เนื้อหาโพสต์ */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 'bold',
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {post.title || 'ไม่มีชื่อบทความ'}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: 2 }}
                        >
                          {formatTimeAgo(post.createdAt)}
                        </Typography>
                      </Box>

                      {/* แสดงส่วนของเนื้อหาโพสต์ */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          mb: 1
                        }}
                      >
                        {post.detail || 'ไม่มีรายละเอียด'}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CommentIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {Array.isArray(post.comments) ? post.comments.length : 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(post._id);
                            }}
                            color={liked[post._id] ? "error" : "default"}
                          >
                            {liked[post._id] ? (
                              <FavoriteIcon />
                            ) : (
                              <FavoriteIcon />
                            )}
                          </IconButton>
                          <Typography variant="body2" color="text.secondary">
                            {updatedLikes[post._id] || post.likes?.length || 0} likes
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 'auto' }}
                        >
                          โดย {post.userName || 'ไม่ระบุชื่อ'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* แสดงแท็กของบทความ */}
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {post.tags?.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                        sx={{ backgroundColor: '#c9dbc4' }}
                      />
                    ))}
                  </Stack>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Container>
  );
}