"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Link from "next/link";
import { Visibility, Comment, ThumbUp } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Navbar from "@/app/navbar/page";
import AfterLogin from "@/app/navbar/AfterLogin";
import { useAuth } from "@/app/context/AuthProvider";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AppsIcon from "@mui/icons-material/Apps";
import { Menu, MenuItem, Checkbox } from "@mui/material";
import { Chip } from "@mui/material";
import Swal from "sweetalert2";

interface Post {
  _id: string;
  title: string;
  detail: string;
  postImage: string;
  views: number;
  comments: number;
  likes: number;
  userId: string;
  userName: string;
  tags: string[];
}
interface Comment {
  _id: string;
  userName: string;
  content: string;
  replies: Comment[];
}

export default function Page() {
  const { isLoggedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<Post[]>([]);
  const [filteredData, setFilteredData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.userId; // ตรวจสอบว่า userId มีค่าหรือไม่
  const [comments, setComments] = useState<Comment[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:3001/contents/all");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result: Post[] = await res.json();
        console.log("Fetched data:", result); // เพิ่ม logging เพื่อ debug
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch posts");
        Swal.fire({
          title: "Error!",
          text: "ไม่สามารถโหลดข้อมูลบทความได้",
          icon: "error",
          confirmButtonText: "ตกลง"
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...data];
    
    // กรองตาม search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.detail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // กรองตาม categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((post) =>
        selectedCategories.some((category) => post.tags.includes(category))
      );
    }
    
    console.log("Filtered data:", filtered); // เพิ่ม logging เพื่อ debug
    setFilteredData(filtered);
  }, [searchQuery, selectedCategories, data]);

  const handleCardClick = async (postId: string) => {
    if (!userId) {
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
      await fetch(`http://localhost:3001/contents/updateViews/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      router.push(`/home/highlights/${postId}`);
    } catch (error) {
      console.error("Error updating views:", error);
      Swal.fire({
        title: "Error!",
        text: "เกิดข้อผิดพลาดในการเข้าชมบทความ",
        icon: "error",
        confirmButtonText: "ตกลง"
      });
    }
  };
  const blogCategories = [
    "เทคโนโลยี",
    "สุขภาพ",
    "อาหาร",
    "ท่องเที่ยว",
    "การเงิน",
    "ธุรกิจ",
    "ไลฟ์สไตล์",
    "การศึกษา",
    "ศิลปะ",
    "วิทยาศาสตร์",
    "กีฬา",
    "ดนตรี",
    "การ์ตูน",
    "อนิเมะ",
    "ภาพยนต์"
  ];
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((item) => item !== category)
        : [...prevSelectedCategories, category]
    );
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar and Navbar */}
      {isLoggedIn ? <AfterLogin
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleSearch={handleSearch}
      /> :
        <Navbar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          handleSearch={handleSearch}
        />}
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
        <Box
          sx={{
            // backgroundColor: "#f6f6e7",
            // borderRadius: 2,
            // border: "2px solid #c9dbc4",
            padding: 3,
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
            บทความทั้งหมด
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", mb: 3 }}>
            {/* ปุ่มเลือกหมวดหมู่ */}
            <Button
              variant="contained"
              sx={{ display: "flex", alignItems: "center", fontSize: 14 }}
              onClick={handleClick}
            >
              <AppsIcon sx={{ fontSize: 20, mr: 1 }} />
              หมวดหมู่
            </Button>

            {/* เมนูเลือกหมวดหมู่ */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Grid container spacing={2} sx={{ width: 350 }}>
                {blogCategories.map((category) => (
                  <Grid item xs={6} key={category}>
                    <MenuItem onClick={() => handleCategoryChange(category)}>
                      <Checkbox checked={selectedCategories.includes(category)} />
                      <ListItemText primary={category} />
                    </MenuItem>
                  </Grid>
                ))}
              </Grid>
            </Menu>

            {/* แสดงแท็กที่เลือก */}
            {selectedCategories.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                {selectedCategories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onDelete={() => handleCategoryChange(category)} // กดลบได้
                    sx={{ backgroundColor: "#98c9a3", color: "#fff" }}
                  />
                ))}
              </Box>
            )}
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Typography>กำลังโหลดข้อมูล...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Typography color="error">{error}</Typography>
            </Box>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {filteredData.length > 0 ? (
                filteredData.map((post) => (
                  <RegionCard key={post._id} post={post} />
                ))
              ) : (
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", marginTop: "20px" }}
                >
                  ไม่พบข้อมูลที่ค้นหา
                </Typography>
              )}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function Sb({
  isOpen,
  toggleSidebar,
  searchQuery,
  setSearchQuery,
  handleSearch,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (query: string) => void;
}) {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 3px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #ddd",
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconButton
              size="large"
              edge="start"
              onClick={toggleSidebar}
              sx={{ color: "#000" }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/">
              <img
                src="/images/logo-blogs.png"
                alt="Logo"
                style={{ maxWidth: "142px", height: "auto" }} 
              />
            </Link>
          </Box>
          <TextField
            placeholder="ค้นหา"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => handleSearch(searchQuery)}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{ width: "60%" }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link href="/signin">
              <Button>เข้าสู่ระบบ</Button>
            </Link>
            <Link href="/signup">
              <Button variant="contained">ลงทะเบียน</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: isOpen ? 240 : 72,
          height: "100vh",
          backgroundColor: "#fff",
          transition: "width 0.3s",
          position: "fixed",
          top: 64,
          left: 0,
          zIndex: 1200,
          overflow: "hidden",
          boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List>
          <Link href="/home/highlights">
            <ListItem
              component="button"
              sx={{
                display: "flex",
                flexDirection: isOpen ? "row" : "column",
                alignItems: "center",
                justifyContent: isOpen ? "flex-start" : "center",
                padding: isOpen ? "12px 20px" : "12px 0",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  color: "#000",
                  minWidth: "40px",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              {isOpen && (
                <ListItemText primary="หน้าหลัก" sx={{ color: "#000" }} />
              )}
            </ListItem>
          </Link>
          <Link href="/home/article">
            <ListItem
              component="button"
              sx={{
                display: "flex",
                flexDirection: isOpen ? "row" : "column",
                alignItems: "center",
                justifyContent: isOpen ? "flex-start" : "center",
                padding: isOpen ? "12px 20px" : "12px 0",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  color: "#000",
                  minWidth: "40px",
                }}
              >
                <ArticleIcon />
              </ListItemIcon>
              {isOpen && (
                <ListItemText primary="น่าสนใจ" sx={{ color: "#000" }} />
              )}
            </ListItem>
          </Link>
          <Link href="/home/popular">
            <ListItem
              component="button"
              sx={{
                display: "flex",
                flexDirection: isOpen ? "row" : "column",
                alignItems: "center",
                justifyContent: isOpen ? "flex-start" : "center",
                padding: isOpen ? "12px 20px" : "12px 0",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  color: "#000",
                  minWidth: "40px",
                }}
              >
                <WhatshotIcon />
              </ListItemIcon>
              {isOpen && (
                <ListItemText primary="มาแรง" sx={{ color: "#000" }} />
              )}
            </ListItem>
          </Link>
        </List>
      </Box>
    </>
  );
}

async function fetchComments(postId: string) {
  try {
    const res = await fetch(`http://localhost:3001/comments/content/${postId}`);
    if (!res.ok) throw new Error("Failed to fetch comments");

    const result = await res.json();
    return result; // ส่งกลับข้อมูลคอมเมนต์ทั้งหมด (รวมทั้งการตอบกลับ)
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

function RegionCard({ post }: { post: Post }) {
  const router = useRouter();
  const { user } = useAuth(); // ดึง user จาก Context
  const userId = user?.userId; // ตรวจสอบว่า userId มีค่าหรือไม่
  const [comments, setComments] = useState<Comment[]>([]);

  const handleCardClick = async (postId: string) => {
    if (!userId) {
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
      // ส่ง request เพื่ออัปเดตยอดวิว
      await fetch(`http://localhost:3001/contents/updateViews/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      router.push(`/home/highlights/${postId}`);
    } catch (error) {
      console.error("Error updating views:", error);
      Swal.fire({
        title: "Error!",
        text: "เกิดข้อผิดพลาดในการเข้าชมบทความ",
        icon: "error",
        confirmButtonText: "ตกลง"
      });
    }
  };

  useEffect(() => {
    async function loadComments() {
      const fetchedComments = await fetchComments(post._id);
      setComments(fetchedComments);
    }
    loadComments();
  }, [post._id]);
  const totalComments =
    comments.length +
    comments.reduce((acc, comment) => acc + (comment.replies?.length || 0), 0);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
          },
          backgroundColor: "var(--post-bg)",
          color: "var(--post-text)",
        }}
      >
        <Box
          sx={{
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            position: "relative",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
            },
            backgroundColor: "var(--post-bg)",
            color: "var(--post-text)",
          }}
        >
          <CardActionArea onClick={() => handleCardClick(post._id)}>
            <CardMedia
              component="img"
              height="150"
              image={post.postImage || "https://via.placeholder.com/150"}
              alt={post.title || "ยังไม่มีรูปภาพ"}
              sx={{
                objectFit: "cover",
                borderRadius: "8px",
                height: "150px",
              }}
            />

            <CardContent>
              <Typography variant="h6">{post.title}</Typography>

            </CardContent>
          </CardActionArea>
          <Box
            sx={{
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              position: "relative",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              },
              backgroundColor: "var(--post-bg)",
              color: "var(--post-text)",
            }}
          >
            <Box
              sx={{
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                position: "relative",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                },
                backgroundColor: "#f6f6e7",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: "10px",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", fontSize: 12 }}>
                  <Typography sx={{ mr: 1, fontSize: 12, fontWeight: "bold", color: "var(--nav-text)" }}>
                    {post.userName}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ ml: 1, mr: 1, fontSize: 12, color: "var(--nav-text)" }} variant="body2">
                    การอ่าน {Array.isArray(post.views) ? post.views.length : 0}{" "}
                    ครั้ง
                  </Typography>
                  <CommentIcon color="action" fontSize="small" />
                  <Typography sx={{ ml: 1, fontSize: 12, color: "var(--nav-text)" }} variant="body2">
                    {totalComments}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}
