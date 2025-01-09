"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography, Container, Box } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "./dashboard.css";

import { red, } from '@mui/material/colors';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1400px",
        marginRight: 15,
      }}
    >
      {/* Sidebar */}
      <Sb isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Dashboard Content */}
      <Grid container spacing={2} sx={{ marginLeft: isSidebarOpen ? "240px" : "72px", marginTop: "72px", transition: "margin-left 0.3s" }}>
        <Grid item md={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 3 }}>แดชบอร์ดผู้เขียน</Typography>
        </Grid>

        <Grid item md={4}>
          <Item id="profile-item" sx={{ height: 180, textAlign: "start", padding: 3 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
              ข้อมูลช่องนักเขียน
            </Typography>
            <Typography sx={{ fontSize: 18, color: 'black', my: 2 }}>@nameAuther</Typography>
            <Box>
              <Typography sx={{ fontSize: 14 }}>จำนวนผู้ติดตาม</Typography>
              <Typography sx={{ fontSize: 18, color: 'black' }}>@subsciber</Typography>
              {/* <Box sx={{ border: 'solid 1px #EBE8E8', my: 2 }}></Box> */}
            </Box>
            <AccountCircleIcon id="profile-icon" sx={{
              fontSize: 160,
              marginLeft: 28,
              marginTop: -36,
              filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))"
            }} />
          </Item>
        </Grid>

        <Grid item md={2}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
            <LibraryBooksIcon id="profile-icon"
              sx={{
                fontSize: 85,
                marginLeft: 12,
                marginTop: -5,
                color: "#577BC1",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
              }}
            />
            <Typography sx={{ fontWeight: "bold", fontSize: 14, marginTop: 3.5, marginLeft: 2 }}>จำนวนบทความ</Typography>
            <Typography sx={{ textAlign: "start", fontWeight: "bold", fontSize: 22, marginLeft: 2, color: "#577BC1" }}>
              @postCount
            </Typography>
          </Item>
        </Grid>

        <Grid item md={2}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
            <VisibilityOutlinedIcon id="profile-icon"
              sx={{
                fontSize: 85,
                marginLeft: 12,
                marginTop: -5,
                color: "#FFD65A",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
              }}
            />
            <Typography sx={{ fontWeight: "bold", fontSize: 14, marginTop: 3.5, marginLeft: 2 }}>จำนวนการอ่าน</Typography>
            <Typography sx={{ textAlign: "start", fontWeight: "bold", fontSize: 22, marginLeft: 2, color: "#FFD65A" }}>
              @view
            </Typography>
          </Item>
        </Grid>

        <Grid item md={2}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
            <CommentIcon id="profile-icon"
              sx={{
                fontSize: 85,
                marginLeft: 12,
                marginTop: -5,
                color: "#85A947",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
              }}
            />
            <Typography sx={{ fontWeight: "bold", fontSize: 14, marginTop: 3.5, marginLeft: 2 }}>คอมเมนท์</Typography>
            <Typography sx={{ textAlign: "start", fontWeight: "bold", fontSize: 22, marginLeft: 2, color: "#85A947" }}>
              @commentCount
            </Typography>
          </Item>
        </Grid>

        <Grid item md={2}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
            <ThumbUpIcon id="profile-icon"
              sx={{
                fontSize: 85,
                marginLeft: 12,
                marginTop: -5,
                color: "#FF8383",
                filter: "drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.3))",
              }}
            />
            <Typography sx={{ fontWeight: "bold", fontSize: 14, marginTop: 3.5, marginLeft: 2 }}>ไลค์ทั้งหมด</Typography>
            <Typography sx={{ textAlign: "start", fontWeight: "bold", fontSize: 22, marginLeft: 2, color: "#FF8383" }}>
              @like
            </Typography>
          </Item>
        </Grid>

        <Grid item md={3}>
          <Item sx={{ height: 450, textAlign: "start", padding: 3 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
              บทความล่าสุด
            </Typography>
            <Box
              component="img"
              src="/next.svg"
              alt="Next.js Logo"
              sx={{ width: 200, height: 174, mr: 3, my: 1, mx: 2 }}
            />
            <Typography sx={{ fontSize: 16, mb: 3 }}>ชื่อบทความ</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
              <Typography sx={{ fontSize: 14 }}>โพสต์เมื่อ</Typography>
              <Typography sx={{ fontSize: 14, color: 'black' }}>@time</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
              <Typography sx={{ fontSize: 14 }}>จำนวนการอ่าน</Typography>
              <Typography sx={{ fontSize: 14, color: 'black' }}>@numberRead</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
              <Typography sx={{ fontSize: 14 }}>ชอบ</Typography>
              <Typography sx={{ fontSize: 14, color: 'black' }}>@likeBlog</Typography>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}
