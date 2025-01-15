"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { ChatBubbleOutline as CommentIcon } from "@mui/icons-material";
import axios from "axios";
import Navbar from "@/app/navbar/page";

const themeColors = {
  primary: "#98c9a3",
  secondary: "#98c9a3",
  background: "#f6f6e7",
  hover: "#F0FFFF",
  text: "#edeec9",
  border: "#b0bec5",
};

export default function PopularPage() {
  const [posts, setPosts] = useState<any[]>([]); // เก็บข้อมูลโพสต์
  const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล
  const [page, setPage] = useState(1); // หน้าปัจจุบัน
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ควบคุม Sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ดึงข้อมูลจาก API
  const fetchPosts = async (pageNumber = 1) => {
    setLoading(true);
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=5`
        );
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
    } catch (error) {
        console.error("Error fetching posts:", error);
    } finally {
        setLoading(false);
    }
};


  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: themeColors.background,
          padding: 3,
          borderRadius: 2,
          mt: 10,
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          flexGrow: 1,
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
          ยอดนิยม
        </Typography>
        {loading && posts.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: themeColors.primary }}>
            กำลังโหลด...
          </Typography>
        ) : (
          <List>
            {posts.map((post, index) => (
              <React.Fragment key={post.id}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                    backgroundColor: "#f4f4f4",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    "&:hover": { backgroundColor: themeColors.hover },
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      {index + 1}. {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      สมาชิกหมายเลข {post.userId} -{" "}
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton>
                      <CommentIcon color="primary" />
                    </IconButton>
                    <Typography>
                      {Math.floor(Math.random() * 50) + 1}
                    </Typography>
                  </Box>
                </ListItem>
                {index < posts.length - 1 && <Divider sx={{ my: 2 }} />}
              </React.Fragment>
            ))}
          </List>
        )}
        {loading && posts.length > 0 && (
          <Typography
            sx={{ textAlign: "center", mt: 2, color: themeColors.primary }}
          >
            กำลังโหลดเพิ่มเติม...
          </Typography>
        )}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            disabled={loading}
            sx={{
              backgroundColor: themeColors.primary,
              color: "#fff",
              fontWeight: "bold",
              padding: "8px 150px",
              "&:hover": {
                backgroundColor: themeColors.secondary,
              },
            }}
          >
            ดูเพิ่มเติม
          </Button>
        </Box>
      </Container>
    </Box>
  );
}