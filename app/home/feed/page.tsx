"use client";

import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Navbar from "@/app/navbar/page"

const FeedPage = () => {
  return (
    <>
    <Navbar/>
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#f0f0f0",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 4,
          textAlign: "center",
          backgroundColor: "#dde7c7",
          borderRadius: 2,
          border: "1px solid #77bfa3",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
          พบกับ My Feed ที่คุณสามารถติดเลือก และรวบรวมเรื่องราวที่คุณต้องการได้ด้วยตัวเองง่ายๆ
          เพียงล็อกอิน
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#77bfa3",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#66a593",
            },
          }}
        >
          เข้าสู่ระบบ
        </Button>
      </Box>
    </Container>
    </>
  );
};

export default FeedPage;
