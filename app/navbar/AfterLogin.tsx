"use client";

import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Button, TextField, Tooltip, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from "@/app/context/AuthProvider";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useRouter } from "next/navigation";
import SwitchTheme from "@/app/darkMode/components/SwitchTheme";

function NavLogIn({ isOpen, toggleSidebar, handleSearch }: { isOpen: boolean; toggleSidebar: () => void; handleSearch: (query: string) => void }) {
  const router = useRouter();
  const {logout, user } = useAuth();
  const settings = ["โปรไฟล์", "แดชบอร์ด", "ออกจากระบบ"];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  const themeColors = {
    primary: "#ffffff",
    text: "#000000",
    buttonBorder: "#000000",
    buttonGreen: "#77bfa3",
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMenuClick = async (setting: string) => {
    if (setting === "ออกจากระบบ") {
      await logout(); // เรียกใช้ฟังก์ชัน logout
    } else if (setting === "แดชบอร์ด") {
      router.push("/dashboard"); // เปลี่ยนเส้นทางไปยัง /dashboard
     }else if (setting === "โปรไฟล์") {
       router.push("/profile"); 
     }
    handleCloseUserMenu(); // ปิดเมนู
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "var(--nav-bg)", // ดึงค่าพื้นหลังจาก CSS Variables
          color: "var(--nav-text)",
          borderBottom: "2px solid var(--nav-border)",
          zIndex: 1300, // ระดับชั้นของ Navbar
          transition: "all 0.3s ease-in-out", // ให้การเปลี่ยนแปลงราบรื่น
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
              sx={{ backgroundColor: "inherit", color: "inherit" }}
            >
              <MenuIcon />
            </IconButton>

            <Link href="/" >
              <img
                src="/images/logo-blogs-removebg.png"
                alt="Cleaning Illustration"
                style={{ maxWidth: "142px", height: "auto" }} // ขนาดโลโก้
              />
            </Link>
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
              onChange={(e) => handleSearch(e.target.value)}
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
                color: "#000000",
              }}
            >
              {/* ไอคอนและข้อความ*/}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px", // ระยะห่างระหว่างไอคอนและข้อความ
                }}
              >

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

              </Box>
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.userName || "Guest"}
                    src={user?.profileImage || "/default-profile.png"} // เพิ่ม src เพื่อแสดงรูปโปรไฟล์
                  />
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

            <SwitchTheme />

          </Box>
        </Toolbar>
      </AppBar>


      {/* Sidebar */}
      <Box
        sx={{
          width: isOpen ? 240 : 72,
          height: "100vh",
          backgroundColor: "var(--nav-bg)", // ดึงค่าพื้นหลังจาก CSS Variables
          color: "var(--nav-text)",
          borderBottom: "2px solid var(--nav-border)",
          transition: "width 0.3s",
          position: "fixed",
          top: 64,
          left: 0,
          zIndex: 1200,
          overflow: "hidden",
          boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
          borderRight: "2px solid rgba(255, 255, 255, 0.2)", // เส้นขอบข้างในโหมดมืด
        }}
      >
        <List>
          <Link href="/home/highlights">
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
              <ListItemIcon sx={{ justifyContent: "center", backgroundColor: "var(--nav-bg)", color: "var(--nav-text)", minWidth: "40px" }}>
                <HomeIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="หน้าหลัก" sx={{ color: "#000" }} />}
            </ListItem>
          </Link>
          <Link href="/home/article">
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
              <ListItemIcon sx={{ justifyContent: "center", backgroundColor: "var(--nav-bg)", color: "var(--nav-text)", minWidth: "40px" }}>
                <ArticleIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="น่าสนใจ" sx={{ color: "#000" }} />}
            </ListItem>
          </Link>
          <Link href="/home/popular">
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
              <ListItemIcon sx={{ justifyContent: "center", backgroundColor: "var(--nav-bg)", color: "var(--nav-text)", minWidth: "40px" }}>
                <WhatshotIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="มาเเรง" sx={{ color: "#000" }} />}
            </ListItem>
          </Link>
        </List>
      </Box>

    </>
  );
}

export default NavLogIn;