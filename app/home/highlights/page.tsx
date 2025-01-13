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
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f6f6e7" }}>
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
            color: "#94c379",
            marginBottom: "30px",
            borderBottom: "2px solid #c9dbc4",
            display: "inline-block",
            paddingBottom: "5px",
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
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
          },
          backgroundColor: "#f6f6e7",
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
              backgroundColor: "#ffffff",
              textAlign: "center",
              padding: "10px",
              borderTop: "3px solid #94c379",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333",
                marginBottom: "5px",
              }}
            >
              {attraction.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#353c41",
              }}
            >
              {attraction.detail.substring(0, 50)}...
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
