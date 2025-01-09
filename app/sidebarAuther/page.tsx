"use client";

import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import InsertChartIcon from "@mui/icons-material/InsertChart";

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
          <ListItem
            button
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
          <ListItem
            button
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
          <ListItem
            button
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
        </List>
      </Box>
    </>
  );
}

export default Sb;
