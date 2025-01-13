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
  primary: "#77bfa3",
  secondary: "#98c9a3",
  background: "#dde7c7",
  hover: "#bfd8bd",
  text: "#edeec9",
  border: "#b0bec5",
};

export default function PopularPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPosts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=5`
      );
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
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
      <Navbar />

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: themeColors.background,
          padding: 3,
          borderRadius: 2,
          mt: 10, // เพิ่ม margin เพื่อหลีกเลี่ยงการทับกับ Navbar
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          flexGrow: 1, // ดันให้ footer อยู่ด้านล่างสุดของหน้า
        }}
      >
        <Typography
          variant="h5"
          sx={{
            backgroundColor: themeColors.primary,
            color: "#fff",
            padding: 2,
            borderRadius: "4px",
            fontWeight: "bold",
            mb: 2,
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
              <Box key={post.id}>
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
                    <Typography>{Math.floor(Math.random() * 50)}</Typography>
                  </Box>
                </ListItem>
                {index < posts.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
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
