"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sb from "@/app/navbar/page";
import AutherAfterLogin from "@/app/navbar/AutherAfterLogin";

// สีสำหรับกราฟ
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface Post {
  id: number;
  title: string;
  likeCount: number;
  commentCount: number;
  tags: string[];
}

export default function Statistics() {
  const { user, isLoggedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (query: string) => {
    // ในหน้า statistics เราอาจจะไม่ต้องทำอะไรกับการค้นหา
    console.log("Search query:", query);
  };

  // ดึงข้อมูลโพสต์ทั้งหมดของผู้ใช้
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user?.userId) return;

      try {
        const response = await fetch(`http://localhost:3001/contents?userId=${user.userId}`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user?.userId]);

  // เตรียมข้อมูลสำหรับกราฟแท่ง
  const barChartData = posts.map(post => ({
    name: post.title.substring(0, 20) + "...",
    likes: post.likeCount,
    comments: post.commentCount,
  }));

  // เตรียมข้อมูลสำหรับกราฟวงกลม (แท็ก)
  const tagData = posts.reduce((acc: { name: string; value: number }[], post) => {
    post.tags?.forEach(tag => {
      const existingTag = acc.find(item => item.name === tag);
      if (existingTag) {
        existingTag.value += 1;
      } else {
        acc.push({ name: tag, value: 1 });
      }
    });
    return acc;
  }, []);

  // เรียงลำดับโพสต์ตามจำนวนไลค์
  const topPosts = [...posts]
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 5);

  if (loading) return <Typography>กำลังโหลด...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      {isLoggedIn ? (
        <AutherAfterLogin 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar}
        />
      ) : (
        <Sb 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar}
          handleSearch={handleSearch}
        />
      )}
      
      <Container 
        sx={{
          marginRight: 15,
          marginLeft: isSidebarOpen ? "240px" : "72px",
          marginTop: "72px",
          transition: "margin-left 0.3s",
          padding: "16px",
          maxWidth: {
            xs: "100%",
            sm: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 72px)",
            md: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 72px)",
          },
        }}
      >
        <Typography variant="h4" gutterBottom>
          สถิติเนื้อหา
        </Typography>

        <Grid container spacing={3}>
          {/* กราฟแท่งแสดงไลค์และคอมเมนต์ */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                การมีส่วนร่วมในบทความ
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="likes" fill="#8884d8" name="ไลค์" />
                  <Bar dataKey="comments" fill="#82ca9d" name="คอมเมนต์" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* กราฟวงกลมแสดงสัดส่วนแท็ก */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                สัดส่วนแท็ก
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tagData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tagData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* ตารางแสดงบทความยอดนิยม */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                บทความยอดนิยม
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell key="header-title">ชื่อบทความ</TableCell>
                      <TableCell key="header-likes" align="right">ไลค์</TableCell>
                      <TableCell key="header-comments" align="right">คอมเมนต์</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topPosts.map((post) => (
                      <TableRow key={`post-${post.id}`}>
                        <TableCell key={`title-${post.id}`} component="th" scope="row">
                          {post.title}
                        </TableCell>
                        <TableCell key={`likes-${post.id}`} align="right">
                          {post.likeCount}
                        </TableCell>
                        <TableCell key={`comments-${post.id}`} align="right">
                          {post.commentCount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
