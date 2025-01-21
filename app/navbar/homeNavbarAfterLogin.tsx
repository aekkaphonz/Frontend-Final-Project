"use client";

import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout"; // ไอคอน Logout
import { AppBar, Toolbar, Button, Box, TextField, Typography, Tooltip } from "@mui/material";
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const themeColors = {
  primary: "#ffffff",
  text: "#000000",
  buttonBorder: "#000000",
  buttonGreen: "#77bfa3",
};

export default function HomeNavbarAfterLogin() {
  const settings = ['Profile', 'Dashboard', 'Logout'];

  const { setIsLoggedIn } = useAuth(); // ใช้ setIsLoggedIn เพื่อเปลี่ยนสถานะ
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    setIsLoggedIn(false); // ออกจากระบบ
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

            <Link href="/createBlog" >
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
                    marginRight: "10px ",
                  }}
                />
                สร้าง
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
