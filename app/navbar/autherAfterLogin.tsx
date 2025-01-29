"use client";

import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Button, TextField, Tooltip, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from "@/app/context/AuthProvider";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useRouter } from "next/navigation";

import DashboardIcon from '@mui/icons-material/Dashboard';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PersonIcon from '@mui/icons-material/Person';
import SwitchTheme from "@/app/darkMode/components/SwitchTheme";

function NavLogIn({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const settings = ['โปรไฟล์', 'แดชบอร์ด', 'ออกจากระบบ'];
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
      await logout();
      router.push("/signin"); 
    } else if (setting === "แดชบอร์ด") {
      router.push("/dashboard");
     }else if (setting === "โปรไฟล์") {
      router.push("/profile"); 
    }
    handleCloseUserMenu();
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "inherit", // ใช้ค่า background สีจากคลาส Tailwind
          color: "inherit",
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
          width: isOpen ? 240 : 72, // ความกว้างเมื่อเปิด/ปิด
          height: "100vh",
          backgroundColor: "inherit", // ใช้ค่า background สีจากคลาส Tailwind
          color: "inherit",
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

export default NavLogIn;