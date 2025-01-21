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

import Sb from "@/app/sidebarAuther/page";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ตัวแปรรับข้อมูล
  const [userId, setUserId] = useState(""); // เก็บ userId
  const [nameAuthor, setNameAuthor] = useState(""); // เก็บชื่อผู้เขียน
  const [subscriber, setSubscriber] = useState(0); // เก็บจำนวนผู้ติดตาม
  const [postCount, setPostCount] = useState(0); // เก็บจำนวนโพสต์ทั้งหมด
  const [viewAll, setViewAll] = useState(0); // จำนวนการอ่านทั้งหมด
  const [commentCount, setCommentCount] = useState(0); // จำนวนความคิดเห็นทั้งหมด
  const [like, setLike] = useState(0); // ไลค์ทั้งหมด
  const [popularPosts, setPopularPosts] = useState([]); // บทความยอดนิยม

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchDashboardData = async () => {
    try {
        const userId = "YOUR_FIXED_USER_ID"; // ใส่ userId แบบคงที่ที่ต้องการดึงข้อมูล

        const userResponse = await fetch(`http://localhost:3001/user/${userId}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        setNameAuthor(userData.userName || "ไม่ทราบชื่อ");
        setSubscriber(userData.subscriber || 0);

        const postResponse = await fetch(`http://localhost:3001/posts/count/${userId}`);
        if (!postResponse.ok) throw new Error("Failed to fetch post count");
        const postData = await postResponse.json();
        setPostCount(postData.count || 0);

        console.log("Fetched dashboard data successfully");
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("ไม่สามารถโหลดข้อมูลแดชบอร์ดได้");
    }
};

useEffect(() => {
    fetchDashboardData();
}, []);
  

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1400px",
        marginRight: 15,
      }}
    >
      <Sb isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Grid container spacing={2} sx={{ marginLeft: isSidebarOpen ? "240px" : "72px", marginTop: "72px", transition: "margin-left 0.3s" }}>
        <Grid item md={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 1 }}>แดชบอร์ดผู้เขียน</Typography>
        </Grid>

        <Grid item md={4}>
          <Item sx={{ height: 150, textAlign: "start", padding: 3 }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
              ข้อมูลช่องนักเขียน
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ my: 1, mr: 8 }}>
                <Typography sx={{ fontSize: 18, color: "black" }}>{nameAuthor}</Typography>
                <Typography>ผู้เขียน/นักเขียน</Typography>
              </Box>
              <Box sx={{ my: 1, ml: 8 }}>
                <Typography sx={{ fontSize: 14 }}>จำนวนผู้ติดตาม</Typography>
                <Typography sx={{ fontSize: 18, color: "black" }}>{subscriber}</Typography>
              </Box>
            </Box>
          </Item>
        </Grid>

        <Grid item md={2}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 14, marginTop: 3.5, ml: 1, mt: 8 }}>
              จำนวนบทความ
            </Typography>
            <Typography sx={{ textAlign: "start", fontWeight: "bold", fontSize: 22, ml: 1, color: "#577BC1" }}>
              {postCount}
            </Typography>
            <LibraryBooksIcon
              id="profile-icon"
              sx={{
                fontSize: 78,
                marginLeft: 14,
                marginTop: -30,
                color: "#577BC1",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
              }}
            />
          </Item>
        </Grid>

        <Grid item md={2}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 14, marginTop: 3.5, ml: 1, mt: 8 }}>
              จำนวนการอ่าน
            </Typography>
            <Typography sx={{ textAlign: "start", fontWeight: "bold", fontSize: 22, ml: 1, color: "#FFD65A" }}>
              {viewAll}
            </Typography>
            <VisibilityOutlinedIcon
              id="profile-icon"
              sx={{
                fontSize: 78,
                marginLeft: 14,
                marginTop: -30,
                color: "#FFD65A",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
              }}
            />
          </Item>
        </Grid>

        <Grid item md={2}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 14, marginTop: 3.5, ml: 1, mt: 8 }}>
              คอมเมนท์
            </Typography>
            <Typography sx={{ textAlign: "start", fontWeight: "bold", fontSize: 22, ml: 1, color: "#85A947" }}>
              {commentCount}
            </Typography>
            <CommentIcon
              id="profile-icon"
              sx={{
                fontSize: 78,
                marginLeft: 14,
                marginTop: -30,
                color: "#85A947",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
              }}
            />
          </Item>
        </Grid>

        <Grid item md={2}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 14, marginTop: 3.5, ml: 1, mt: 8 }}>
              ไลค์ทั้งหมด
            </Typography>
            <Typography sx={{ textAlign: "start", fontWeight: "bold", fontSize: 22, ml: 1, color: "#FF8383" }}>
              {like}
            </Typography>
            <ThumbUpIcon
              id="profile-icon"
              sx={{
                fontSize: 78,
                marginLeft: 14,
                marginTop: -30,
                color: "#FF8383",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
              }}
            />
          </Item>
        </Grid>

        <Grid item md={4}>
          <Item sx={{ height: 450, textAlign: "start", padding: 3 }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 18, color: "black" }}>บทความยอดนิยม</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
              <Typography>บทความ</Typography>
              <Typography>การอ่าน</Typography>
            </Box>

            {/* {popularPosts.map((post, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", height: 80 }}>
                <Box
                  component="img"
                  src={post.image}
                  alt={post.title}
                  sx={{ width: 80, height: 64, my: 1, mx: 1 }}
                />
                <Typography sx={{ fontSize: 14 }}>{post.title}</Typography>
                <Typography sx={{ fontSize: 14, ml: 21 }}>{post.viewCount}</Typography>
              </Box>
            ))} */}
            
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}
