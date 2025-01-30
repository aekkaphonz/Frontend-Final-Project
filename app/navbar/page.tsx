
  "use client";

import React,{useState,useEffect} from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Button, TextField, Tooltip, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";;
import Link from "next/link";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SwitchTheme from "@/app/darkMode/components/SwitchTheme";
import { useTheme } from "@mui/material/styles";

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
         className="navbar"
         sx={{
          backgroundColor: "var(--nav-bg)", // ดึงค่าพื้นหลังจาก CSS Variables
          color: "var(--nav-text)",
          borderBottom: "2px solid var(--nav-border)",
          zIndex: 1300,
          transition: "all 0.3s ease-in-out",
         }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2 }}>
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
              sx={{ backgroundColor: "inherit", color: "inherit" }}
            >
              <MenuIcon />
            </IconButton>

            <Link href="/">
              <img
                src="/images/logo-blogs-removebg.png"
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
              sx={{
                width: "60%",
                backgroundColor: "var(--comment-bg)",
                color:"var(--comment-text)"
              }}
              InputProps={{
                endAdornment: (
                  <IconButton 
                    sx={{
                      backgroundColor: "var(--comment-bg)",
                      color:"var(--comment-text)"
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              
              // sx={{
              //   width: "60%",
              //   backgroundColor: "#f6f6f6",
              // }}
            />
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex", // จัดปุ่มให้อยู่ในแนวนอน
              gap: "20px", // ระยะห่างระหว่างปุ่ม
            }}
          >

          {/* ไอคอนและข้อความ "สร้าง" */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px", // ระยะห่างระหว่างไอคอนและข้อความ
            }}
          >

            {/* ปุ่มเขียน */}
            <Button href="/signin"
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

          {/* Signin Button */}
          <Button
            href="/signin"
            variant="outlined"
            sx={{
              backgroundColor: "#ffffff",
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

          {/* Signup Button */}
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

          <SwitchTheme />

        </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        sx={{
          width: isOpen ? 240 : 72,
          height: "100vh",
          backgroundColor: "var(--nav-bg)", // ดึงค่าพื้นหลังจาก CSS Variables
          color: "var(--nav-text)",
          borderBottom: "2px solid var(--nav-border)",
          transition: "width 0.3s",
          position: "fixed",
          top: 64,
          left: 0,
          zIndex: 1200,
          overflow: "hidden",
          boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
          borderRight: "2px solid rgba(255, 255, 255, 0.2)", // เส้นขอบข้างในโหมดมืด
        }}
      >
        <List>
          <Tooltip title="หน้าหลัก" placement="right">
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
                <ListItemIcon sx={{ justifyContent: "center", backgroundColor: "var(--nav-bg)", color: "var(--nav-text)" , minWidth: "40px" }}>
                  <HomeIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="หน้าหลัก" sx={{ color: "var(--nav-text)" }} />}
              </ListItem>
            </Link>
          </Tooltip>
          <Tooltip title="น่าสนใจ" placement="right">
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
                <ListItemIcon sx={{ justifyContent: "center", backgroundColor: "var(--nav-bg)", color: "var(--nav-text)", minWidth: "40px" }}>
                  <ArticleIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="น่าสนใจ" sx={{ color: "var(--nav-text)" }} />}
              </ListItem>
            </Link>
          </Tooltip>
          <Tooltip title="มาเเรง" placement="right">
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
                <ListItemIcon sx={{ justifyContent: "center", backgroundColor: "var(--nav-bg)", color: "var(--nav-text)" , minWidth: "40px" }}>
                  <WhatshotIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="มาเเรง" sx={{ color: "var(--nav-text)" }} />}
              </ListItem>
            </Link>
          </Tooltip>
        </List>
      </Box>
    </>
  );
}

export default Sb;

