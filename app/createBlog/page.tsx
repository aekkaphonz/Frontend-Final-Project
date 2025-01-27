"use client";

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Container, TextField, Button, Grid, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Navbar from "@/app/navbar/page";
import AutherAfterLogin from "@/app/navbar/AutherAfterLogin";
import { useAuth } from "@/app/context/AuthProvider";

import ImageIcon from "@mui/icons-material/Image";

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
    const [content, setContent] = useState(""); // ✅ เปลี่ยนจาก `detail` เป็น `content`
    const [description, setDescription] = useState(""); // ✅ ใช้ `description` ตรงกับ Backend
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const newFiles: File[] = [];
            const newPreviews: string[] = [];

            files.forEach((file) => {
                newFiles.push(file);
                newPreviews.push(URL.createObjectURL(file));
            });

            setImages((prev) => [...prev, ...newFiles]);
            setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const handleSave = async () => {
        // ✅ ใช้ userId ที่ได้จาก Session หรือ API Authentication
        const userId = "678dc3849e06f647dac9c181"; // ใช้ค่าจริงจาก session

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("title", title);
        formData.append("detail", content);
        formData.append("description", description);

        if (images.length > 0) {
            formData.append("postImage", images[0]);
        }

        console.log("🚀 กำลังส่งข้อมูลไป Backend:", Object.fromEntries(formData.entries()));

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
                console.error("❌ เกิดข้อผิดพลาด:", errorText);
                alert("เกิดข้อผิดพลาดในการบันทึกบทความ: " + errorText);
            }
        } catch (error) {
            console.error("❌ ไม่สามารถเชื่อมต่อกับ Backend ได้:", error);
            alert("ไม่สามารถเชื่อมต่อกับ Backend ได้");
        }
    };

    const [userId, setUserId] = useState("");

    useEffect(() => {
        // ดึงข้อมูลผู้ใช้จาก Session หรือ API
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:3001/auth/user", {
                    credentials: "include", // ใช้ cookie จาก session
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserId(userData.userId); // ตั้งค่า userId
                }
            } catch (error) {
                console.error("❌ ไม่สามารถดึงข้อมูลผู้ใช้:", error);
            }
        };

        fetchUser();
    }, []);


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

                {/* หัวข้อ */}
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

                {/* เนื้อหา */}
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

                {/* อัปโหลดรูป */}
                <Grid item md={12}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>แนบรูปภาพ</Typography>
                    <IconButton component="label" title="เพิ่มรูป">
                        <ImageIcon sx={{ fontSize: 28, color: "#98c9a3" }} />
                        <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
                    </IconButton>
                    {/* <Button
                        component="label"
                        variant="contained"
                        sx={{ mb: 2, backgroundColor: "#77bfa3", color: "#ffffff" }}
                    >
                        อัปโหลดรูป
                        <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
                    </Button> */}
                    <Grid container spacing={2}>
                        {imagePreviews.map((preview, index) => (
                            <Grid item key={index} xs={4}>
                                <img
                                    src={preview}
                                    alt={`รูปที่ ${index + 1}`}
                                    style={{
                                        width: "100%",
                                        height: "150px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* แท็ก */}
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

                {/* ปุ่มบันทึก */}
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
