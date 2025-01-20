  "use client";

import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Button, TextField, Tooltip, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Link from "next/link";
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';

const themeColors = {
  primary: "#ffffff",
  text: "#000000",
  buttonBorder: "#000000",
  buttonGreen: "#77bfa3",
};

function Sb({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff", // พื้นหลังสีขาว
          boxShadow: "0px 3px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #ddd",
          zIndex: 1300, // ให้อยู่เหนือ Sidebar
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Sidebar Menu */}
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          >
            <IconButton
              size="large"
              edge="start"
              onClick={toggleSidebar}
              sx={{ color: "#000" }}
            >
              <MenuIcon />
            </IconButton>

            <img
              src="/images/logo-blogs.png"
              alt="Cleaning Illustration"
              style={{ maxWidth: "140px", height: "auto" }} // ขนาดโลโก้
            />

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "#000", fontWeight: 700, cursor: "pointer" }}
            >
              <Link href="/" style={{ textDecoration: "none" }}>
                Blogger DeeDee
              </Link>
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, mx: 2, display: "flex", justifyContent: "center" }}>
            <TextField
              placeholder="ค้นหา"
              variant="outlined"
              size="small"
              sx={{
                width: "80%",
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

          {/* Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                backgroundColor: "#fff", // สีขาว
                color: "#3399FF",
              }}
            >
              <Link href="/signin" style={{ textDecoration: "none" }}>
                <AddBoxIcon />
                สร้าง
              </Link>
            </Typography>

            {/* Signin Button */}
            <Button
              href="/signin"
              variant="outlined"
              sx={{
                backgroundColor: "#ffffff",
                color: themeColors.buttonGreen,
                borderColor: themeColors.buttonGreen,
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: themeColors.buttonGreen,
                  borderColor: themeColors.buttonGreen,
                  color: "#ffffff",
                },
              }}
            >
              เข้าสู่ระบบ
            </Button>

            {/* Signup Button */}
            <Button
              href="/signup"
              variant="contained"
              sx={{
                backgroundColor: themeColors.buttonGreen,
                color: "#ffffff",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  borderColor: themeColors.buttonGreen,
                  color: themeColors.buttonGreen,
                },
              }}
            >
              ลงทะเบียน
            </Button>
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
          <Link href="/home/highlights">
            <Tooltip title="หน้าหลัก" placement="right">
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
                <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
                  <HomeIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="หน้าหลัก" sx={{ color: "#000" }} />}
              </ListItem>
            </Tooltip>
          </Link>
          <Link href="/home/article">
            <Tooltip title="สนใจ" placement="right">
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
                <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
                  <ArticleIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="น่าสนใจ" sx={{ color: "#000" }} />}
              </ListItem>
            </Tooltip>
          </Link>
          <Link href="/home/popular">
            <Tooltip title="มาเเรง" placement="right">

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
                <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
                  <WhatshotIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="มาเเรง" sx={{ color: "#000" }} />}
              </ListItem>
            </Tooltip>
          </Link>
        </List>
      </Box>
    </>
  );
}

export default Sb;
