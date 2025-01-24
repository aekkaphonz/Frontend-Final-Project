"use client";

import React, { useState } from "react";
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

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<string[]>([]); // สำหรับเก็บ Base64
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // สำหรับแสดงตัวอย่างรูป

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newImages: string[] = [];
      const newPreviews: string[] = [];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) {
            newImages.push(reader.result as string);
            newPreviews.push(reader.result as string);
            setImages((prev) => [...prev, ...newImages]);
            setImagePreviews((prev) => [...prev, ...newPreviews]);
          }
        };
      });
    }
  };

  const handleSave = async () => {
    const payload = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      images,
      createdAt: new Date().toISOString(),
    };

    console.log("Sending data to Backend:", payload);

    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("บทความและรูปภาพถูกบันทึกเรียบร้อย!");
        handleCancel();
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกบทความ");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      alert("ไม่สามารถเชื่อมต่อกับ Backend ได้");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setTags("");
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
      <Sb isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
          <Button
            component="label"
            variant="contained"
            sx={{ mb: 2, backgroundColor: "#77bfa3", color: "#ffffff" }}
          >
            อัปโหลดรูป
            <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
          </Button>
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
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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
            ยกเลิก
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
