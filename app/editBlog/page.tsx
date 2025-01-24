"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { styled } from "@mui/material/styles";
import { Typography, Container, TextField, Button, Box, Grid, IconButton } from "@mui/material";
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
  const [createdAt, setCreatedAt] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const savedPost = localStorage.getItem("editPost");
    if (savedPost) {
      const postData = JSON.parse(savedPost);
      setTitle(postData.title || "");
      setContent(postData.content || "");
      setTags(postData.tags?.join(", ") || "");
      setImagePreviews(postData.images || []);
      setCreatedAt(postData.createdAt || new Date().toISOString());
    }
  }, []);  

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

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags.split(",").map((tag) => tag.trim())));
    formData.append("createdAt", createdAt);
  
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
  
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "PUT",
        body: formData,
      });
  
      console.log("🔍 Response Status:", response.status);
      console.log("🔍 Response Headers:", response.headers);
      const result = await response.json();
      console.log("🔍 Response Body:", result);
  
      if (!response.ok) {
        throw new Error("การแก้ไขข้อมูลล้มเหลว");
      }
  
      alert("แก้ไขบทความสำเร็จ!");
      router.push("/blog");
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      alert("เกิดข้อผิดพลาดในการแก้ไขบทความ");
    }
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
          <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 1 }}>แก้ไขบทความ</Typography>
        </Grid>

        <Grid item md={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>หัวข้อ</Typography>
          <TextField fullWidth variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Grid>

        <Grid item md={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>เนื้อหา</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <IconButton component="label" title="เพิ่มรูป">
              <ImageIcon sx={{ fontSize: 28, color: "#98c9a3" }} />
              <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
            </IconButton>
          </Box>
          <TextField fullWidth variant="outlined" multiline rows={10} value={content} onChange={(e) => setContent(e.target.value)} />
        </Grid>

        {imagePreviews.length > 0 && (
          <Grid item md={12} sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>รูปภาพที่แนบ</Typography>
            <Grid container spacing={2}>
              {imagePreviews.map((src, index) => (
                <Grid item key={index} xs={4}>
                  <Box sx={{ position: "relative" }}>
                    <img src={src} alt={`uploaded ${index}`} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", border: "1px solid #EBE8E8" }} />
                    <IconButton sx={{ position: "absolute", top: 5, right: 5, color: "red" }} onClick={() => handleRemoveImage(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        <Grid item md={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}>แท็ก</Typography>
          <TextField fullWidth variant="outlined" value={tags} onChange={(e) => setTags(e.target.value)} />
        </Grid>

        <Grid item md={12} sx={{ textAlign: "center", mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="contained" sx={{ fontWeight: "bold", fontSize: 16, backgroundColor: "#FFCC66", color: "#fff" }} onClick={handleSave}>
            แก้ไขบทความ
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
