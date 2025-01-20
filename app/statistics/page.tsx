"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Container, Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Sb from "@/app/sidebarAuther/page";

import ReactECharts from "echarts-for-react"; // ใช้สำหรับสร้าง ECharts

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    border: "1px solid #EBE8E8",
    boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.3)",
    borderRadius: 15,
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

export default function Page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chartType, setChartType] = useState("all");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const allData = [150, 230, 224, 218, 135, 147, 260];
    const contentData = [120, 200, 190, 170, 110, 130, 210];

    const options = {
        xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: chartType === "all" ? allData : contentData, // เปลี่ยนข้อมูลตามสถานะ
                type: "line",
                smooth: true, // เส้นโค้ง
                lineStyle: {
                    color: "#77bfa3", // สีของเส้น
                },
                itemStyle: {
                    color: "#77bfa3", // สีของจุด
                },
            },
        ],
        tooltip: {
            trigger: "axis", // แสดง tooltip เมื่อชี้บนแกน
        },
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                maxWidth: "1400px",
                marginRight: 15,
            }}
        >
            <Sb isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Grid container spacing={2} sx={{ marginLeft: isSidebarOpen ? "240px" : "72px", marginTop: "72px", transition: "margin-left 0.3s" }}>
                <Grid item md={12}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 1 }}>สถิติการอ่าน</Typography>
                </Grid>
                <Grid item md={12} sx={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)" }}>
                    <Box sx={{ display: "flex", justifyContent: "start" }}>
                        <Button
                            variant={chartType === "all" ? "contained" : "text"}
                            onClick={() => setChartType("all")}
                        >
                            ทั้งหมด
                        </Button>
                        <Button
                            variant={chartType === "content" ? "contained" : "text"}
                            onClick={() => setChartType("content")}
                        >
                            เนื้อหา
                        </Button>
                    </Box>
                </Grid>
                <Grid item md={12}>
                    <ReactECharts
                        option={options} // ส่ง option เข้าไปใน ECharts
                        style={{ height: "400px", width: "100%" }} // กำหนดขนาดกราฟ
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
