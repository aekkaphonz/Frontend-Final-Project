"use client";

import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Link from "next/link";

function Sb({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
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
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            onClick={toggleSidebar}
            sx={{ color: "#000" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: "#000", fontWeight: 700 }}>
            Web Blog
          </Typography>
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
        </List>
      </Box>
    </>
  );
}

export default Sb;