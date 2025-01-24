"use client";

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Container, Grid, Paper, Typography, Box, Avatar } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
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

type User = {
  _id: string;
  email: string;
  userName: string;
  gender: string;
  dateOfBirth: string;
  profileImage: string;
};

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const fetchUserData = async () => {
    try {
      const response = await axios.get<User>("http://localhost:3001/user/profile", {
        withCredentials: true,
      });
      console.log("API Response:", response.data);
      if (response.data) {
        setUser(response.data); 
      } else {
        setError("No user data found");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>No user data available</p>;
  }

  const age = calculateAge(user.dateOfBirth);

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
              alt={user.userName}
              src={user.profileImage || "https://via.placeholder.com/150"}
              sx={{ width: 150, height: 150, margin: "0 auto" }}
            />
            <Typography sx={{ fontSize: 18, fontWeight: "bold", mt: 2 }}>
              {user.userName}
            </Typography>
            <Typography sx={{ color: "gray", fontSize: 14 }}>
              <EmailIcon sx={{ fontSize: 18, mr: 1 }} />
              {user.email}
            </Typography>
          </Item>
        </Grid>

        <Grid item md={8}>
          <Item>
            <Typography sx={{ fontWeight: "bold", fontSize: 20, mb: 2 }}>ข้อมูลส่วนตัว</Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <MaleIcon sx={{ color: "blue", mr: 2 }} />
              <Typography>เพศ: {user.gender}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CakeIcon sx={{ color: "pink", mr: 2 }} />
              <Typography>วันเกิด: {user.dateOfBirth}</Typography>
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
