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
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const promises = filesArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result as string;
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const maxSize = 800;
  
              let width = img.width;
              let height = img.height;
  
              if (width > height && width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
              } else if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
              }
  
              canvas.width = width;
              canvas.height = height;
              ctx?.drawImage(img, 0, 0, width, height);
  
              resolve(canvas.toDataURL("image/jpeg", 0.8)); // ลดคุณภาพรูปเป็น 80%
            };
          };
          reader.onerror = reject;
        });
      });
  
      Promise.all(promises)
        .then((base64Images) => {
          setImages((prevImages) => [...prevImages, ...base64Images]);
          setImagePreviews((prevPreviews) => [...prevPreviews, ...base64Images]);
        })
        .catch((error) => console.error("Error converting images:", error));
    }
  };      

  const handleSave = async () => {
    const payload = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      createdAt,
      images,
    };
  
    console.log("🚀 ส่งข้อมูลไป Backend:", payload);
  
    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      console.log("🔍 Response status:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ ข้อผิดพลาดจาก Backend:", errorData);
        throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
      }
  
      const result = await response.json();
      console.log("✅ บันทึกข้อมูลสำเร็จ:", result);
      alert("บทความและรูปภาพถูกบันทึกเรียบร้อย!");
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาด:", error.message);
      alert("เกิดข้อผิดพลาดในการบันทึกบทความ");
    }
  };      

  //ยกเลิก
  const handleCancel = () => {
    setTitle(""); // รีเซ็ตค่า title
    setContent(""); // รีเซ็ตค่า content
    setTags(""); // รีเซ็ตค่า tags
    setImages([]); // รีเซ็ตค่า images
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
            // onClick={handleCancel}
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
