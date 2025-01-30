"use client";

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Container, TextField, Button, Grid, IconButton, Box, FormControlLabel, Checkbox } from "@mui/material";
import Paper from "@mui/material/Paper";
import Navbar from "@/app/navbar/page";
import AutherAfterLogin from "@/app/navbar/AutherAfterLogin";
import { useAuth } from "@/app/context/AuthProvider";

import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

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
    const { user, isLoggedIn } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(""); // ✅ เปลี่ยนจาก `detail` เป็น `content`
    const [description, setDescription] = useState(""); // ✅ ใช้ `description` ตรงกับ Backend
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [titleError, setTitleError] = useState<string | null>(null);
    const [contentError, setContentError] = useState<string | null>(null);

    const blogCategories = [
        "เทคโนโลยี", "สุขภาพ", "อาหาร", "ท่องเที่ยว", "การเงิน",
        "ธุรกิจ", "ไลฟ์สไตล์", "การศึกษา", "ศิลปะ", "วิทยาศาสตร์",
        "กีฬา", "ดนตรี", "การ์ตูน", "อนิเมะ"
    ];

    const handleTagChange = (tag: string) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag) // เอาออกถ้ามีอยู่แล้ว
                : [...prevTags, tag] // เพิ่มเข้าไปถ้ายังไม่มี
        );
    };

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
        if (!user?.userId) {
            alert("User not logged in or missing userId.");
            return;
        }

        if (!title.trim()) {
            setTitleError("กรุณากรอกชื่อบทความ");
            return;
        } else {
            setTitleError(null);
        }

        if (!content.trim()) {
            setContentError("กรุณากรอกเนื้อหาของบทความ");
            return;
        } else {
            setContentError(null);
        }

        const formData = new FormData();
        formData.append("userId", user.userId);
        formData.append("title", title);
        formData.append("detail", content);

        selectedTags.forEach(tag => {
            formData.append("tags[]", tag);
        });

        if (images.length > 0) {
            formData.append("postImage", images[0]);
        }

        console.log(" กำลังส่งข้อมูลไป Backend:", Object.fromEntries(formData.entries()));

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
        setSelectedTags([]);
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
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
                    maxWidth: {
                        xs: "100%",
                        sm: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 72px)",
                        md: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 72px)",
                    },
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
                        sx={{
                            backgroundColor: "var(--comment-bg)",
                            color: "var(--comment-text)",
                            "& .MuiInputBase-input": {
                                color: "var(--comment-text)", // สีข้อความของ Input
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                borderColor: "var(--comment-text)", // สีเส้นขอบของช่องป้อนข้อความ
                                },
                                "&:hover fieldset": {
                                borderColor: "var(--comment-text)",
                                },
                                "&.Mui-focused fieldset": {
                                borderColor: "var(--comment-text)",
                                },
                            },
                        }}
                        error={Boolean(titleError)} // ✅ แสดง error ถ้ามี
                        helperText={titleError} // ✅ ข้อความแจ้งเตือน
                    />
                </Grid>

                {/* เนื้อหา */}
                <Grid item md={12}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>เนื้อหา</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        <IconButton component="label" title="เพิ่มรูป">
                            <ImageIcon sx={{ fontSize: 28, color: "#98c9a3" }} />
                            <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        {imagePreviews.map((preview, index) => (
                            <Grid item key={index} xs={4}>
                                <Box sx={{ position: "relative" }}>
                                    <img
                                        src={preview}
                                        alt={`รูปที่ ${index + 1}`}
                                        style={{
                                            width: "150px",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <IconButton sx={{ position: "absolute", top: -5, right: 285, color: "red" }} onClick={() => handleRemoveImage(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Box>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="เขียนเนื้อหาบทความ..."
                        multiline
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        sx={{
                            backgroundColor: "var(--comment-bg)",
                            color: "var(--comment-text)",
                            "& .MuiInputBase-input": {
                                color: "var(--comment-text)", // สีข้อความของ Input
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                borderColor: "var(--comment-text)", // สีเส้นขอบของช่องป้อนข้อความ
                                },
                                "&:hover fieldset": {
                                borderColor: "var(--comment-text)",
                                },
                                "&.Mui-focused fieldset": {
                                borderColor: "var(--comment-text)",
                                },
                            },
                        }}
                        error={Boolean(contentError)} // ✅ แสดง error ถ้ามี
                        helperText={contentError} // ✅ ข้อความแจ้งเตือน
                    />
                </Grid>

                {/* แท็ก */}
                <Grid item md={12}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>เลือกแท็ก</Typography>
                    <Grid container spacing={2}>
                        {blogCategories.map((tag) => (
                            <Grid item key={tag} xs={6} sm={4} md={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => handleTagChange(tag)}
                                            sx={{ color: "#77bfa3" }}
                                        />
                                    }
                                    label={tag}
                                />
                            </Grid>
                        ))}
                    </Grid>
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
