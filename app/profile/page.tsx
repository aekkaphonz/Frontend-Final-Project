"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Container, Grid, Paper, Typography, Box, Avatar, IconButton } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import Sb from "@/app/sidebarAuther/page";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(2),
  textAlign: "center",
  border: "1px solid #EBE8E8",
  boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
  borderRadius: 15,
  color: theme.palette.text.secondary,
}));

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // ข้อมูลตัวอย่าง
  const userData = {
    avatar: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "johndoe@example.com",
    gender: "Male",
    birthDate: "1990-05-15",
  };

  const age = calculateAge(userData.birthDate);

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1400px",
        marginRight: 15,
      }}
    >
      <Sb isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Grid container spacing={3} sx={{ marginLeft: isSidebarOpen ? "240px" : "72px", marginTop: "72px", transition: "margin-left 0.3s" }}>
        <Grid item md={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 3 }}>โปรไฟล์</Typography>
        </Grid>

        <Grid item md={4}>
          <Item>
            <Avatar
              alt={userData.name}
              src={userData.avatar}
              sx={{ width: 150, height: 150, margin: "0 auto" }}
            />
            <Typography sx={{ fontSize: 18, fontWeight: "bold", mt: 2 }}>
              {userData.name}
            </Typography>
            <Typography sx={{ color: "gray", fontSize: 14 }}>
              <EmailIcon sx={{ fontSize: 18, mr: 1 }} />
              {userData.email}
            </Typography>
          </Item>
        </Grid>

        <Grid item md={8}>
          <Item>
            <Typography sx={{ fontWeight: "bold", fontSize: 20, mb: 2 }}>ข้อมูลส่วนตัว</Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <MaleIcon sx={{ color: "blue", mr: 2 }} />
              <Typography>เพศ: {userData.gender}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CakeIcon sx={{ color: "pink", mr: 2 }} />
              <Typography>วันเกิด: {userData.birthDate}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>อายุ: {age} ปี</Typography>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}
