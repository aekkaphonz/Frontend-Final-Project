"use client";

import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Tooltip,
  Typography,
  Button,
  Avatar,
  TextField
} from "@mui/material";
import Navbar from "@/app/homeMember/navbarhouse";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import HomeIcon from '@mui/icons-material/Home';
import Link from "next/link";

export default function SidebarLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />

      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "64px",
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: isSidebarOpen ? 240 : 72,
            height: "100vh",
            backgroundColor: "#ffffff",
            transition: "width 0.3s",
            position: "fixed",
            top: 64,
            left: 0,
            boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <List>
          <Tooltip title="หน้าหลัก" placement="right">
                <Link href="/homeMember/house" passHref>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: isSidebarOpen ? "row" : "column",
                      alignItems: "center",
                      justifyContent: isSidebarOpen ? "flex-start" : "center",
                      padding: isSidebarOpen ? "12px 20px" : "12px 0",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#000", minWidth: "40px" }}>
                      <HomeIcon />
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <ListItemText primary="หน้าหลัก" sx={{ color: "#000" }} />
                    )}
                  </ListItem>
                </Link>
              </Tooltip>

              <Tooltip title="แดชบอร์ด" placement="right">
                <Link href="/dashboard" passHref>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: isSidebarOpen ? "row" : "column",
                      alignItems: "center",
                      justifyContent: isSidebarOpen ? "flex-start" : "center",
                      padding: isSidebarOpen ? "12px 20px" : "12px 0",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#000", minWidth: "40px" }}>
                      <DashboardIcon />
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <ListItemText primary="แดชบอร์ด" sx={{ color: "#000" }} />
                    )}
                  </ListItem>
                </Link>
              </Tooltip>

              <Tooltip title="บทความ" placement="right">
                <Link href="/blog" passHref>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: isSidebarOpen ? "row" : "column",
                      alignItems: "center",
                      justifyContent: isSidebarOpen ? "flex-start" : "center",
                      padding: isSidebarOpen ? "12px 20px" : "12px 0",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#000", minWidth: "40px" }}>
                      <CollectionsBookmarkIcon />
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <ListItemText primary="บทความ" sx={{ color: "#000" }} />
                    )}
                  </ListItem>
                </Link>
              </Tooltip>

              <Tooltip title="สถิติ" placement="right">
                <Link href="/statistics" passHref>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: isSidebarOpen ? "row" : "column",
                      alignItems: "center",
                      justifyContent: isSidebarOpen ? "flex-start" : "center",
                      padding: isSidebarOpen ? "12px 20px" : "12px 0",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#000", minWidth: "40px" }}>
                      <InsertChartIcon />
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <ListItemText primary="สถิติ" sx={{ color: "#000" }} />
                    )}
                  </ListItem>
                </Link>
              </Tooltip>

              <Tooltip title="ออกจากระบบ" placement="right">
                <Link href="/" passHref>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: isSidebarOpen ? "row" : "column",
                      alignItems: "center",
                      justifyContent: isSidebarOpen ? "flex-start" : "center",
                      padding: isSidebarOpen ? "12px 20px" : "12px 0",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#ff4d4f", minWidth: "40px" }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <ListItemText primary="ออกจากระบบ" sx={{ color: "#ff4d4f" }} />
                    )}
                  </ListItem>
                </Link>
              </Tooltip>
            </List>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            marginLeft: isSidebarOpen ? "240px" : "72px",
            transition: "margin-left 0.3s",
            padding: "16px",
          }}
        >
          {/* Profile Card */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "800px",
              backgroundColor: "#dfead9",
              margin: "2rem auto",
              borderRadius: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#91c7a7",
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#ffffff", fontWeight: "bold" }}
              >
                สมาชิกหมายเลข 1234567
              </Typography>

              <Button
                href="/editProfile"
                variant="contained"
                startIcon={<BorderColorIcon />}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#91c7a7",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                แก้ไขข้อมูล
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                padding: "1.5rem",
                alignItems: "center",
                gap: "1.5rem",
                backgroundColor: "#edf4e4",
              }}
            >
              <Avatar
                src="/images/user-avatar.png"
                alt="User Avatar"
                sx={{
                  width: "100px",
                  height: "100px",
                  border: "2px solid #91c7a7",
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  sx={{ color: "#333333", fontWeight: "bold" }}
                >
                  ชื่อผู้ใช้: 
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333333",
                    marginTop: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  อีเมล: 
                </Typography>

                <Typography 
                   variant="body1" 
                   sx={{ 
                        fontWeight: "bold", 
                        marginBottom: "0.5rem" 
                   }}>
                        แนะนำตัว :
                </Typography>

              </Box>
              
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  textAlign: "right",
                  
                }}
              >
                {["บทความ", "ผู้ติดตาม", "กำลังติดตาม"].map((label, idx) => (
                  <Typography
                    key={idx}
                    variant="body1"
                    sx={{
                      color: "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    {label}: 0
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
