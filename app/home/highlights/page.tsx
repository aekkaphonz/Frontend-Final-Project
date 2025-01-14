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
  IconButton,
} from "@mui/material";
import { Favorite, Visibility, ChatBubbleOutline } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Navbar from "@/app/navbar/page";

interface Attraction {
  id: string;
  coverimage: string;
  name: string;
  detail: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

        const enhancedData = await Promise.all(
          result.map(async (item) => {
            const detailsRes = await fetch(
              `https://melivecode.com/api/attractions/${item.id}`
            );
            const details = await detailsRes.json();

            return {
              ...item,
              viewCount: details.attraction.viewCount || 0,
              likeCount: details.attraction.likeCount || 0,
              commentCount: details.attraction.commentCount || 0,
            };
          })
        );

        setData(enhancedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f6f6e7" }}>
      <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

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
          บทความทั้งหมด
        </Typography>

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

  const handleCardClick = async () => {
    try {
      // อัปเดต viewCount ใน backend
      await fetch(`https://melivecode.com/api/attractions/update/${attraction.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ viewCount: attraction.viewCount + 1 }),
      });

      // เพิ่ม viewCount ใน frontend
      attraction.viewCount += 1;

      // นำทางไปยังหน้ารายละเอียด
      router.push(`/home/highlights/${attraction.id}`);
    } catch (error) {
      console.error("Error updating view count:", error);
    }
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
              borderTop: "3px solid #98c9a3",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "#fff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Visibility sx={{ fontSize: 18, color: "#666" }} />
            <Typography sx={{ ml: 1, fontSize: 14, color: "#666" }}>
              {attraction.viewCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ChatBubbleOutline sx={{ fontSize: 18, color: "#666" }} />
            <Typography sx={{ ml: 1, fontSize: 14, color: "#666" }}>
              {attraction.commentCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Favorite sx={{ fontSize: 18, color: "red" }} />
            <Typography sx={{ ml: 1, fontSize: 14, color: "#666" }}>
              {attraction.likeCount}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}