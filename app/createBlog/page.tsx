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

  // ตัวแปรเก็บข้อมูล
  const [title, setTitle] = useState(""); // เก็บหัวข้อ
  const [content, setContent] = useState(""); // เก็บเนื้อหา
  const [tags, setTags] = useState(""); // เก็บแท็ก
  const [images, setImages] = useState<File[]>([]); // เก็บไฟล์รูปภาพ
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // เก็บ URL รูปสำหรับแสดงตัวอย่าง
  const [createdAt, setCreatedAt] = useState(new Date().toISOString()); // เก็บวันที่การสร้าง

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages([...images, ...filesArray]);

      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...previews]);
    }
  };

  const handleSave = async () => {
    // เตรียมข้อมูลในรูปแบบ JSON
    const payload = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()), // แปลงแท็กเป็น array
      createdAt,
      images: images.map((image) => image.name), // ในกรณี backend เก็บชื่อรูป
    };

    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("การส่งข้อมูลล้มเหลว");
      }

      const result = await response.json();
      console.log("ผลลัพธ์จาก backend:", result);
      alert("บทความและข้อมูลถูกบันทึกเรียบร้อย!");
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกบทความ");
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
      <Grid 
        container spacing={3} 
        sx={{ 
          marginLeft: isSidebarOpen ? "240px" : "72px",
          marginTop: "72px",
          transition: "margin-left 0.3s",
          padding: "16px", // ปรับ padding ด้านใน
          maxWidth: {
            xs: "100%", // สำหรับหน้าจอมือถือ
            sm: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 72px)", // สำหรับหน้าจอเล็กขึ้นไป
            md: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 72px)", // สำหรับหน้าจอ Desktop
          },
        }}
      >
        <Grid item md={12} sx={{ boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.1)" }}>
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <IconButton component="label" title="เพิ่มรูป">
              <ImageIcon sx={{ fontSize: 28, color: "#98c9a3" }} />
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
                    src={src}
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
        <Grid 
          item md={12} 
          sx={{ 
            textAlign: "center", 
            mt: 2 ,
            display: "flex", 
            alignItems: "end", 
            justifyContent: "flex-end", // ชิดขวา
            gap: 2 
            }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ 
              fontWeight: "bold", 
              fontSize: 16 ,
              color: "#ffffff",
              backgroundColor: "#77bfa3", 
            }}
          >
            บันทึก
          </Button>

          {/* ปุ่มยกเลิก */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ 
              fontWeight: "bold", 
              fontSize: 16 ,
              color: "#ffffff",
              backgroundColor: "#FF3366", 
            }}
          >
            ยกเลิก
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
