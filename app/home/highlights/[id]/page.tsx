"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Container, Card, CardContent, CardMedia, Typography, Box, IconButton, Tooltip, TextField, InputAdornment, Menu, MenuItem, } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/page";
import AfterLogin from "@/app/navbar/AfterLogin"
import { useAuth } from "@/app/context/AuthProvider";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Attraction {
  _id: string;
  title: string;
  detail: string;
  postImage: string;
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
  const { user } = useAuth();
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

  const editComment = async (commentId: string, newMessage: string) => {
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(`http://localhost:3001/comments/${commentId}`, {
        method: "PUT", // ใช้ PUT สำหรับการอัปเดตข้อมูล
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newMessage }), // ส่งข้อความใหม่ไปยัง API
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error("API Error:", errorMessage);
        throw new Error("Failed to edit comment");
      }

      const updatedComment = await res.json();

      // อัปเดต state ของ comments ใน Frontend
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === updatedComment._id
            ? { ...comment, message: updatedComment.comment }
            : comment
        )
      );

      const deleteComment = async (commentId: string) => {
        try {
          const res = await fetch(`http://localhost:3001/comments/${commentId}`, {
            method: 'DELETE',
          });

          if (!res.ok) {
            const errorMessage = await res.text();
            console.error("API Error:", errorMessage);
            throw new Error("Failed to delete comment");
          }

          // อัปเดต state หลังลบสำเร็จ
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id.toString() !== commentId) // ตรวจสอบด้วย string
          );
        } catch (error) {
          console.error("Error deleting comment:", error);
          alert("เกิดข้อผิดพลาดในการลบคอมเมนต์");
        }
      };


      setEditingCommentId(null); // ปิดโหมดแก้ไข
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("เกิดข้อผิดพลาดในการแก้ไขคอมเมนต์");
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const res = await fetch(`http://localhost:3001/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error("API Error:", errorMessage);
        throw new Error("Failed to delete comment");
      }

      // อัปเดต state หลังลบสำเร็จ
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("เกิดข้อผิดพลาดในการลบคอมเมนต์");
    }
  };

  // ดึงความคิดเห็น
  useEffect(() => {
    async function fetchComments(postId: string) {
      try {
        const res = await fetch(`http://localhost:3001/comments/content/${postId}`);
        if (!res.ok) throw new Error("Failed to fetch comments");

        const result = await res.json();
        const mappedComments = await Promise.all(
          result.map(async (comment: any) => {
            let userName = comment.userName || "Anonymous";  // ดึงจาก API ถ้ามี

            // ดึง userName จาก API users ถ้าไม่ถูกส่งมา
            if (!comment.userName && comment.userId) {
              const userRes = await fetch(`http://localhost:3001/users/${comment.userId}`);
              if (userRes.ok) {
                const user = await userRes.json();
                userName = user.userName || "Anonymous";
              }
            }

            return {
              id: comment._id,
              name: userName,  // ใช้ userName ที่ได้มา
              message: comment.comment,
              timestamp: new Date(comment.createdAt).toLocaleString(),
              replies: comment.replies || [],
            };
          })
        );

        setComments(mappedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    if (data) {
      fetchComments(data._id);
    }
  }, [data]);


  // ดึงข้อมูลโพสต์
  useEffect(() => {
    async function fetchData(postId: string) {
      try {
        const res = await fetch(`http://localhost:3001/contents/${postId}`);
        if (!res.ok) throw new Error("Failed to fetch post data");
        const result = await res.json();

        setData({
          _id: result._id,
          title: result.title,
          detail: result.detail,
          postImage: result.postImage || [],
          likeCount: result.likeCount || 0,
        });
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Failed to load post data");
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

  // เพิ่มความคิดเห็นใหม่
  const handleAddComment = async () => {
    if (!user?.userId) {
      console.error("User not logged in");
      alert("กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น");
      return;
    }

    if (newComment.trim() && data?._id) {
      try {
        const res = await fetch("http://localhost:3001/comments/addComment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.userId, // ใช้ userId จาก session
            userName: user.userName, // เพิ่ม userName
            postId: data._id,
            comment: newComment,
          }),
        });

        if (!res.ok) {
          const errorMessage = await res.text();
          console.error("Error:", errorMessage);
          throw new Error("Failed to add comment");
        }

        const addedComment = await res.json();
        setComments((prevComments) => [
          ...prevComments,
          {
            id: addedComment._id,
            name: user.userName || "Anonymous",
            message: newComment,
            timestamp: new Date().toLocaleString(),
            replies: [],
          },
        ]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
        alert("เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น");
      }
    }
  };

  async function toggleLike(postId: string) {
    const res = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to toggle like");
    return res.json();
  }

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


  const handleEditComment = async (commentId: number, newMessage: string) => {
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(`http://localhost:3001/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: newMessage }), // ใช้คีย์ "comment" ตามโครงสร้าง Backend
      });

      if (!res.ok) throw new Error("Failed to edit comment");

      // อัปเดตใน State เฉพาะคอมเมนต์ที่แก้ไขสำเร็จจาก Backend
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, message: newMessage } : comment
        )
      );

      setEditingCommentId(null); // ปิดโหมดแก้ไข
    } catch (error) {
      console.error("Error updating comment:", error);
    }
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
      {isLoggedIn ? <AfterLogin /> : <Navbar />}

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
              image={data.postImage}
              alt="ยังไม่มีรูปภาพ"
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
                {data.detail?.substring(0, 100) || "ไม่มีเนื้อหา"}...
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
                  {/* ส่วนที่แสดง userName ของผู้แสดงความคิดเห็น */}
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
                    deleteComment(comment.id.toString()); // แปลง id เป็น string ก่อนส่งไปยังฟังก์ชัน
                    handleMenuClose(); // ปิดเมนู
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
                    defaultValue={comment.message} // แสดงข้อความเดิม
                    onChange={(e) => setReplyMessage(e.target.value)} // บันทึกข้อความใหม่ใน state
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            color="primary"
                            onClick={() => editComment(comment.id, replyMessage.trim())} // เรียกใช้ฟังก์ชัน editComment
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
