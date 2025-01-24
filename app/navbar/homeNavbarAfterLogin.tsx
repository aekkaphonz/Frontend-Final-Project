"use client";

import React from "react";
import { AppBar, Toolbar, Box, Typography, Tooltip, IconButton, Menu, MenuItem, Avatar, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/app/context/AuthProvider";
import Link from "next/link";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useRouter } from "next/navigation";

const themeColors = {
  primary: "#ffffff",
  text: "#000000",
  buttonGreen: "#77bfa3",
};

export default function HomeNavbarAfterLogin() {
  const router = useRouter(); // เรียกใช้ useRouter
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
    } else if (setting === "Dashboard") {
      router.push("/dashboard"); // เปลี่ยนเส้นทางไปยัง /dashboard
    }//else if (setting === "Profile") {
    //   router.push("/profile"); 
    // }
    handleCloseUserMenu(); // ปิดเมนู
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: themeColors.primary,
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
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
            src="/images/logo-blogs.png"
            alt="Logo"
            style={{ maxWidth: "180px", height: "auto" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: themeColors.text,
            }}
          >
            Blogger DeeDee
          </Typography>
        </Box>

        {/* ปุ่มสร้างและโปรไฟล์ */}
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
                <Avatar
                  alt={user?.userName || "User"}
                  src={user?.profileImage || "/default-profile.png"} 
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

