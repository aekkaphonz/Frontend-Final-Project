"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const themeColors = {
    primary: "#ffffff",
    text: "#000000",
    buttonBorder: "#000000",
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
                {/* Logo */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        color: themeColors.text,
                    }}
                >
                    Blogs
                </Typography>


                {/* Call to Action Button */}
                <Button
                    href="/signin"
                    variant="outlined"
                    sx={{
                        borderColor: themeColors.buttonBorder,
                        color: themeColors.text,
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "black",
                            borderColor: themeColors.text,
                            color: "white",
                        },
                    }}
                >
                    Sign in
                </Button>
            </Toolbar>
        </AppBar>
    );
}
