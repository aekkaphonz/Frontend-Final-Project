"use client";

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Container, TextField, Button, Grid, IconButton, Box } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import Navbar from "@/app/navbar/page";
import AutherAfterLogin from "@/app/navbar/AutherAfterLogin";
import { useAuth } from "@/app/context/AuthProvider";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    border: "1px solid #EBE8E8",
    boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.3)",
    borderRadius: 15,
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

export default function Page() {
    const { isLoggedIn } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setImages((prev) => [...prev, ...filesArray]);

            const previews = filesArray.map((file) => URL.createObjectURL(file));
            setImagePreviews((prev) => [...prev, ...previews]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        const userId = "678dc3849e06f647dac9c181";

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("title", title);
        formData.append("detail", content);
        formData.append("description", description);

        images.forEach((image) => formData.append("postImages", image));

        try {
            const response = await fetch("http://localhost:3001/contents/createContent", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("📌 บันทึกบทความและรูปภาพเรียบร้อยแล้ว!");
                handleCancel();
            } else {
                const errorText = await response.text();
                alert("เกิดข้อผิดพลาด: " + errorText);
            }
        } catch (error) {
            alert("ไม่สามารถเชื่อมต่อกับ Backend ได้");
        }
    };

    const handleCancel = () => {
        setTitle("");
        setContent("");
        setDescription("");
        setImages([]);
        setImagePreviews([]);
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                maxWidth: "1400px",
                marginRight: 15,
            }}
        >
            {isLoggedIn ? (
                <AutherAfterLogin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            ) : (
                <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            )}

            <Grid
                container
                spacing={3}
                sx={{
                    marginLeft: isSidebarOpen ? "240px" : "72px",
                    marginTop: "72px",
                    transition: "margin-left 0.3s",
                    padding: "16px",
                }}
            >
                <Grid item md={12}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 1 }}>เขียนบทความ</Typography>
                </Grid>

                <Grid item md={12}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>หัวข้อ</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="ใส่หัวข้อบทความ..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>

                <Grid item md={12}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>เนื้อหา</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="เขียนเนื้อหาบทความ..."
                        multiline
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Grid>

                <Grid item md={12}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>แนบรูปภาพ</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        <IconButton component="label" sx={{ backgroundColor: "#77bfa3", color: "#ffffff" }}>
                            <ImageIcon />
                            <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
                        </IconButton>
                    </Box>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {imagePreviews.map((preview, index) => (
                            <Grid item key={index} xs={4}>
                                <Box sx={{ position: "relative" }}>
                                    <img
                                        src={preview}
                                        alt={`uploaded ${index}`}
                                        style={{
                                            width: "100%",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <IconButton
                                        sx={{ position: "absolute", top: 5, right: 5, color: "red" }}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item md={12}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>แท็ก</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="เพิ่มแท็ก (คั่นด้วยเครื่องหมายจุลภาค)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>

                <Grid item md={12} sx={{ textAlign: "right", mt: 3 }}>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{ backgroundColor: "#77bfa3", color: "#ffffff", mr: 2 }}
                    >
                        บันทึก
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCancel}
                        sx={{ backgroundColor: "#FF3366", color: "#ffffff" }}
                    >
                        ล้างค่า
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
