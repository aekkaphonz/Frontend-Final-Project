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
  const [userName, setUserName] = useState("กำลังโหลด..."); // เก็บชื่อผู้ใช้งาน
  const [profileImage, setProfileImage] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/profile", {
        credentials: "include", // ส่ง cookie
      });
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUserName(data[0]?.userName || "ไม่ทราบชื่อ");
      setProfileImage(data[0]?.profileImage || "https://via.placeholder.com/100");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
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
          <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 1 }}>
            แดชบอร์ดผู้เขียน
          </Typography>
        </Grid>

        <Grid item md={12}>
          <Item sx={{ height: 150, textAlign: "start", padding: 3 }}>
            <Typography
              sx={{ fontWeight: "bold", fontSize: 18, color: "black" }}
            >
              ข้อมูลช่องนักเขียน
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ my: 1, mr: 8 }}>
                <Typography sx={{ fontSize: 18, color: "black" }}>
                  {userName}
                </Typography>
                <Typography>ผู้เขียน/นักเขียน</Typography>
                <Typography sx={{
                  fontSize: 78,
                  marginLeft: 24,
                  marginTop: -15,
                }}>
                  <img
                    src={profileImage || "https://via.placeholder.com/100"}
                    alt="Profile Image"
                    style={{
                      width: "100px",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Typography>
              </Box>

              <Box sx={{ my: 1, textAlign: "right", ml: "auto" }}>
                <Typography sx={{ fontSize: 14, color: "gray" }}>
                  จำนวนผู้ติดตาม
                </Typography>
                <Typography sx={{ fontSize: 18, color: "black" }}>0</Typography>
              </Box>
            </Box>
          </Item>
        </Grid>

        <Grid item md={3}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 14,
                marginTop: 3.5,
                ml: 1,
                mt: 8,
              }}
            >
              จำนวนบทความ
            </Typography>
            <Typography
              sx={{
                textAlign: "start",
                fontWeight: "bold",
                fontSize: 22,
                ml: 1,
                color: "#577BC1",
              }}
            >
              0
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

        <Grid item md={3}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
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
              0
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

        <Grid item md={3}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
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
              0
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

        <Grid item md={3}>
          <Item id="profile-item" sx={{ height: 150, textAlign: "start" }}>
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
              0
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
      </Grid>
    </Container>
  );
}
