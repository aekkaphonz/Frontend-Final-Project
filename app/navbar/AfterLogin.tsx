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
import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from '@mui/icons-material/BorderColor';



function NavLogIn({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const settings = ['Profile', 'Dashboard', 'Logout'];
    const { user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

function Sb({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  //const { setIsLoggedIn } = useAuth(); // ใช้ setIsLoggedIn เพื่อเปลี่ยนสถานะ

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
    if (setting === "Logout") {
      await logout(); // เรียกใช้ฟังก์ชัน logout
    } else if (setting === "Dashboard") {
      router.push("/dashboard"); // เปลี่ยนเส้นทางไปยัง /dashboard
     }else if (setting === "Profile") {
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

            <Link href="/" >
              <img
                src="/images/logo-blogs.png"
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
                  <BorderColorIcon sx={{ marginRight: 1 }} />
                  เขียน
                </Button>

                <Link href="/" >

                  <Typography
                    variant="h6"
                    sx={{
                      color: themeColors.text,
                    }}
                  >
                    <LogoutIcon
                      sx={{
                        color: "#e91e63",
                        fontWeight: "bold",
                        marginLeft: "20px",
                      }}
                    />
                    ออกจากระบบ
                  </Typography>
                </Link>
              </Box>
            </Typography>
            {/* ปุ่ม Logout */}
            <Button
              variant="contained"
              // onClick={handleLogout}
              sx={{
                backgroundColor: "#e91e63",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                "&:hover": {
                  backgroundColor: "#ec407a",
                },
              }}
            >
              <LogoutIcon />
              Logout
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
              <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
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
              <ListItemIcon sx={{ justifyContent: "center", color: "#000", minWidth: "40px" }}>
                <WhatshotIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="มาเเรง" sx={{ color: "#000" }} />}
            </ListItem>
          </Link>
          <Tooltip title="โปรไฟล์" placement="right">
            <Link href="http://localhost:3000/test" passHref>
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
}

export default NavLogIn;