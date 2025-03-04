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
        console.log("Posts data:", data); // เพิ่มบรรทัดนี้เพื่อตรวจสอบข้อมูล
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
  const barChartData = posts.map(post => {
    console.log("Processing post:", post); // เพิ่มบรรทัดนี้เพื่อตรวจสอบข้อมูล
    return {
      name: post.title.substring(0, 15) + "...",
      likeCount: post.likeCount || 0,
      commentCount: post.commentCount || 0,
    };
  });
  console.log("Bar chart data:", barChartData); // เพิ่มบรรทัดนี้เพื่อตรวจสอบข้อมูล

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
                  <XAxis dataKey="name" textAnchor="end" height={50} />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => {
                      const label = name === "likeCount" ? "ไลค์" : "ความคิดเห็น";
                      return [`${value} ${label}`, label];
                    }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    payload={[
                      { value: 'ไลค์', type: 'rect', color: '#8884d8' },
                      { value: 'ความคิดเห็น', type: 'rect', color: '#82ca9d' }
                    ]}
                  />
                  <Bar dataKey="likeCount" fill="#8884d8" name="likeCount" barSize={60} />
                  <Bar dataKey="commentCount" fill="#82ca9d" name="commentCount" barSize={60} />
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
                      <TableCell>ชื่อบทความ</TableCell>
                      <TableCell align="right">ไลค์</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topPosts.map((post, index) => (
                      <TableRow key={post.id ? `post-${post.id}` : `post-${index}`}>
                        <TableCell>{post.title}</TableCell>
                        <TableCell align="right">{post.likeCount}</TableCell>
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
