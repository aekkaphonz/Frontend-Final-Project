"use client";

import React from "react";
import SearchIcon from "@mui/icons-material/Search"; 
import AddIcon from "@mui/icons-material/Add"; 
import LogoutIcon from "@mui/icons-material/Logout"; // ไอคอน Logout
import { AppBar, Toolbar, Button, Box, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext"; 

const themeColors = {
  primary: "#ffffff",
  text: "#000000",
  buttonBorder: "#000000",
  buttonGreen: "#77bfa3",
};

export default function HomeNavbarAfterLogin() {
  const { setIsLoggedIn } = useAuth(); // ใช้ setIsLoggedIn เพื่อเปลี่ยนสถานะ

  const handleLogout = () => {
    setIsLoggedIn(false); // ออกจากระบบ
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
        {/* Logo และข้อความ */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center", 
            gap: "10px",
          }}
        >
          <img
            src="/images/logo-blogs.png"
            alt="Cleaning Illustration"
            style={{ maxWidth: "180px", height: "auto" }} // ขนาดโลโก้
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

        {/* Call to Action Buttons */}
        <Box
          sx={{
            display: "flex", // จัดปุ่มให้อยู่ในแนวนอน
            gap: "20px", // ระยะห่างระหว่างปุ่ม
          }}
        >
          {/* ปุ่มสร้าง */}
          <Box 
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px", // ระยะห่างระหว่างไอคอนและข้อความ
            }}
          >
            <AddIcon 
              sx={{ 
                color: themeColors.buttonGreen,
                fontWeight: "bold",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)", // เพิ่มเงา
              }} 
            />
            <Link href="/createBlog" >
              <Typography
                variant="h6"
                sx={{
                  color: themeColors.text,
                }}
              >
                สร้าง
              </Typography>
            </Link>
          </Box>

          {/* ปุ่ม Logout */}
          <Button
            variant="contained"
            onClick={handleLogout}
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
  );
}
