"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Star as StarIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Link from "next/link";

const themeColors = {
  primary: "#ffffff",
  sidebar: "#f5f5f5",
  text: "#333333",
  hover: "#e0e0e0",
};

function ResponsiveAppBar() {
  const [currentPath, setCurrentPath] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true); // เปิด Sidebar เริ่มต้น

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const menuItems = [
    { text: "หน้าหลัก", icon: <HomeIcon />, link: "/home/highlights" },
    { text: "หน้าฟีด", icon: <PersonIcon />, link: "/home/feed" },
    { text: "ยอดนิยม", icon: <StarIcon />, link: "/home/popular" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: themeColors.primary,
          zIndex: 1201,
          transition: "background-color 0.3s",
        }}
      >
        <Toolbar>
          {/* Toggle Sidebar */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: themeColors.text,
              textDecoration: "none",
              transition: "color 0.3s",
            }}
          >
            Blogs
          </Typography>

          {/* Login Button */}
          <Button
            variant="outlined"
            sx={{
              color: themeColors.text,
              borderColor: themeColors.text,
              textTransform: "none",
              marginLeft: "16px",
              "&:hover": {
                borderColor: themeColors.hover,
                bgcolor: themeColors.hover,
              },
              transition: "all 0.3s",
            }}
          >
            เข้าสู่ระบบ
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
        sx={{
          "& .MuiDrawer-paper": {
            width: "250px",
            bgcolor: themeColors.sidebar,
            color: themeColors.text,
            padding: "16px 8px",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Menu
        </Typography>
        <List>
          {menuItems.map((item) => (
            <Link
              href={item.link}
              key={item.text}
              style={{ textDecoration: "none" }}
            >
              <ListItem
                sx={{
                  "&:hover": { bgcolor: themeColors.hover },
                  color: themeColors.text,
                  bgcolor:
                    item.link === currentPath ? themeColors.hover : "inherit",
                  transition: "background-color 0.3s",
                }}
              >
                <ListItemIcon sx={{ color: themeColors.text }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: "16px",
          marginLeft: sidebarOpen ? "250px" : "0", // Dynamic Layout
          transition: "margin-left 0.3s",
        }}
      >
      </Box>
    </Box>
  );
}

export default ResponsiveAppBar;
