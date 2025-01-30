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
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';


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
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.userId; // ตรวจสอบว่า userId มีค่าหรือไม่
  const [comments, setComments] = useState<Comment[]>([]);
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3001/contents/all");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result: Post[] = await res.json();
        console.log(result); // ตรวจสอบ postImage ใน console
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
  
    if (!query.trim()) {
      setFilteredData(data);
      return;
    }
  
    try {
      console.log(`🔍 Searching for: '${query}'`);
      const encodedQuery = encodeURIComponent(query);
      const res = await fetch(`http://localhost:3001/contents/${encodedQuery}`);
      console.log(" API Response:", res.status, res.statusText);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Search API Error:", res.status, errorText);
        throw new Error(`Failed to fetch search results`);
      }

      const searchResults: Post = await res.json();
      console.log("Search Results:", searchResults);

      // ถ้า API คืนเป็น Object เดียว ต้องใส่ลงใน Array เพื่อให้ .map() ใช้งานได้
      setFilteredData([searchResults]);
    } catch (error) {
      console.error("Error during search:", error);
      setFilteredData([]);
    }
};

  const handleCardClick = async (postId: string) => {
    if (!userId) {
      console.error("User ID is not available");
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
    }
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
        </Box>
      </Box>
    </Box>
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
      console.error("User ID is not available");
      alert('กรุณาเข้าสู่ระบบ')
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
    }
  };

  useEffect(() => {
    async function loadComments() {
      const fetchedComments = await fetchComments(post._id);
      setComments(fetchedComments);
    }
    loadComments();
  }, [post._id]);
  const totalComments = comments.length + comments.reduce((acc, comment) => acc + (comment.replies?.length || 0), 0);


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
          backgroundColor: "#f6f6e7",
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
            {/* <Typography variant="body2"></Typography> */}
          </CardContent>
        </CardActionArea>
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", fontSize: 12 }}>
            <Typography sx={{ mr: 1, fontSize: 12, fontWeight: 'bold' }}>
              {post.userId}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ ml: 1,mr:1, fontSize: 12 }} variant="body2">
          การอ่าน {Array.isArray(post.views) ? post.views.length : 0} ครั้ง
          </Typography>
            <CommentIcon color="action" fontSize="small" />
            <Typography sx={{ ml: 1, fontSize: 12 }} variant="body2">
              {totalComments}
            </Typography>
          </Box>
        </Box>
      </Card>
      
    </Grid>
    
  );
}
