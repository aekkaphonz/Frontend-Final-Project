"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useRouter } from "next/navigation"; // ใช้สำหรับนำทางใน Next.js
import Navbar from "@/app/navbar/page";
import  Article from "@/app/home/article/page" 

interface Attraction {
  id: string;
  coverimage: string;
  name: string;
  detail: string;
}

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // สำหรับควบคุม Sidebar
  const [data, setData] = useState<Attraction[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://melivecode.com/api/attractions");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: Attraction[] = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      {/* Navbar */}
      <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isSidebarOpen ? "240px" : "72px", // รองรับการเปลี่ยนขนาด Sidebar
          transition: "margin-left 0.3s",
          paddingTop: "80px", // เว้นระยะจาก Navbar ด้านบน
          paddingX: 2,
          paddingBottom: 2,
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#333",
            marginBottom: "30px",
          }}
        >
          บทความ
        </Typography>

        {/* Regions Grid */}
        <Grid container spacing={3} justifyContent="center">
          {data.map((item) => (
            <RegionCard key={item.id} attraction={item} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function RegionCard({ attraction }: { attraction: Attraction }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/home/highlights/${attraction.id}`); // นำทางไปยังหน้ารายละเอียด
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <CardActionArea onClick={handleCardClick}>
          <CardMedia
            component="img"
            height="150"
            image={attraction.coverimage}
            alt={attraction.name}
          />
          <CardContent
            sx={{
              backgroundColor: "#fff",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              {attraction.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
