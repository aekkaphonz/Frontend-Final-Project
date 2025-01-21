"use client";

import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Tooltip,
  Typography,
  Button,
  Avatar,
  Divider,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Navbar from "@/app/homeMember/navbarhouse";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import HomeIcon from '@mui/icons-material/Home';
import Link from "next/link";

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    Swal.fire({
      title: "บันทึกข้อมูลเรียบร้อยแล้ว!",
      icon: "success",
    });
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Container
         sx={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
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
        {/* Sidebar */}
        <Box
          sx={{
            width: isSidebarOpen ? 240 : 72,
            height: "100vh",
            backgroundColor: "#ffffff",
            transition: "width 0.3s",
            position: "fixed",
            top: 64,
            left: 0,
            boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
         <List>
         <Tooltip title="หน้าหลัก" placement="right">
                <Link href="/homeMember/house" passHref>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: isSidebarOpen ? "row" : "column",
                      alignItems: "center",
                      justifyContent: isSidebarOpen ? "flex-start" : "center",
                      padding: isSidebarOpen ? "12px 20px" : "12px 0",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#000", minWidth: "40px" }}>
                      <HomeIcon />
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <ListItemText primary="หน้าหลัก" sx={{ color: "#000" }} />
                    )}
                  </ListItem>
                </Link>
              </Tooltip>

              <Tooltip title="แดชบอร์ด" placement="right">
                <Link href="/dashboard" passHref>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: isSidebarOpen ? "row" : "column",
                      alignItems: "center",
                      justifyContent: isSidebarOpen ? "flex-start" : "center",
                      padding: isSidebarOpen ? "12px 20px" : "12px 0",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#000", minWidth: "40px" }}>
                      <DashboardIcon />
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <ListItemText primary="แดชบอร์ด" sx={{ color: "#000" }} />
                    )}
                  </ListItem>
                </Link>
              </Tooltip>

              <Tooltip title="บทความ" placement="right">
                <Link href="/blog" passHref>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: isSidebarOpen ? "row" : "column",
                      alignItems: "center",
                      justifyContent: isSidebarOpen ? "flex-start" : "center",
                      padding: isSidebarOpen ? "12px 20px" : "12px 0",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#000", minWidth: "40px" }}>
                      <CollectionsBookmarkIcon />
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <ListItemText primary="บทความ" sx={{ color: "#000" }} />
                    )}
                  </ListItem>
                </Link>
              </Tooltip>

              <Tooltip title="สถิติ" placement="right">
                <Link href="/statistics" passHref>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: isSidebarOpen ? "row" : "column",
                      alignItems: "center",
                      justifyContent: isSidebarOpen ? "flex-start" : "center",
                      padding: isSidebarOpen ? "12px 20px" : "12px 0",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#000", minWidth: "40px" }}>
                      <InsertChartIcon />
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <ListItemText primary="สถิติ" sx={{ color: "#000" }} />
                    )}
                  </ListItem>
                </Link>
              </Tooltip>

              <Tooltip title="ออกจากระบบ" placement="right">
                <Link href="/" passHref>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: isSidebarOpen ? "row" : "column",
                      alignItems: "center",
                      justifyContent: isSidebarOpen ? "flex-start" : "center",
                      padding: isSidebarOpen ? "12px 20px" : "12px 0",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#ff4d4f", minWidth: "40px" }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <ListItemText primary="ออกจากระบบ" sx={{ color: "#ff4d4f" }} />
                    )}
                  </ListItem>
                </Link>
              </Tooltip>
            </List>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            marginLeft: isSidebarOpen ? "240px" : "72px",
            width: "100%",
            maxWidth: "800px",
            margin: "2rem auto",
            backgroundColor: "#edf4e4",
            borderRadius: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            padding: "2rem",
            position: "relative",
            top: "-70px", // เลื่อนกล่องขึ้น
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: "#91c7a7",
              padding: "1rem",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                textAlign: "",
              }}
            >
              สมาชิกหมายเลข 1234567
            </Typography>
          </Box>

          {/* Profile Form */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "2rem",
              marginTop: "1.5rem",
            }}
          >
            {/* Profile Picture */} 
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >
                <Avatar
                    src={selectedImage || "/images/user-avatar.png"} // เปลี่ยนเป็น state ของรูปที่เลือก
                    alt="User Avatar"
                    sx={{
                    width: "120px",
                    height: "120px",
                    border: "2px solid #91c7a7",
                    }}
                />
                <Button
                    variant="outlined"
                    component="label" // ใช้สำหรับ input file
                    sx={{
                    marginTop: "1rem",
                    color: "#77bfa3",
                    borderColor: "#77bfa3",
                    textTransform: "none",
                    "&:hover": {
                        borderColor: "#77bfa3",
                    },
                    }}
                >
                    เลือกรูปโปรไฟล์
                    <input
                    type="file"
                    accept="image/*"
                    hidden // ซ่อน input file
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            setSelectedImage(event.target.result); // อัปเดต state รูปภาพ
                        };
                        reader.readAsDataURL(e.target.files[0]);
                        }
                    }} //แดงแต่รันได้
                    />
                </Button>
            </Box>


            <Divider orientation="vertical" flexItem />

            {/* Form Inputs */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Name and Email */}
              <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", flex: "0 0 100px" }}>
                  ชื่อผู้ใช้ :
                </Typography>
                <TextField
                  variant="standard"
                  fullWidth
                  placeholder="กรอกชื่อผู้ใช้"
                  sx={{ flex: 1 }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", flex: "0 0 100px" }}>
                  อีเมล :
                </Typography>
                <TextField
                  variant="standard"
                  fullWidth
                  placeholder="กรอกอีเมล"
                  sx={{ flex: 1 }}
                />
              </Box>

              {/* Gender */}
              <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", flex: "0 0 100px" }}>
                  เพศ :
                </Typography>
                <Select
                  variant="standard"
                  defaultValue=""
                  displayEmpty
                  sx={{ flex: 1 }}
                >
                  <MenuItem value="">เลือกเพศ</MenuItem>
                  <MenuItem value="male">ชาย</MenuItem>
                  <MenuItem value="female">หญิง</MenuItem>
                  <MenuItem value="other">อื่น ๆ</MenuItem>
                </Select>
              </Box>

              {/* Birthdate */}
              <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", flex: "0 0 100px" }}>
                  วันเกิด :
                </Typography>
                <Box sx={{ display: "flex", gap: "0.5rem", flex: 1 }}>
                  <Select variant="standard" fullWidth defaultValue="" displayEmpty>
                    <MenuItem value="">วัน</MenuItem>
                    {[...Array(31).keys()].map((day) => (
                      <MenuItem key={day + 1} value={day + 1}>
                        {day + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select variant="standard" fullWidth defaultValue="" displayEmpty>
                    <MenuItem value="">เดือน</MenuItem>
                    {[
                      "มกราคม",
                      "กุมภาพันธ์",
                      "มีนาคม",
                      "เมษายน",
                      "พฤษภาคม",
                      "มิถุนายน",
                      "กรกฎาคม",
                      "สิงหาคม",
                      "กันยายน",
                      "ตุลาคม",
                      "พฤศจิกายน",
                      "ธันวาคม",
                    ].map((month, index) => (
                      <MenuItem key={index} value={index + 1}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select variant="standard" fullWidth defaultValue="" displayEmpty>
                    <MenuItem value="">ปี</MenuItem>
                    {[...Array(100).keys()]
                      .map((year) => 2023 - year)
                      .map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </Box>

              {/* About Me */}
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  แนะนำตัว :
                </Typography>
                <TextField
                  variant="outlined"
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="เขียนเกี่ยวกับตัวคุณ"
                />
              </Box>

              {/* Submit Button */}
              <Box sx={{ textAlign: "right", marginTop: "1rem" }}> {/* ปรับให้ชิดขวา */}
                <Button
                  variant="contained"
                  onClick={handleSubmit} // Add click event
                  sx={{
                    backgroundColor: "#91c7a7",
                    color: "#ffffff",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#77bfa3",
                    },
                  }}
                >
                  บันทึกข้อมูล
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
