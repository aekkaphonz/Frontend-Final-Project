"use client";

import React from "react";
import Link from "next/link"; 
import { Avatar, Box, List, ListItem, Menu, MenuItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Tooltip, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from "@/app/context/AuthProvider";

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
          backgroundColor: "#ffffff",
          boxShadow: "0px 3px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #ddd",
          zIndex: 1300, // ให้อยู่เหนือ Sidebar
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}> {/* ปรับให้จัดตำแหน่งแบบ space-between */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              onClick={toggleSidebar}
              sx={{ color: "#000" }}
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

              variant="contained"
            >
              <EditNoteOutlinedIcon sx={{ marginRight: 1 }} />
              เขียน
            </Button>
            {/* เมนูผู้ใช้ */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.userName || "User"} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
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
          <Link href="/dashboard" passHref>
            <Tooltip title="แดชบอร์ด" placement="right">
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
                  <DashboardIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="แดชบอร์ด" sx={{ color: "#000" }} />}
              </ListItem>
            </Tooltip>
          </Link>

          <Tooltip title="เนื้อหา" placement="right">
            <Link href="/blog" passHref>
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
                  <CollectionsBookmarkIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="เนื้อหา" sx={{ color: "#000" }} />}
              </ListItem>
            </Link>
          </Tooltip>

          <Tooltip title="สถิติ" placement="right">
            <Link href="/statistics" passHref>
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
                  <InsertChartIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="สถิติ" sx={{ color: "#000" }} />}
              </ListItem>
            </Link>
          </Tooltip>

          <Tooltip title="โปรไฟล์" placement="right">
            <Link href="/profile" passHref>
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
                  <PersonIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="โปรไฟล์" sx={{ color: "#000" }} />}
              </ListItem>
            </Link>
          </Tooltip>
        </List>
      </Box>
    </>
  );
}

export default Sb;
