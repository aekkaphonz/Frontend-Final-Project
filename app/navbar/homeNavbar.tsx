"use client";

import React from "react";
import SearchIcon from "@mui/icons-material/Search"; 
import AddIcon from "@mui/icons-material/Add"; 
import { AppBar, Toolbar, Button, Box, TextField, InputAdornment, Typography} from "@mui/material";
import Link from "next/link";


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
                        <Link href="/signin" >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: themeColors.text,
                                }}
                            >
                                สร้าง
                            </Typography>
                        </Link>
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
