"use client";

import React from "react";
import { AppBar, Toolbar, Button, Box, TextField, InputAdornment, Typography } from "@mui/material";
import Link from "next/link";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import SwitchTheme from "@/app/darkMode/components/SwitchTheme";

const themeColors = {
    primary: "#ffffff",
    text: "#000000",
    buttonBorder: "#000000",
    buttonGreen: "#77bfa3",
};

export default function HomeNavbar() {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: themeColors.primary,
                boxShadow: "none",
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Logo และข้อความ */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <img
                        src="/images/logo-blogs.png"
                        alt="Cleaning Illustration"
                        style={{ maxWidth: "180px", height: "auto" }} // ขนาดโลโก้
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            color: themeColors.text,
                        }}
                    >
                        Blogger DeeDee
                    </Typography>
                </Box>

                {/* Call to Action Buttons */}
                <Box
                    sx={{
                        display: "flex", // จัดปุ่มให้อยู่ในแนวนอน
                        gap: "20px", // ระยะห่างระหว่างปุ่ม
                    }}
                >
                    {/* ไอคอนและข้อความ "สร้าง" */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px", // ระยะห่างระหว่างไอคอนและข้อความ
                        }}
                    >
                        {/* ปุ่มเขียน */}
                        <Button href="/signin"
                            sx={{
                                color: "#ffffff",
                                backgroundColor: "#77bfa3",
                                "&:hover": {
                                    backgroundColor: "#F7F7F7",
                                    color: "#77bfa3"
                                },
                                borderRadius: "20px",
                                padding: "6px 16px",
                                textTransform: "none",
                                fontWeight: "bold",
                            }}
                            variant="contained"
                        >
                            <EditNoteOutlinedIcon sx={{ marginRight: 1 }} />
                            เขียน
                        </Button>
                    </Box>

                    {/* Signin Button */}
                    <Button
                        href="/signin"
                        variant="outlined"
                        sx={{
                            backgroundColor: "#ffffff",
                            color: themeColors.buttonGreen,
                            borderColor: themeColors.buttonGreen,
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: themeColors.buttonGreen,
                                borderColor: themeColors.buttonGreen,
                                color: "#ffffff",
                            },
                        }}
                    >
                        เข้าสู่ระบบ
                    </Button>

                    {/* Signup Button */}
                    <Button
                        href="/signup"
                        variant="contained"
                        sx={{
                            backgroundColor: themeColors.buttonGreen,
                            color: "#ffffff",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#ffffff",
                                borderColor: themeColors.buttonGreen,
                                color: themeColors.buttonGreen,
                            },
                        }}
                    >
                        ลงทะเบียน
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
