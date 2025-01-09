"use client";

import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Button,
    Container,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Navbar from "@/app/navbar/page";
import Article from "@/app/home/article/page";

interface Attraction {
    id: string;
    coverimage: string;
    name: string;
    detail: string;
}

export default function page() {
    const [data, setData] = useState<Attraction[]>([]);

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
        <>
            <Navbar />
            <Carousel data={data} />
        </>
    );
}

function Carousel({ data }: { data: Attraction[] }) {
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
        <Container
            maxWidth="md"
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
            <Article />
        </Container>
    );
}
