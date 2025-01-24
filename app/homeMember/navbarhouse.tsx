"use client";

import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import Link from "next/link";

const themeColors = {
  primary: "#ffffff",
  text: "#000000",
  buttonBorder: "#000000",
  buttonGreen: "#77bfa3",
  buttonRed: "#ff4d4f#ff4d4f",
};

export default function Navbar({ toggleSidebar }: { toggleSidebar?: () => void }) {
  return (
    <AppBar
       position="fixed"
        sx={{
          backgroundColor: "#fff", // พื้นหลังสีขาว
          boxShadow: "0px 3px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #ddd",
          zIndex: 1300, // ให้อยู่เหนือ Sidebar
        }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
         {/* Logo และ Sidebar Toggle */}
         <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* เพิ่มไอคอนเมนูสำหรับเปิด Sidebar */}
          {toggleSidebar && (
            <IconButton
              size="large"
              edge="start"
              onClick={toggleSidebar}
              sx={{ color: themeColors.text }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {/* โลโก้ */}
          <Link href="/home/highlights" passHref>
            <img
              src="/images/logo-blogs.png"
              alt="Logo"
              style={{ maxWidth: "150px", height: "auto" }}
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

        {/* Call to Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {/* ปุ่มไอคอน "สร้าง" */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AddIcon
              sx={{
                color: themeColors.buttonGreen,
                fontWeight: "bold",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)", // เพิ่มเงา
              }}
            />
            <Link href="/createBlog" passHref>
              <Typography
                variant="h6"
                sx={{
                  color: themeColors.text,
                  fontWeight: "bold",
                }}
              >
                สร้าง
              </Typography>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
