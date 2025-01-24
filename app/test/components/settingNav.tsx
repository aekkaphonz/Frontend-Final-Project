"use client";

import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
function SettingNav() {
  const themeColors = {
    primary: "#ffffff",
    text: "#000000",
    buttonBorder: "#000000",
    buttonGreen: "#77bfa3",
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      window.location.href = "http://localhost:3000/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
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
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* ลบ IconButton สำหรับ toggleSidebar ออก */}
            <Link href="/">
              <img
                src="/images/logo-blogs.png"
                alt="Cleaning Illustration"
                style={{ maxWidth: "142px", height: "auto" }} // ขนาดโลโก้
              />
            </Link>
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              flexGrow: 1,
              mx: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
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
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Link href="/createBlog">
                  <Typography
                    variant="h6"
                    sx={{
                      color: themeColors.text,
                    }}
                  >
                    <AddIcon
                      sx={{
                        color: themeColors.buttonGreen,
                        fontWeight: "bold",
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)", // เพิ่มเงา
                        marginRight: "10px",
                        marginLeft: "120px",
                      }}
                    />
                    สร้าง
                  </Typography>
                </Link>
              </Box>
            </Typography>

            {/* Logout Button */}
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
    </>
  );
}

export default SettingNav;
