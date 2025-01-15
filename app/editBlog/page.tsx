"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // ใช้สำหรับอ่าน query และเปลี่ยนหน้า
import { styled } from "@mui/material/styles";
import { Typography, Container, TextField, Button, Box, Grid, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import ImageIcon from "@mui/icons-material/Image";

import Sb from "@/app/sidebarAuther/page";

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

export default function EditBlog() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const postId = searchParams.get("id"); // ดึง id จาก query เพื่อตรวจสอบบทความที่จะแก้ไข

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [title, setTitle] = useState(""); // เก็บหัวข้อ
    const [content, setContent] = useState(""); // เก็บเนื้อหา
    const [tags, setTags] = useState(""); // เก็บแท็ก
    const [images, setImages] = useState<File[]>([]); // เก็บไฟล์รูปภาพ
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); // เก็บ URL รูปสำหรับแสดงตัวอย่าง
    const [createdAt, setCreatedAt] = useState(""); // เก็บวันที่การสร้าง

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // โหลดข้อมูลเดิมสำหรับการแก้ไข
    useEffect(() => {
        const fetchPostData = async () => {
            if (!postId) return; // ถ้าไม่มี postId ให้หยุดการทำงาน
            try {
                const response = await fetch(`http://localhost:3001/posts/${postId}`);
                if (!response.ok) throw new Error("Failed to fetch post");
                const data = await response.json();

                // ตั้งค่าข้อมูลที่ดึงมา
                setTitle(data.title || "");
                setContent(data.content || "");
                setTags(data.tags?.join(", ") || ""); // แปลง array กลับเป็น string
                setImagePreviews(data.images || []); // ใช้ภาพที่ backend คืนมา
                setCreatedAt(data.createdAt || new Date().toISOString());
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        fetchPostData();
    }, [postId]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setImages([...images, ...filesArray]);

            const previews = filesArray.map((file) => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...previews]);
        }
    };

    const handleSave = async () => {
        const payload = {
            title,
            content,
            tags: tags.split(",").map((tag) => tag.trim()), // แปลงแท็กเป็น array
            createdAt,
            images: imagePreviews, // ใช้รูปภาพจาก URL (หรือชื่อไฟล์) เดิม
        };

        try {
            const response = await fetch(`http://localhost:3001/posts/${postId}`, {
                method: "PUT", // ใช้ PUT สำหรับการแก้ไข
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("การแก้ไขข้อมูลล้มเหลว");
            }

            const result = await response.json();
            console.log("ผลลัพธ์จาก backend:", result);
            alert("แก้ไขบทความสำเร็จ!");
            router.push("/blog"); // กลับไปที่หน้ารายการบทความ
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            alert("เกิดข้อผิดพลาดในการแก้ไขบทความ");
        }
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                maxWidth: "1400px",
                marginRight: 15,
            }}
        >
            <Sb isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Grid container spacing={2} sx={{ marginLeft: isSidebarOpen ? "240px" : "72px", marginTop: "72px", transition: "margin-left 0.3s" }}>
                <Grid item md={12} sx={{ boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.1)" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 1 }}>แก้ไขบทความ</Typography>
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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        <IconButton component="label" title="เพิ่มรูป">
                            <ImageIcon sx={{ fontSize: 28, color: "#007bff" }} />
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                            />
                        </IconButton>
                    </Box>
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

                {/* แสดงรูปภาพ */}
                {imagePreviews.length > 0 && (
                    <Grid item md={12} sx={{ mt: 2 }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>รูปภาพที่แนบ</Typography>
                        <Grid container spacing={2}>
                            {imagePreviews.map((src, index) => (
                                <Grid item key={index} xs={4}>
                                    <img
                                        src={src} // ตรวจสอบว่า URL รูปภาพถูกต้อง
                                        alt={`uploaded ${index}`}
                                        style={{
                                            width: "100%",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            border: "1px solid #EBE8E8",
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}

                {/* แท็ก */}
                <Grid item md={12}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>แท็ก</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="เพิ่มแท็ก (คั่นด้วยเครื่องหมายจุลภาค)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </Grid>

                {/* ปุ่มบันทึก */}
                <Grid item md={12} sx={{ textAlign: "center", mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{ fontWeight: "bold", fontSize: 16 }}
                    >
                        บันทึกการแก้ไข
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
