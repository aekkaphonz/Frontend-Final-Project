

"use client";


import React from "react";
import { Box, Button, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import Navbar from "@/app/navbar/homeNavbar";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from "next/link";




export default function Home() {
  return (

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
            แบ่งปันเรื่องราวที่น่าจดจำของคุณ!
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
              สำรวจบทความ
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
              สร้างสรรค์บทความ
            </Button>
          </Box>
        </Box>

        {/* Image Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "75%",
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
          แนะนำ
        </Typography>
        <Grid container spacing={4}>
          {/* Service 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 2 }}>
              <Link href="/home/highlights" passHref>
                <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ marginBottom: "0.5rem" }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    บทความทั้งหมด
                  </Typography>
                  <ArrowForwardIcon 
                    href="/home/highlights"
                    sx={{ 
                      fontSize: "30px",
                    }} 
                  />
                </Box>
                  <Typography variant="body2" color="textSecondary">
                    พบกับบทความและไอเดียสร้างแรงบันดาลใจใหม่ ๆ ที่ช่วยเติมเต็มความคิดสร้างสรรค์และเป้าหมายในชีวิตของคุณ.
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>

          {/* Service 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 2 }}>
              <Link href="/home/highlights" passHref>
                <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ marginBottom: "0.5rem" }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    บทความที่น่าสนใจ
                  </Typography>
                  <ArrowForwardIcon 
                    sx={{ 
                      fontSize: "30px",
                    }} 
                  />
                </Box>
                  <Typography variant="body2" color="textSecondary">
                    บทความที่คัดสรรมาเพื่อเสริมสร้างแรงบันดาลใจและมุมมองใหม่ ๆ ในการพัฒนาตนเองและการใช้ชีวิต.
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>

          {/* Service 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 2 }}>
              <Link href="/home/highlights" passHref>
                <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ marginBottom: "0.5rem" }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    บทความใหม่ล่าสุด
                  </Typography>
                  <ArrowForwardIcon 
                    sx={{ 
                      fontSize: "30px",
                    }} 
                  />
                </Box>
                  <Typography variant="body2" color="textSecondary">
                    ติดตามบทความใหม่ล่าสุดที่นำเสนอเรื่องราวและแนวคิดที่ช่วยให้คุณเริ่มต้นวันใหม่อย่างสดใส.
                  </Typography>
                </CardContent>
              </Link>
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

  );
}