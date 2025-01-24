"use client";

import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Tooltip,
  Typography,
} from "@mui/material";
import Navbar from "@/app/homeMember/navbarhouse";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import Link from "next/link";
import CampaignIcon from '@mui/icons-material/Campaign';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function SidebarLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navbar พร้อมการส่งฟังก์ชัน toggleSidebar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <Container sx={{ paddingTop: "4rem", textAlign: "center" }}>
        <Box
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
              backgroundColor: "#fff",
              transition: "width 0.3s",
              position: "fixed",
              top: 64,
              left: 0,
              zIndex: 1200,
              overflow: "hidden",
              boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
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

            {/* Card 1 */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "column", // จัดเรียงเนื้อหาในแนวตั้ง
                    width: "100%",
                    maxWidth: "600px", // จำกัดความกว้างสูงสุด
                    backgroundColor: "#ccffe2",
                    padding: "2rem", // เพิ่ม Padding
                    borderRadius: "16px", // เพิ่มความโค้ง
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    textAlign: "center", // จัดข้อความให้อยู่ตรงกลาง
                    position: "relative",
                    top: "-30px", // เลื่อนกล่องขึ้น
                }}
            >
                <Link href="/createBlog" passHref>  
                    <CampaignIcon
                        sx={{
                        fontSize: "4rem", // ขนาดไอคอน
                        color: "#000000", // สีของไอคอน

                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                        fontWeight: "bold",
                        color: "#000000", // สีข้อความ
                        fontSize: "1.5rem", // ขนาดข้อความ
                        marginTop: "1rem", // เพิ่มระยะห่างจากไอคอน
                        }}
                    >
                        เขียนบทความใหม่
                    </Typography>
                </Link>
            </Box>

            {/* Card 2 */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "column", // จัดเรียงเนื้อหาในแนวตั้ง
                    width: "100%",
                    maxWidth: "600px", // จำกัดความกว้างสูงสุด
                    backgroundColor: "#ccffe2",
                    padding: "2rem", // เพิ่ม Padding
                    borderRadius: "16px", // เพิ่มความโค้ง
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    textAlign: "center", // จัดข้อความให้อยู่ตรงกลาง
                    position: "relative",
                    top: "-30px", // เลื่อนกล่องขึ้น
                }}
            >
                <Link href="/blog" passHref>
                    <AssignmentIcon
                        sx={{
                        fontSize: "4rem", // ขนาดไอคอน
                        color: "#000000", // สีของไอคอน
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                        fontWeight: "bold",
                        color: "#000000", // สีข้อความ
                        fontSize: "1.5rem", // ขนาดข้อความ
                        marginTop: "1rem", // เพิ่มระยะห่างจากไอคอน
                        }}
                    >
                        บทความของฉัน
                    </Typography>
                </Link>
            </Box>
        </Box>
      </Container>
    </>
  );
}
