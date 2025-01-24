"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {Container,Card,CardContent,CardMedia,Typography,Box,IconButton,Tooltip,TextField,InputAdornment,Menu,MenuItem,} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/AfterLogin";
import { useAuth } from "@/app/context/AuthProvider"; 

interface User {
  id: string;
  name: string;
  email: string;
}

interface Attraction {
  _id: string;
  title: string;
  content: string;
  images: string[]; // รูปภาพเป็น array
  likeCount: number;
}

interface Comment {
  id: number;
  name: string;
  message: string;
  replies?: Comment[];
  timestamp: string;
}

export default function Page() {
  const { isLoggedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState<Attraction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<{ commentId: number; replyId: number | null } | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuCommentId, setMenuCommentId] = useState<number | null>(null);
  const [menuReplyId, setMenuReplyId] = useState<{ commentId: number; replyId: number } | null>(null);
  const [anchorReplyEl, setAnchorReplyEl] = useState<null | HTMLElement>(null);
  const params: any = useParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchComments(postId: string) {
      try {
        const res = await fetch(`http://localhost:3001/comments/content/${postId}`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const result = await res.json();
        console.log("Fetched comments:", result); // ตรวจสอบผลลัพธ์
        setComments(
          result.map((comment: any) => ({
            id: comment._id,
            name: "Anonymous", // หรือดึงชื่อจากข้อมูล userId
            message: comment.comment,
            timestamp: new Date(comment.createdAt).toLocaleString(),
            replies: comment.replies || [],
          }))
        );
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    if (data) {
      fetchComments(data._id);
    }
  }, [data]);
  
  
  useEffect(() => {
    async function fetchData(id: string) {
      try {
        const res = await fetch(`http://localhost:3001/posts/${id}`);
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

  // เพิ่มฟังก์ชันสำหรับ API
async function fetchComments(postId: string) {
  const res = await fetch(`http://localhost:3001/comments/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

async function addComment(postId: string, message: string) {
  const res = await fetch(`http://localhost:3001/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, message }),
  });
  if (!res.ok) throw new Error("Failed to add comment");
  return res.json();
}

async function deleteComment(commentId: string) {
  const res = await fetch(`http://localhost:3001/comments/${commentId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return res.json();
}

async function editComment(commentId: string, newMessage: string) {
  const res = await fetch(`http://localhost:3001/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: newMessage }),
  });
  if (!res.ok) throw new Error("Failed to edit comment");
  return res.json();
}

async function toggleLike(postId: string) {
  const res = await fetch(`http://localhost:3001/posts/${postId}/like`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to toggle like");
  return res.json();
}


  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        name: "Anonymous",
        message: newComment,
        timestamp: new Date().toLocaleString(),
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
                  timestamp: new Date().toLocaleString(),
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEditComment = (commentId: number, newMessage: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, message: newMessage } : comment
    );
    setComments(updatedComments);
    setEditingCommentId(null);
  };

  const handleEditReply = (commentId: number, replyId: number, newMessage: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            replies: comment.replies?.map((reply) =>
              reply.id === replyId ? { ...reply, message: newMessage } : reply
            ),
          }
        : comment
    );
    setComments(updatedComments);
    setEditingReplyId(null);
  };

  const handleDeleteComment = (commentId: number) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentId: number, replyId: number) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            replies: comment.replies?.filter((reply) => reply.id !== replyId),
          }
        : comment
    );
    setComments(updatedComments);
  };

  const handleLike = () => {
    if (data) {
      const updatedLikes = data.likeCount + 1;
      setData({ ...data, likeCount: updatedLikes });
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, commentId: number) => {
    setAnchorEl(event.currentTarget);
    setMenuCommentId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuCommentId(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Container
        maxWidth="md"
        sx={{ mt: 4, textAlign: "center", flexGrow: 1, paddingTop: "80px" }}
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
              image={data.images.length > 0 ? data.images[0] : ""}
              alt="ไม่มีรูปภาพ"
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ color: "#77bfa3", fontWeight: "bold" }}
              >
                {data.title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#616161", mt: 2 }}>
                {data.content}
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
                  <IconButton sx={{ color: "#f50057" }}>
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {comments.length + comments.reduce((acc, comment) => acc + (comment.replies?.length || 0), 0)} ความคิดเห็น
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleLike}>
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={handleAddComment}
                    edge="end"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="body1">
                    <strong>{comment.name}:</strong> {comment.message}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    {comment.timestamp}
                  </Typography>
                </Box>
                <IconButton
                  onClick={(e) => handleMenuOpen(e, comment.id)}
                  size="small"
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={menuCommentId === comment.id}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => setEditingCommentId(comment.id)}>
                  แก้ไข
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleDeleteComment(comment.id);
                    handleMenuClose();
                  }}
                >
                  ลบ
                </MenuItem>
              </Menu>

              {editingCommentId === comment.id && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    defaultValue={comment.message}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditComment(comment.id, replyMessage.trim())}
                            edge="end"
                          >
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    autoFocus
                  />

                </Box>
              )}

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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography>
                          <strong>{reply.name}:</strong> {reply.message}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#888" }}>
                          {reply.timestamp}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={(e) => {
                          setAnchorReplyEl(e.currentTarget);
                          setMenuReplyId({ commentId: comment.id, replyId: reply.id });
                        }}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <Menu
                      anchorEl={anchorReplyEl}
                      open={menuReplyId?.replyId === reply.id && menuReplyId?.commentId === comment.id}
                      onClose={() => {
                        setAnchorReplyEl(null);
                        setMenuReplyId(null);
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          setEditingReplyId({ commentId: comment.id, replyId: reply.id });
                          setAnchorReplyEl(null);
                        }}
                      >
                        แก้ไข
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDeleteReply(comment.id, reply.id);
                          setAnchorReplyEl(null);
                        }}
                      >
                        ลบ
                      </MenuItem>
                    </Menu>

                    {editingReplyId?.replyId === reply.id && (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          defaultValue={reply.message}
                          onBlur={(e) =>
                            handleEditReply(comment.id, reply.id, e.target.value.trim())
                          }
                          autoFocus
                        />
                      </Box>
                    )}
                  </Box>
                ))}

              <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => setReplyingToCommentId(comment.id)}
                >
                  <ReplyIcon /> ตอบกลับ
                </IconButton>
              </Box>

              {replyingToCommentId === comment.id && (
                <TextField
                  fullWidth
                  placeholder="ตอบกลับ..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleAddReply(comment.id)}>
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}