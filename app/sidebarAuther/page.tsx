"use client";

import React from "react";
import Link from "next/link"; // ใช้สำหรับลิงค์
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  TextField,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useAuth } from "@/app/context/AuthProvider";


const themeColors = {
  primary: "#ffffff",
  text: "#000000",
  buttonGreen: "#77bfa3",
  buttonRed: "#ff4d4f",
};

function Sb({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {

  const { user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const settings = ["Profile", "Dashboard", "Logout"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = async (setting: string) => {
    if (setting === "Logout") {
      await logout(); // เรียกใช้ฟังก์ชัน logout
    }
    handleCloseUserMenu(); // ปิดเมนู
  };
  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: themeColors.primary,
          boxShadow: "0px 3px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #ddd",
          zIndex: 1300, // ให้อยู่เหนือ Sidebar
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              onClick={toggleSidebar}
              sx={{ color: themeColors.text }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="http://localhost:3000/home/highlights" >
              <img
                src="/images/logo-blogs.png"
                alt="Cleaning Illustration"
                style={{ maxWidth: "142px", height: "auto" }} // ขนาดโลโก้
              />
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* ปุ่มเขียน */}
            <Button href="/createBlog"
              sx={{
                color: "#ffffff",
                backgroundColor: "#77bfa3",
                "&:hover": {
                  backgroundColor: "#F7F7F7",
                  color: "#77bfa3"
                },
                borderRadius: "20px",
                padding: "6px 16px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
            </Button>
          </Box>

            {/* Search Bar */}
          <Box sx={{ flexGrow: 1, mx: 2, display: "flex", justifyContent: "center" }}>
              <TextField
                placeholder="ค้นหา"
                variant="outlined"
                size="small"
                sx={{
                  width: "60%",
                  backgroundColor: "#f6f6f6",
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
          </Box>

          {/* ปุ่มไอคอน "สร้าง" และ "ออกจากระบบ" */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/createBlog" passHref>
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <AddIcon
                  sx={{
                    color: themeColors.buttonGreen,
                    fontWeight: "bold",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)", // เพิ่มเงา
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: themeColors.text,
                    fontWeight: "bold",
                  }}
                >
                  สร้าง
                </Typography>
              </Box>
            </Link>

            <Link href="/profile" passHref>
                <SentimentSatisfiedAltIcon
                sx={{
                    color: themeColors.buttonGreen,
                    fontWeight: "bold",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)", // เพิ่มเงา
                }}
                />
            </Link>
          </Box>
        </Toolbar>

      </AppBar>

      {/* Sidebar */}
      <Box
        sx={{
          width: isOpen ? 240 : 72, // ความกว้างเมื่อเปิด/ปิด
          height: "100vh",
          backgroundColor: "#fff",
          transition: "width 0.3s",
          position: "fixed",
          top: 64, // เลื่อน Sidebar ให้เริ่มหลัง Navbar
          left: 0,
          zIndex: 1200,
          overflow: "hidden",
          boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
        }}
      >
        <List>
          <Tooltip title="หน้าหลัก" placement="right">
            <Link href="/homeMember/house" passHref>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: isOpen ? "row" : "column",
                  alignItems: "center",
                  justifyContent: isOpen ? "flex-start" : "center",
                  padding: isOpen ? "12px 20px" : "12px 0",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
                  <HomeIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="หน้าหลัก" sx={{ color: "#000" }} />}
              </ListItem>
            </Link>
          </Tooltip>

          <Tooltip title="แดชบอร์ด" placement="right">
            <Link href="/dashboard" passHref>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: isOpen ? "row" : "column",
                  alignItems: "center",
                  justifyContent: isOpen ? "flex-start" : "center",
                  padding: isOpen ? "12px 20px" : "12px 0",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
                  <DashboardIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="แดชบอร์ด" sx={{ color: "#000" }} />}
              </ListItem>
            </Link>
          </Tooltip>

          <Tooltip title="บทความ" placement="right">
            <Link href="/blog" passHref>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: isOpen ? "row" : "column",
                  alignItems: "center",
                  justifyContent: isOpen ? "flex-start" : "center",
                  padding: isOpen ? "12px 20px" : "12px 0",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
                  <CollectionsBookmarkIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="บทความ" sx={{ color: "#000" }} />}
              </ListItem>
            </Link>
          </Tooltip>

          <Tooltip title="สถิติ" placement="right">
            <Link href="/statistics" passHref>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: isOpen ? "row" : "column",
                  alignItems: "center",
                  justifyContent: isOpen ? "flex-start" : "center",
                  padding: isOpen ? "12px 20px" : "12px 0",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
                  <InsertChartIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="สถิติ" sx={{ color: "#000" }} />}
              </ListItem>
            </Link>
          </Tooltip>

          <Tooltip title="ออกจากระบบ" placement="right">
            <Link href="/" passHref>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: isOpen ? "row" : "column",
                  alignItems: "center",
                  justifyContent: isOpen ? "flex-start" : "center",
                  padding: isOpen ? "12px 20px" : "12px 0",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center", color: "#ff4d4f", minWidth: "40px" }}>
                  <LogoutIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="ออกจากระบบ" sx={{ color: "#ff4d4f" }} />}
              </ListItem>
            </Link>
          </Tooltip>
          
        </List>
      </Box>
    </>
  );
}

export default Sb;
