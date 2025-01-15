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

interface Attraction {
  id: string;
  name: string;
  detail: string;
  coverimage: string;
  likeCount: number;
}

interface Comment {
  id: number;
  name: string;
  message: string;
  replies?: Comment[];
}

export default function Page() {
  const [data, setData] = useState<Attraction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(
    null
  );
  const params: any = useParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchData(id: string) {
      try {
        const res = await fetch(
          `https://melivecode.com/api/attractions/${id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();

        setData({
          ...result.attraction,
          likeCount: 0,
        });

        setComments([]);
        setLoading(false);
      } catch (err: any) {
        console.error(err.message);
        setError("ไม่สามารถโหลดข้อมูลได้");
        setLoading(false);
      }
    }

    if (params && params.id) {
      fetchData(params.id);
    } else {
      setError("ไม่พบพารามิเตอร์ ID");
      setLoading(false);
    }
  }, [params]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        name: "Anonymous",
        message: newComment,
        replies: [],
      };
      const updatedComments = [...comments, comment];
      setComments(updatedComments);
      setNewComment("");
    }
  };

  const handleAddReply = (commentId: number) => {
    if (replyMessage.trim()) {
      const updatedComments = comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...(comment.replies || []),
                {
                  id: (comment.replies?.length || 0) + 1,
                  name: "Anonymous",
                  message: replyMessage,
                },
              ],
            }
          : comment
      );

      setComments(updatedComments);
      setReplyMessage("");
      setReplyingToCommentId(null);
    }
  };

  const handleLike = () => {
    if (data) {
      const updatedLikes = data.likeCount + 1;
      setData({ ...data, likeCount: updatedLikes });
    }
  };

  const handleGoBack = () => {
    router.back();
  };

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