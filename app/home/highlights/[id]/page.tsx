"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface Post {
    _id: string;
    title: string;
    content: string;
    images: string[]; // รูปภาพเป็น array
}

export default function Page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // สำหรับควบคุม Sidebar
    const [data, setData] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams(); // ดึง `id` จาก dynamic route

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchData = async (id: string) => {
            try {
                const res = await fetch(`http://localhost:3001/posts/${id}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch data with status: ${res.status}`);
                }
                const result: Post = await res.json();
                setData(result);
            } catch (error: any) {
                console.error("Error fetching data:", error.message);
                setError("ไม่สามารถโหลดข้อมูลได้");
            } finally {
                setLoading(false);
            }
        };

        if (params?.id) {
            console.log("Fetching data for ID:", params.id);
            fetchData(params.id);
        } else {
            console.error("ไม่พบพารามิเตอร์ ID");
            setError("ไม่พบพารามิเตอร์ ID");
            setLoading(false);
        }
    }, [params]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          textAlign: "center",
          flexGrow: 1,
          paddingTop: "80px",
        }}
      >
        {loading ? (
          <Typography variant="h5" sx={{ mt: 4, color: "#616161" }}>
            กำลังโหลด...
          </Typography>
        ) : error ? (
          <Typography variant="h5" sx={{ mt: 4, color: "#f44336" }}>
            {error}
          </Typography>
        ) : data ? (
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 4,
              overflow: "hidden",
              backgroundColor: "#f9fbe7",
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: 300 }}
              image={data.coverimage}
              alt={data.name}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ color: "#77bfa3", fontWeight: "bold" }}
              >
                {data.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "#616161", mt: 2 }}>
                {data.detail}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              <Box>
                <Tooltip title="แชร์">
                  <IconButton sx={{ color: "#000000" }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="เพิ่มในรายการโปรด">
                  <IconButton 
                    sx={{ color: "#f50057" }}>
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleLike} 
                >
                  <FavoriteBorderIcon />
                </IconButton>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {data.likeCount} ถูกใจ
                </Typography>
              </Box>
            </Box>
          </Card>
        ) : (
          <Typography variant="h5" sx={{ mt: 4, color: "#616161" }}>
            ไม่พบข้อมูล
          </Typography>
        )}

        {/* Comments Section */}
        <Box
          sx={{
            mt: 4,
            p: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            แสดงความคิดเห็น
          </Typography>
          <TextField
            fullWidth
            placeholder="เพิ่มคอมเมนต์..."
            multiline
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            sx={{ mb: 2 }}
          >
            ส่ง
          </Button>
          {comments.map((comment) => (
            <Box
              key={comment.id}
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "#fff",
                borderRadius: 1,
                textAlign: "left",
              }}
            >
              <Typography variant="body1">
                <strong>{comment.name}:</strong> {comment.message}
              </Typography>
              {comment.replies &&
                comment.replies.map((reply) => (
                  <Box
                    key={reply.id}
                    sx={{
                      mt: 1,
                      pl: 2,
                      borderLeft: "2px solid #ccc",
                      textAlign: "left",
                    }}
                  >
                    <Typography>
                      <strong>{reply.name}:</strong> {reply.message}
                    </Typography>
                  </Box>
                ))}
              <IconButton
                size="small"
                onClick={() => setReplyingToCommentId(comment.id)}
              >
                <ReplyIcon />
              </IconButton>
              {replyingToCommentId === comment.id && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="ตอบกลับ..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleAddReply(comment.id)}
                  >
                    ส่ง
                  </Button>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Container>

      {/* ปุ่มกลับไปหน้าก่อนหน้า */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGoBack}
        sx={{
          mt: 4,
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        กลับไปหน้าก่อนหน้า
      </Button>
    </Box>
  );
}
