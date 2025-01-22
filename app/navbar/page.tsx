"use client";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const themeColors = {
  primary: "#ffffff",
  text: "#000000",
  buttonBorder: "#000000",
  buttonGreen: "#77bfa3",
};

function Sb({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  // Fetch all data on load
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3001/posts");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setData(result);
        setFilteredData(result); // Initialize with all data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Handle search functionality
  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredData(data); // Show all data when search query is empty
      return;
    }

    try {
      // Send search request to the API
      const res = await fetch(`http://localhost:3001/posts?search=${query}`);
      if (!res.ok) throw new Error("Failed to fetch search results");

      const result = await res.json();
      setFilteredData(result); // Update the filtered data from the API response
    } catch (error) {
      console.error("Error fetching search results:", error);

      // Fallback: Filter data on the client-side
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 3px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #ddd",
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Sidebar Menu */}
          <Box
            sx={{
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

            <Link href="/">
              <img
                src="/images/logo-blogs.png"
                alt="Cleaning Illustration"
                style={{ maxWidth: "142px", height: "auto" }}
              />
            </Link>
          </Box>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, mx: 2, display: "flex", justifyContent: "center" }}>
            <TextField
              placeholder="ค้นหา"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              sx={{
                width: "60%",
                backgroundColor: "#f6f6f6",
              }}
            />
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              href="/signin"
              variant="outlined"
              sx={{
                color: themeColors.buttonGreen,
                borderColor: themeColors.buttonGreen,
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: themeColors.buttonGreen,
                  borderColor: themeColors.buttonGreen,
                  color: "#ffffff",
                },
              }}
            >
              เข้าสู่ระบบ
            </Button>
            <Button
              href="/signup"
              variant="contained"
              sx={{
                backgroundColor: themeColors.buttonGreen,
                color: "#ffffff",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  borderColor: themeColors.buttonGreen,
                  color: themeColors.buttonGreen,
                },
              }}
            >
              ลงทะเบียน
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        sx={{
          width: isOpen ? 240 : 72,
          height: "100vh",
          backgroundColor: "#fff",
          transition: "width 0.3s",
          position: "fixed",
          top: 64,
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
