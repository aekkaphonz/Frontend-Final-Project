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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Navbar from "@/app/homeMember/navbarhouse";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import HomeIcon from "@mui/icons-material/Home";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Link from "next/link";

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false); // State สำหรับเปิด/ปิด modal

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // เปิด Dialog
  const handleEditClick = () => {
    setOpenDialog(true);
  };

  // ปิด Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle form submission inside modal
  const handleSubmit = () => {
    Swal.fire({
      title: "บันทึกข้อมูลเรียบร้อยแล้ว!",
      icon: "success",
    });
    handleCloseDialog(); // ปิด modal หลังจากบันทึก
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
            top: "-20px", // เลื่อนกล่องขึ้น
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: "#91c7a7",
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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

            <Button
              variant="contained"
              startIcon={<BorderColorIcon />}
              onClick={handleEditClick} // เปิด dialog เมื่อคลิก
              sx={{
                backgroundColor: "#ffffff",
                color: "#91c7a7",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              แก้ไขข้อมูล
            </Button>
          </Box>

          {/* Profile  */}
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
            </Box>

            {/* แบ่งส่วน) */}
            <Divider orientation="vertical" flexItem />

            {/* แสดงข้อมูลส่วนตัว(แก้ไขไม่ได้) */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", flex: "0 0 100px"}}>
                  ชื่อผู้ใช้ :
                </Typography>
                <TextField variant="standard" fullWidth sx={{ flex: 1 }} disabled  />
              </Box>
              <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", flex: "0 0 100px" }}>
                  อีเมล :
                </Typography>
                <TextField variant="standard" fullWidth sx={{ flex: 1 }} disabled  />
              </Box>

              {/* About Me */}
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  แนะนำตัว :
                </Typography>
                <TextField variant="outlined" multiline rows={3} disabled fullWidth placeholder="เขียนเกี่ยวกับตัวคุณ" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Modal */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#98c9a3",
          color: "#fff",
          fontWeight: "bold",
          padding: "1rem",

        }}
      >
        แก้ไขข้อมูลส่วนตัว
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#f7faf6", padding: "2rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}>
          {/* Profile Picture */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar
              src={selectedImage || "/images/user-avatar.png"}
              alt="User Avatar"
              sx={{
                width: "120px",
                height: "120px",
                border: "1px solid #91c7a7",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                marginBottom: "1rem",
              }}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{
                color: "#91c7a7",
                borderColor: "#91c7a7",
                textTransform: "none",
                padding: "0.5rem 1.5rem",
                "&:hover": { borderColor: "#77bfa3", backgroundColor: "#f0f4f2" },
              }}
            >
              เลือกรูปโปรไฟล์
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setSelectedImage(event.target.result);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
            </Button>
          </Box>

          <Divider sx={{ width: "100%", marginY: "1rem", borderColor: "#77bfa3" }} />

          {/* Form Inputs */}
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Name and Email */}
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", flex: "0 0 100px" }}>
                ชื่อผู้ใช้ :
              </Typography>
              <TextField variant="standard" fullWidth placeholder="กรอกชื่อผู้ใช้" sx={{ flex: 1 }} />
            </Box>

            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", flex: "0 0 100px" }}>
                อีเมล :
              </Typography>
              <TextField variant="standard" fullWidth placeholder="กรอกอีเมล" sx={{ flex: 1 }} />
            </Box>

            {/* Gender */}
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", flex: "0 0 100px" }}>
                เพศ :
              </Typography>
              <Select variant="standard" defaultValue="" displayEmpty sx={{ flex: 1 }}>
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
              <TextField variant="outlined" multiline rows={3} fullWidth placeholder="เขียนเกี่ยวกับตัวคุณ" />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {/* Submit Button */}
      <DialogActions sx={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
        <Button  onClick={handleSubmit} 
          sx={{ 
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#77bfa3"
          }}
        >
          บันทึกข้อมูล
        </Button>

        <Button 
          onClick={handleCloseDialog} 
          sx={{ 
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#FF3366"
          }}
        >
          ยกเลิก
        </Button>
      </DialogActions>
    </Dialog>

    </>
  );
}
