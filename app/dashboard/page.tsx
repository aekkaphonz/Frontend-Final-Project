"use client";

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography, Container, Box } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Navbar from "@/app/navbar/page";
import AutherAfterLogin from "@/app/navbar/AutherAfterLogin";
import { useAuth } from "@/app/context/AuthProvider";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  border: "1px solid #EBE8E8",
  boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.3)",
  borderRadius: 15,
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Page() {
  const { user, isLoggedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("กำลังโหลด...");
  const [profileImage, setProfileImage] = useState("");
  const [totalViews, setTotalViews] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/profile", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUserName(data[0]?.userName || "ไม่ทราบชื่อ");
      setProfileImage(data[0]?.profileImage || "https://via.placeholder.com/100");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchTotalPosts = async () => { 
    if (!user?.userId) return; // ถ้าไม่มี userId ไม่ต้องโหลดข้อมูล

    try {
      const response = await fetch(`http://localhost:3001/contents?userId=${user.userId}`);
      if (!response.ok) throw new Error("Failed to fetch posts");

      const posts = await response.json();
      setTotalPosts(posts.length); // นับจำนวนโพสต์ทั้งหมด
    } catch (error) {
      console.error("Error fetching total posts:", error);
    }
  };

  const fetchTotalViews = async () => {
    if (!user?.userId) return; // ถ้าไม่มี userId ไม่ต้องโหลดข้อมูล

    try {
      const response = await fetch(`http://localhost:3001/contents?userId=${user.userId}`);
      if (!response.ok) throw new Error("Failed to fetch posts");

      const posts = await response.json();

      const total = posts.reduce((sum: number, post: any) => {
        if (Array.isArray(post.views)) {
          return sum + post.views.length;
        } else if (typeof post.viewCount === "number") {
          return sum + post.viewCount;
        }
        return sum;
      }, 0);

      setTotalViews(total);
    } catch (error) {
      console.error("Error fetching total views:", error);
    }
  };

  const fetchTotalComments = async () => {
    if (!user?.userId) return;
  
    try {
      const response = await fetch(`http://localhost:3001/contents?userId=${user.userId}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const posts = await response.json();
  
      let totalComments = 0;
      for (const post of posts) {
        const commentResponse = await fetch(`http://localhost:3001/comments/content/${post._id}`);
        if (!commentResponse.ok) throw new Error('Failed to fetch comments');
        const comments = await commentResponse.json();
        totalComments += comments.length;
      }
  
      setTotalComments(totalComments);
    } catch (error) {
      console.error('Error fetching total comments:', error);
    }
  };

  const fetchTotalLikes = async () => {
    if (!user?.userId) return;
  
    try {
      const response = await fetch(`http://localhost:3001/contents?userId=${user.userId}`);
      if (!response.ok) throw new Error("Failed to fetch posts");
  
      const posts = await response.json();
  
      const total = posts.reduce((sum: number, post: any) => {
        if (typeof post.likeCount === "number") {
          return sum + post.likeCount;
        }
        return sum;
      }, 0);
  
      setTotalLikes(total);
    } catch (error) {
      console.error("Error fetching total likes:", error);
    }
  };
  

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // ทำการค้นหาตาม query ถ้าต้องการ
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTotalPosts();
      fetchTotalViews();
      fetchTotalComments();
      fetchTotalLikes();
    }
  }, [isLoggedIn, user?.userId]);

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1400px",
        marginRight: 15,
      }}
    >
      {isLoggedIn ? (
        <AutherAfterLogin 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar}
        />
      ) : (
        <Navbar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar}
          handleSearch={handleSearch}
        />
      )}

      <Grid
        container
        spacing={3}
        sx={{
          marginLeft: isSidebarOpen ? "240px" : "72px",
          marginTop: "72px",
          transition: "margin-left 0.3s",
          padding: "16px",
          maxWidth: {
            xs: "100%",
            sm: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 72px)",
            md: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 72px)",
          },
        }}
      >
        <Grid item md={8}>
          <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 1, color: "#98c9a3", }}>
            แดชบอร์ดผู้เขียน
          </Typography>
        </Grid>

        <Grid item md={12}>
          <Item 
            sx={{ 
              height: 150, 
              textAlign: "start", 
              padding: 3 ,  
              backgroundColor: "var(--comment-bg)",
              color: "var(--comment-text)",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: 18,color: "var(--comment-text)", }}
            >
              ข้อมูลช่องนักเขียน
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ my: 1, mr: 8 , }}>
                <Typography sx={{ fontSize: 18, color: "var(--comment-text)", }}>
                  {userName}
                </Typography>
                <Typography>ผู้เขียน/นักเขียน</Typography>
                <Typography sx={{
                  fontSize: 78,
                  marginLeft: 24,
                  marginTop: -20,
                  width: "124px",
                  height: "124px",
                  borderRadius: "50%",
                  border: "1px #EBE8E8 solid",
                  backgroundColor: "var(--comment-bg)",
                  color: "var(--comment-text)",
                }}>
                  <img
                    src={profileImage || "https://via.placeholder.com/100"}
                    alt="Profile Image"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Typography>
              </Box>

              {/* <Box sx={{ my: 1, textAlign: "right", ml: "auto" }}>
                <Typography sx={{ fontSize: 14, color: "gray" }}>
                  จำนวนผู้ติดตาม
                </Typography>
                <Typography sx={{ fontSize: 18, color: "black" }}>0</Typography>
              </Box> */}
            </Box>
          </Item>
        </Grid>

        <Grid
          item
          md={3}
          sx={{
            "&:hover #profile-icon, &:hover .profile-text": {
              transform: "scale(1.13)",
              transition: "transform 0.3s ease",
            },
          }}
        >
          <Item 
            id="profile-item" 
            sx={{ 
              height: 150, 
              textAlign: "start",
              backgroundColor: "var(--comment-bg)",
              color: "var(--comment-text)",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 14,
                marginTop: 3.5,
                ml: 1,
                mt: 8,
                
              }}
            >
              จำนวนบทความ          </Typography>
            <Typography
              sx={{
                textAlign: "start",
                fontWeight: "bold",
                fontSize: 22,
                ml: 1,
                color: "#577BC1",
              }}
            >
              {totalPosts}
            </Typography>
            <LibraryBooksIcon
              id="profile-icon"
              sx={{
                fontSize: 78,
                marginLeft: 22,
                marginTop: -30,
                color: "#577BC1",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
                transition: "transform 0.3s ease",
              }}
            />
          </Item>
        </Grid>

        <Grid
          item
          md={3}
          sx={{
            "&:hover #profile-icon, &:hover .profile-text": {
              transform: "scale(1.13)",
              transition: "transform 0.3s ease",
            },
          }}>
         <Item 
            id="profile-item" 
            sx={{ 
              height: 150, 
              textAlign: "start",
              backgroundColor: "var(--comment-bg)",
              color: "var(--comment-text)",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 14,
                marginTop: 3.5,
                ml: 1,
                mt: 8,
              }}
            >
              จำนวนการอ่าน
            </Typography>
            <Typography
              sx={{
                textAlign: "start",
                fontWeight: "bold",
                fontSize: 22,
                ml: 1,
                color: "#FFD65A",
              }}
            >
              {totalViews}
            </Typography>
            <VisibilityOutlinedIcon
              id="profile-icon"
              sx={{
                fontSize: 78,
                marginLeft: 22,
                marginTop: -30,
                color: "#FFD65A",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
              }}
            />
          </Item>
        </Grid>

        <Grid
          item
          md={3}
          sx={{
            "&:hover #profile-icon, &:hover .profile-text": {
              transform: "scale(1.13)",
              transition: "transform 0.3s ease",
            },
          }}>
          <Item 
            id="profile-item" 
            sx={{ 
              height: 150, 
              textAlign: "start",
              backgroundColor: "var(--comment-bg)",
              color: "var(--comment-text)",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 14,
                marginTop: 3.5,
                ml: 1,
                mt: 8,
              }}
            >
              คอมเมนท์
            </Typography>
            <Typography
              sx={{
                textAlign: "start",
                fontWeight: "bold",
                fontSize: 22,
                ml: 1,
                color: "#85A947",
              }}
            >
              {totalComments}
            </Typography>
            <CommentIcon
              id="profile-icon"
              sx={{
                fontSize: 78,
                marginLeft: 22,
                marginTop: -30,
                color: "#85A947",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
              }}
            />
          </Item>
        </Grid>

        <Grid
          item
          md={3}
          sx={{
            "&:hover #profile-icon, &:hover .profile-text": {
              transform: "scale(1.13)",
              transition: "transform 0.3s ease",
            },
          }}
        >
          <Item 
            id="profile-item" 
            sx={{ 
              height: 150, 
              textAlign: "start",
              backgroundColor: "var(--comment-bg)",
              color: "var(--comment-text)",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 14,
                marginTop: 3.5,
                ml: 1,
                mt: 8,
              }}
            >
              ไลค์ทั้งหมด
            </Typography>
            <Typography
              sx={{
                textAlign: "start",
                fontWeight: "bold",
                fontSize: 22,
                ml: 1,
                color: "#FF8383",
              }}
            >
              {totalLikes}
            </Typography>
            <ThumbUpIcon
              id="profile-icon"
              sx={{
                fontSize: 78,
                marginLeft: 22,
                marginTop: -30,
                color: "#FF8383",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
                
              }}
            />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}
