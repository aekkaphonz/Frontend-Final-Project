"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Typography, Container, TextField, Button, Box, Grid, IconButton, Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControlLabel
} from "@mui/material";
import Paper from "@mui/material/Paper";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const postId = searchParams.get("id");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [createdAt, setCreatedAt] = useState("");

  const blogCategories = [
    "เทคโนโลยี", "สุขภาพ", "อาหาร", "ท่องเที่ยว", "การเงิน",
    "ธุรกิจ", "ไลฟ์สไตล์", "การศึกษา", "ศิลปะ", "วิทยาศาสตร์",
    "กีฬา", "ดนตรี", "การ์ตูน", "อนิเมะ", "ภาพยนต์"
  ];

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag) // ลบแท็กออกถ้ามี
        : [...prevTags, tag] // เพิ่มแท็กถ้ายังไม่มี
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return; // ถ้าไม่มี ID ไม่ต้องโหลด

      try {
        const response = await fetch(`http://localhost:3001/contents/${postId}`);
        if (response.ok) {
          const postData = await response.json();
          setTitle(postData.title || "");
          setContent(postData.detail || ""); // Backend ใช้ `detail` แทน `content`
          setSelectedTags(postData.tags || []); // แก้ไขแท็กที่มีอยู่
          setImagePreviews(postData.postImage ? [postData.postImage] : []);
          setCreatedAt(postData.createdAt || new Date().toISOString());
        } else {
          console.error("❌ ไม่สามารถโหลดบทความ");
        }
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการโหลดบทความ:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdate = async () => {
    if (!postId) return alert("❌ ไม่พบบทความที่ต้องการแก้ไข");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("detail", content);

    if (Array.isArray(selectedTags) && selectedTags.length > 0) {
      formData.append("tags", JSON.stringify(selectedTags));
    } else {
      formData.append("tags", JSON.stringify([]));
    }

    if (images.length > 0) {
      formData.append("postImage", images[0]);
    } else if (imagePreviews.length > 0) {
      formData.append("postImage", imagePreviews[0]);
    }

    // ✅ ตรวจสอบว่ามีไฟล์ภาพถูกเพิ่มลงใน formData หรือไม่
    if (!formData.has("postImage")) {
      alert("⚠️ ไม่พบรูปภาพที่อัปโหลด กรุณาเลือกไฟล์ใหม่!");
      return;
    }

    console.log("📤 กำลังส่งข้อมูลไป Backend:", Array.from(formData.entries()));

    try {
      const response = await fetch(`http://localhost:3001/contents/updateContent/${postId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("📌 แก้ไขบทความสำเร็จ!");
        router.push("/dashboard");
      } else {
        const errorText = await response.text();
        console.error("❌ เกิดข้อผิดพลาด:", errorText);
        alert("เกิดข้อผิดพลาด: " + errorText);
      }
    } catch (error) {
      console.error("❌ ไม่สามารถเชื่อมต่อกับ Backend ได้:", error);
      alert("ไม่สามารถเชื่อมต่อกับ Backend ได้");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages([...images, ...filesArray]);
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...previews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1400px", marginRight: 15 }}>
      <Sb isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Grid
        container spacing={3}
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
        <Grid item md={12} sx={{ boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.1)" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 1, }}>แก้ไขบทความ</Typography>
        </Grid>

        <Grid item md={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>หัวข้อ</Typography>
          <TextField
            fullWidth variant="outlined"
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
          />
        </Grid>

        <Grid item md={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>เนื้อหา</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <IconButton component="label" title="เพิ่มรูป">
              <ImageIcon sx={{ fontSize: 28, color: "#98c9a3" }} />
              <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            {imagePreviews.length > 0 && (
              <Grid item md={12} sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>รูปภาพที่แนบ</Typography>
                <Grid container spacing={2}>
                  {imagePreviews.map((src, index) => (
                    <Grid item key={index} xs={4}>
                      <Box sx={{ position: "relative" }}>
                        <img src={src} alt={`uploaded ${index}`} style={{ width: "150px", height: "100%", objectFit: "cover", borderRadius: "8px", border: "1px solid #EBE8E8" }} />
                        <IconButton sx={{ position: "absolute", top: -5, right: 250, color: "red" }} onClick={() => handleRemoveImage(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Box>
          <TextField
            fullWidth
            variant="outlined"
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
          />
        </Grid>

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

        <Grid item md={12} sx={{ textAlign: "center", mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            sx={{ fontWeight: "bold", fontSize: 16, backgroundColor: "#FFCC66", color: "#fff" }}
            onClick={handleUpdate}
          >
            แก้ไขบทความ
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
