"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    Button,
    IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Article {
    id: number;
    title: string;
    detail: string;
}

export default function Page() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [showMore, setShowMore] = useState(false);

    // ดึงข้อมูลบทความจาก API
    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts"
                );
                const data = await response.json();
                const mappedData = data.slice(0, 5).map((item: any) => ({
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
        <Box
            sx={{
                padding: 2,
                backgroundColor: "#dde7c7",
                borderRadius: 2,
                border: "2px solid #98c9a3",
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    mb: 2,
                    borderBottom: "2px solid #77bfa3",
                    backgroundColor: "#98c9a3",
                    color: "#edeec9",
                    paddingLeft: 1,
                    borderRadius: 1,
                }}
            >
                บทความที่น่าสนใจ
            </Typography>

            <List>
                {articles.slice(0, showMore ? articles.length : 2).map((article) => (
                    <ListItem
                        key={article.id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #bfd8bd",
                            mb: 1,
                            padding: 1,
                            borderRadius: 1,
                            backgroundColor: "#edf6e5",
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: "#77bfa3" }}>
                                {article.title}
                            </Typography>
                            <Typography variant="body2" color="#353c41">
                                {article.detail}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton sx={{ color: "#77bfa3" }}>
                                <CommentIcon />
                            </IconButton>
                            <IconButton sx={{ color: '#f50057' }}>
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
                    mt: 2,
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => setShowMore(!showMore)}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#77bfa3",
                        color: "#edeec9",
                        fontWeight: "bold",
                        borderRadius: 2,
                        padding: "8px 16px",
                        "&:hover": {
                            backgroundColor: "#98c9a3",
                        },
                    }}
                >
                    {showMore ? "ย่อกลับ" : "ดูเพิ่มเติม"}{" "}
                    <Typography
                        component="span"
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                    >
                        <ArrowDropDownIcon />
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}
