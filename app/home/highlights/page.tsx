"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Container,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Navbar from "@/app/navbar/page";
import Link from "next/link";

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
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
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
        <Carousel data={data} />
      </Box>
    </Box>
  );
}

function Carousel({ data }: { data: Attraction[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        borderRadius: 2,
        border: "2px solid #77bfa3",
        backgroundColor: "#dde7c7",
        padding: 2,
        marginLeft: "auto",
        marginRight: "auto",
        px: 4,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          mb: 2,
          borderBottom: "2px solid #98c9a3",
          backgroundColor: "#98c9a3",
          paddingLeft: 1,
          borderRadius: 1,
          color: "#edf6e5",
        }}
      >
        ไฮไลท์
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 0,
            zIndex: 1,
            color: "#77bfa3",
            "&:hover": { backgroundColor: "#bfd8bd" },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${data.length * 100}%`,
          }}
        >
          {data.map((a) => (
            <Card
              key={a.id}
              sx={{
                flex: "0 0 33.3333%",
                maxWidth: "100%",
                mx: 1,
                mb: 2,
                borderBottom: "2px solid #77bfa3",
                backgroundColor: "#edf6e5",
                position: "relative",
              }}
            >
              <CardActionArea
                sx={{
                  "&:hover": {
                    backgroundColor: "#dde7c7",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={a.coverimage}
                  alt={a.name}
                  sx={{ height: 150 }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ color: "#77bfa3" }}
                  >
                    {a.name}
                  </Typography>
                  <Typography variant="body2" color="#353c41">
                    {a.detail}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button
                size="small"
                sx={{
                  color: "#77bfa3",
                  position: "absolute",
                  bottom: 8,
                  left: 8,
                  "&:hover": { color: "#bfd8bd" },
                }}
              >
                <Link href={`/home/highlights/${a.id}`}>Learn More</Link>
              </Button>
            </Card>
          ))}
        </Box>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 0,
            zIndex: 1,
            color: "#77bfa3",
            "&:hover": { backgroundColor: "#bfd8bd" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Container>
  );
}
