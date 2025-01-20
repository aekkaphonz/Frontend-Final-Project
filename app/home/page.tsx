"use client";

import React from 'react'
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Button } from "@mui/material";

export default function page() {
    return (
        <>
        
            <Typography variant="h6" gutterBottom sx={{
                mb: 2, mt: 4,
                borderBottom: "1px solid #176B87",
                backgroundColor: "#86B6F6",
                paddingLeft: 1,
                borderRadius: 1,
            }}>
                บทความที่น่าสนใจ
            </Typography>
        </>
    )
}