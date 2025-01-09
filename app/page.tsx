<<<<<<< HEAD
import Navbar from "./Navbar";

=======
"use client";
>>>>>>> master

import React from "react";
import { Box, Button, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import Navbar from "@/app/navbar/homeNavbar";

export default function Home() {
  return (
<<<<<<< HEAD
    <div>
    <Navbar/>
    <div className=" text-6xl mt-6">
      Blogs Page 
    </div>
    </div>
=======
    <>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80vh",
          paddingTop: "2rem",
        }}
      >
        <Box
          sx={{
            width: "40%",
            height: "70%",
            borderRadius: "50%",
            backgroundColor: "#ccffe2", // สีของวงกลม
            position: "absolute",
            bottom: "-20%",
            left: "-20%",
            zIndex: 0,
          }}
        ></Box>
        {/* Text Section */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              fontWeight: "bold",
              color: "#000000",
              marginBottom: "1rem",
            }}
          >
            เขียน แบ่งปัน และค้นพบเรื่องราวใหม่
          </Typography>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              fontWeight: "normal",
              color: "#555555",
              marginBottom: "1rem",
            }}
          >
            สร้างแรงบันดาลใจผ่านบทความที่คุณรัก และค้นพบไอเดียใหม่ๆ
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              href="/home/highlights"
              variant="contained"
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#333333",
                },
              }}
            >
              อ่าน
            </Button>
            <Button
              href="/signin"
              variant="contained"
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#333333",
                },
              }}
            >
              เขียน
            </Button>
          </Box>
        </Box>

        {/* Image Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src="/images/Home.jpg"
            alt="Cleaning Illustration"
            style={{ maxWidth: "70%", height: "auto" }}
          />
        </Box>
      </Container>

      {/* Services Section */}
      <Container sx={{ paddingTop: "4rem" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#000000",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Popular
        </Typography>
        <Grid container spacing={4}>
          {/* Service 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Home Cleaning
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Professional home cleaning services to make your house spotless.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Service 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Office Cleaning
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Keep your office clean and professional with our expert team.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Service 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Carpet Cleaning
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Deep cleaning for carpets to make them look as good as new.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer Section */}
      <Box
        sx={{
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "2rem",
          marginTop: "4rem",
          textAlign: "center",
        }}
      >
        <Typography variant="body1">
          © 2025 Clean Home.
        </Typography>
      </Box>
    </>
>>>>>>> master
  );
}
