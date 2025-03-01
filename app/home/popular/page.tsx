"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { Visibility, Comment, ThumbUp, Whatshot as WhatshotIcon } from "@mui/icons-material";
import axios from "axios";
import Navbar from "@/app/navbar/page";
import AfterLogin from "@/app/navbar/AfterLogin";
import { useAuth } from "@/app/context/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

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
  likeCount: number;
  createdAt: string;
  isRecent?: boolean;
}

interface Comment {
  _id: string;
  userName: string;
  content: string;
  replies: Comment[];
}

export default function PopularPage() {
  const { isLoggedIn, user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // จัดการ Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // จัดการการค้นหา
  const handleSearch = (query: string) => {
    // ตอนนี้ยังไม่มีฟังก์ชันค้นหา สามารถเพิ่มเติมได้ในอนาคต
    console.log('Search query:', query);
  };

  // ดึงข้อมูลจาก API
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Post[]>('http://localhost:3001/contents/all');
      
      // คำนวณบทความมาแรงในช่วง 24 ชั่วโมง
      const last24Hours = new Date();
      last24Hours.setHours(last24Hours.getHours() - 24);

      const trendingPosts = response.data
        .map((post) => ({
          ...post,
          likeCount: Array.isArray(post.likes) ? post.likes.length : 0,
          isRecent: new Date(post.createdAt) > last24Hours
        }))
        .sort((a, b) => {
          // ถ้าโพสต์อยู่ในช่วง 24 ชั่วโมง ให้พิจารณาจำนวนไลค์เป็นหลัก
          if (a.isRecent && b.isRecent) {
            return b.likeCount - a.likeCount;
          }
          // ถ้าโพสต์เก่ากว่า 24 ชั่วโมง ให้พิจารณาจำนวนวิวเป็นหลัก
          return (Array.isArray(b.views) ? b.views.length : 0) - 
                 (Array.isArray(a.views) ? a.views.length : 0);
        });

      setPosts(trendingPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      Swal.fire({
        title: "Error!",
        text: "ไม่สามารถโหลดข้อมูลบทความได้",
        icon: "error",
        confirmButtonText: "ตกลง"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // จัดการการคลิกที่บทความ
  const handlePostClick = async (postId: string) => {
    if (!user?.userId) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "กรุณาเข้าสู่ระบบก่อนเข้าชมบทความ",
        icon: "warning",
        confirmButtonText: "เข้าสู่ระบบ",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/signin");
        }
      });
      return;
    }

    try {
      await axios.post(`http://localhost:3001/contents/updateViews/${postId}`, {
        userId: user.userId
      });
      router.push(`/home/highlights/${postId}`);
    } catch (error) {
      console.error("Error updating views:", error);
      Swal.fire({
        title: "Error!",
        text: "เกิดข้อผิดพลาดในการอัพเดทจำนวนการดู",
        icon: "error",
        confirmButtonText: "ตกลง"
      });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <Typography>กำลังโหลด...</Typography>
          </Box>
        ) : posts.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
            ไม่พบบทความ
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {posts.map((post, index) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardActionArea onClick={() => handlePostClick(post._id)}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={post.postImage || '/default-post-image.jpg'}
                        alt={post.title}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          bgcolor: 'primary.main',
                          color: 'white',
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.875rem'
                        }}
                      >
                        #{index + 1}
                      </Box>
                      {/* แสดงแบดจ์ "มาแรง" สำหรับบทความที่มีไลค์เยอะในช่วง 24 ชั่วโมง */}
                      {post.isRecent && post.likeCount >= 5 && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'error.main',
                            color: 'white',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          <WhatshotIcon fontSize="small" />
                          มาแรง
                        </Box>
                      )}
                    </Box>
                    <CardContent>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography 
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {post.detail}
                      </Typography>
                      
                      <Box sx={{ 
                        mt: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid rgba(0,0,0,0.1)',
                        pt: 2
                      }}>
                        <Typography variant="body2" color="text.secondary">
                          {post.userName}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Visibility sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {Array.isArray(post.views) ? post.views.length : 0}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Comment sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {Array.isArray(post.comments) ? post.comments.length + 
                                post.comments.reduce((acc, comment) => 
                                  acc + (comment.replies?.length || 0), 0) : 0}
                            </Typography>
                          </Box>
                          {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ThumbUp sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {post.likeCount || 0}
                            </Typography>
                          </Box> */}
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
