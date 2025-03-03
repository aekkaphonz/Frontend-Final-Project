"use client";

import React from "react";
import { AppBar, Toolbar, Box, Typography, Tooltip, IconButton, Menu, MenuItem, Avatar, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/app/context/AuthProvider";
import Link from "next/link";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useRouter } from "next/navigation";
import SwitchTheme from "@/app/darkMode/components/SwitchTheme";

const themeColors = {
  primary: "#ffffff",
  text: "#000000",
  buttonGreen: "#77bfa3",
};

export default function HomeNavbarAfterLogin() {
  const router = useRouter(); // เรียกใช้ useRouter
  const { user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const settings = ["โปรไฟล์", "แดชบอร์ด", "ออกจากระบบ"];

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
    <AppBar
      position="static"
      sx={{
        backgroundColor: "var(--nav-bg)", // ดึงค่าพื้นหลังจาก CSS Variables
        color: "var(--nav-text)",
        borderBottom: "2px solid var(--nav-border)",
        zIndex: 1300, // ระดับชั้นของ Navbar
        transition: "all 0.3s ease-in-out", // ให้การเปลี่ยนแปลงราบรื่น
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* โลโก้ */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src="/images/logo-blogs-removebg.png"
            alt="Logo"
            style={{ maxWidth: "180px", height: "auto" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              backgroundColor: "inherit", 
              color: "inherit"
            }}
          >
            Blogger DeeDee
          </Typography>
        </Box>

        {/* ปุ่มสร้างและโปรไฟล์ */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* ปุ่มเขียน */}
          <Button 
            onClick={() => {
              if (!user) {
                router.push('/signin');
                return;
              }
              router.push('/createBlog');
            }}
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
                <Avatar
                  alt={user?.userName || "User"}
                  src={user?.profileImage || "/images/default-avatar.png"}
                  onError={(e: any) => {
                    e.target.src = "/images/default-avatar.png";
                  }}
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
  );
}
