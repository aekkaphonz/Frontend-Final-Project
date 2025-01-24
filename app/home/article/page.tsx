"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Navbar from "@/app/navbar/page";
import AfterLogin from "@/app/navbar/AfterLogin"
import { useAuth } from "@/app/context/AuthProvider";

interface Article {
  id: number;
  title: string;
  detail: string;
}

export default function Page() {
    const { isLoggedIn } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State สำหรับควบคุม Sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ดึงข้อมูลบทความจาก API
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        const mappedData = data.slice(0, 10).map((item: any) => ({
          id: item.id,
          title: item.title,
          detail: item.body,
        }));
        setArticles(mappedData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }
    fetchArticles();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
        {/* Sidebar */}
        {isLoggedIn !== undefined ? (
        isLoggedIn ? <AfterLogin /> : <Navbar />
      ) : null}
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: isSidebarOpen ? "240px" : "72px",
            transition: "margin-left 0.3s",
            paddingTop: "80px",
            paddingX: 2,
            paddingBottom: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#f6f6e7",
              borderRadius: 2,
              border: "2px solid #c9dbc4",
              padding: 3,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#98c9a3",
                marginBottom: "20px",
                borderBottom: "2px solid #c9dbc4",
                display: "inline-block",
                paddingBottom: "5px",
              }}
            >
              บทความที่น่าสนใจ
            </Typography>

            <List>
              {articles.slice(0, showMore ? articles.length : 5).map((article) => (
                <ListItem
                  key={article.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #d7e7d0",
                    mb: 2,
                    padding: 2,
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                    "&:hover": {
                      backgroundColor: "#F0FFFF",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#98c9a3", fontWeight: "bold" }}
                    >
                      {article.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#353c41" }}>
                      {article.detail}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton sx={{ color: "#98c9a3" }}>
                      <CommentIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#f44336" }}>
                      <FavoriteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                onClick={() => setShowMore(!showMore)}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#98c9a3",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 2,
                  padding: "8px 150px",
                  "&:hover": {
                    backgroundColor: "#98c9a3",
                  },
                }}
              >
                {showMore ? "ย่อกลับ" : "ดูเพิ่มเติม"}{" "}
                <ArrowDropDownIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}