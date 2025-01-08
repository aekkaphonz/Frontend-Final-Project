"use client";

import { Box, Typography, IconButton, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Navbar from "@/app/navbar/page";

export default function Page() {
    const [data, setData] = useState([]);

    // ดึงข้อมูลในฝั่ง Client ด้วย useEffect
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("https://melivecode.com/api/attractions");
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <Carousel data={data} />
        </>
    );
}

function Carousel({ data }) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 0.5 : prevIndex - 0.5
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === data.length - 0.5 ? 0 : prevIndex + 0.5
        );
    };

    return (
        <>
            <div className="bigbox">
                <Container maxWidth="xl" sx={{
                    mt: 5,
                    borderRadius: 2, // 1 = 4px
                    border: "2px solid #1976d2",
                    backgroundColor: "#EEF5FF",
                    padding: 2,
                    marginLeft:1,
                    marginRight:1,
                }}>
                    <Typography variant="h6" gutterBottom sx={{
                        mb: 2, borderBottom: "1px solid #176B87",
                        backgroundColor: "#86B6F6",
                        paddingLeft: 1,
                        borderRadius: 1,

                    }}>
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
                                        borderBottom: "2px solid #1976d2",
                                    }}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image={a.coverimage}
                                            alt={a.name}
                                            sx={{ height: 150 }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {a.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {a.detail}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <Button size="small" color="primary">
                                        <Link href={`/home/${a.id}`}>Learn More</Link>
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
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>

                    <Typography variant="h6" gutterBottom sx={{
                        mb: 2, mt: 4,
                        borderBottom: "1px solid #176B87",
                        backgroundColor: "#86B6F6",
                        paddingLeft: 1,
                        borderRadius: 1,
                    }}>
                        อ้ากกกก
                    </Typography>
                </Container>
            </div>
        </>
    );
}
