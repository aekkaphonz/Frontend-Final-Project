"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Avatar,
  Button
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/page";
import AfterLogin from "@/app/navbar/AfterLogin";
import { useAuth } from "@/app/context/AuthProvider";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Divider from '@mui/material/Divider';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Swal from "sweetalert2";
interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface Attraction {
  _id: string;
  userName: string;
  title: string;
  detail: string;
  tags: string[];
  postImage: string;
  likeCount: number;
  likedUsers: string[];

}

interface Comment {
  id: number;
  _id?: string;
  message: string;
  name: string;
  userId?: string;
  timestamp: string;
  replies?: Reply[];
  image?: string;
}

interface Reply {
  id: number;
  _id?: string;
  message: string;
  name: string;
  timestamp: string;
  userId?: string;
  image?: string;
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
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(
    null
  );
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuCommentId, setMenuCommentId] = useState<number | null>(null);
  const [menuReplyId, setMenuReplyId] = useState<{
    commentId: number;
    replyId: number;
  } | null>(null);
  const [anchorReplyEl, setAnchorReplyEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [anchorCommentEl, setAnchorCommentEl] = useState<null | HTMLElement>(null);
  const [editMessage, setEditMessage] = useState<string>("");
  const router = useRouter();
  const params = useParams();
  const [liked, setLiked] = useState(false);
  const [updatedLikes, setUpdatedLikes] = useState(0);
  const userId = user?.userId;
  const [editingReplyId, setEditingReplyId] = useState<{ commentId: number; replyId: number | null } | null>(null);
  const [editReplyMessage, setEditReplyMessage] = useState<string>("");

  const id = params?.id as string;
  if (!id) {
    Swal.fire({
      title: "ผิดพลาด!",
      text: "ไม่พบข้อมูลโพสต์",
      icon: "error",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#d33",
    });
    return;
  }



  // ฟังก์ชันยืนยันการลบคอมเมนต์หรือการตอบกลับ
  const handleDeleteReplyMenu = (commentId: number, replyId: number) => {
    Swal.fire({
      title: 'ยืนยันการลบ',
      text: 'คุณแน่ใจหรือไม่ที่จะลบความคิดเห็นนี้?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, ลบเลย',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        // ถ้าผู้ใช้เลือก "ใช่, ลบเลย" ให้ลบการตอบกลับ
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? {
                ...comment,
                replies: comment.replies.filter((reply) => reply.id !== replyId), // ลบการตอบกลับที่มี replyId ตรงกัน
              }
              : comment
          )
        );

        // แสดงข้อความแจ้งเตือนว่า "ลบสำเร็จ"
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'ลบความคิดเห็นเรียบร้อย',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#3085d6',
        });
      } else {
        // ถ้าผู้ใช้เลือก "ยกเลิก"
        Swal.fire({
          title: 'ยกเลิก',
          text: 'คุณยกเลิกการลบความคิดเห็นนี้',
          icon: 'info',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  const handleEditReply = async () => {
    if (!user?.userId) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "กรุณาเข้าสู่ระบบก่อนแก้ไขการตอบกลับ",
        icon: "warning",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (!editReplyMessage.trim()) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "ข้อความไม่สามารถเว้นว่างได้",
        icon: "warning",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/replies/${editingReplyId?.replyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          message: editReplyMessage.trim(),
          userId: user.userId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "ไม่สามารถแก้ไขการตอบกลับได้");
      }

      // 🎯 **อัปเดต State `comments` โดยไม่ต้องโหลดใหม่**
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === editingReplyId?.commentId
            ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === editingReplyId?.replyId ? { ...reply, message: editReplyMessage } : reply
              ),
            }
            : comment
        )
      );

      // 🎯 **รีเซ็ตค่าหลังจากแก้ไขเสร็จ**
      setEditingReplyId(null);
      setEditReplyMessage("");

      Swal.fire({
        title: "สำเร็จ!",
        text: "แก้ไขการตอบกลับเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      Swal.fire({
        title: "ผิดพลาด!",
        text: error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการแก้ไขการตอบกลับ",
        icon: "error",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#d33",
      });
    }
  };


  // เริ่มจากการเพิ่ม state สำหรับการแก้ไขข้อความ
  const handleEditComment = async () => {
    if (!user?.userId) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "กรุณาเข้าสู่ระบบก่อนแก้ไขความคิดเห็น",
        icon: "warning",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (!editMessage.trim()) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "ข้อความไม่สามารถเว้นว่างได้",
        icon: "warning",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/comments/${editingCommentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message: editMessage.trim(),
          postId: id,
          userId: user.userId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "ไม่สามารถแก้ไขความคิดเห็นได้");
      }

      // 🎯 **อัปเดต State `comments` โดยไม่ต้องโหลดใหม่**
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === editingCommentId ? { ...comment, message: editMessage } : comment
        )
      );

      // 🎯 **รีเซ็ตค่าหลังจากแก้ไขเสร็จ**
      setEditingCommentId(null);
      setEditMessage("");

      Swal.fire({
        title: "สำเร็จ!",
        text: "แก้ไขความคิดเห็นเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      Swal.fire({
        title: "ผิดพลาด!",
        text: error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการแก้ไขความคิดเห็น",
        icon: "error",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#d33",
      });
    }
  };



  const handleAddReply = async (commentId: number) => {
    if (!user?.userId) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น",
        icon: "warning",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (!replyMessage.trim()) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "ข้อความไม่สามารถเว้นว่างได้",
        icon: "warning",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/reply/addReply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          commentId: commentId,
          commentReply: replyMessage.trim(),
          userId: user.userId,
          userName: user.userName,
          highlightId: id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to add reply: ${errorData}`);
      }

      // เพิ่มการตอบกลับใหม่ใน state
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId
            ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: new Date().getTime(), // สร้าง ID ใหม่สำหรับการตอบกลับ
                  name: user.userName,
                  message: replyMessage.trim(),
                  timestamp: new Date().toLocaleString(),
                  userId: user.userId,
                  image: user.profileImage || ''
                }
              ]
            }
            : comment
        )
      );

      // เคลียร์ข้อความตอบกลับ
      setReplyMessage("");
      setReplyingToCommentId(null);

      // อัปเดตข้อมูลใหม่ใน localStorage
      localStorage.setItem("comments", JSON.stringify(comments)); // อัปเดตข้อมูลใน localStorage

      // แสดงข้อความสำเร็จ
      await Swal.fire({
        title: "สำเร็จ!",
        text: "เพิ่มการตอบกลับเรียบร้อย",
        icon: "success",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });

    } catch (error) {
      console.error("Error adding reply:", error);
      Swal.fire({
        title: "ผิดพลาด!",
        text: error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการเพิ่มการตอบกลับ",
        icon: "error",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    commentId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuCommentId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuCommentId(null);
  };

  const handleMenuCloseComment = () => {
    setAnchorCommentEl(null);
    setSelectedCommentId(null);
  };

  const handleUpdateComment = async (commentId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/comments/edit/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          comment: editMessage.trim(),
          highlightId: id
        }),
      });

      if (!response.ok) throw new Error('Failed to update comment');

      // ดึงข้อมูลคอมเมนต์ใหม่
      const commentsRes = await fetch(`http://localhost:3001/comments/content/${id}`, {
        credentials: 'include'
      });

      if (!commentsRes.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลความคิดเห็นใหม่ได้");
      }

      const updatedComments = await commentsRes.json();
      const formattedComments = updatedComments.map((comment: any) => ({
        id: comment._id,
        _id: comment._id,
        name: comment.userName || 'Anonymous',
        message: comment.comment,
        userId: comment.userId || '',
        timestamp: new Date(comment.createdAt).toLocaleString(),
        image: comment.userImage || '',
        replies: Array.isArray(comment.replies) && comment.replies.length > 0
          ? comment.replies.map((reply: any) => ({
            id: reply._id,
            name: reply.userName || 'Anonymous',
            message: reply.commentReply,
            timestamp: new Date(reply.createdAt).toLocaleString(),
            userId: reply.userId || '',
            image: reply.userImage || ''
          }))
          : []
      }));

      setComments(formattedComments);
      setEditingCommentId(null);
      setEditMessage('');

      await Swal.fire({
        title: "สำเร็จ!",
        text: "แก้ไขความคิดเห็นเรียบร้อย",
        icon: "success",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error('Error updating comment:', error);
      Swal.fire({
        title: "ผิดพลาด!",
        text: error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการแก้ไขความคิดเห็น",
        icon: "error",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleDeleteCommentMenu = async () => {
    try {
      if (!selectedCommentId) return;

      // ขอการยืนยันจากผู้ใช้ก่อนการลบ
      const willDelete = await Swal.fire({
        title: "ยืนยันการลบ",
        text: "คุณแน่ใจหรือไม่ที่จะลบความคิดเห็นนี้?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่, ลบเลย",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      // หากผู้ใช้ยืนยันการลบ
      if (willDelete.isConfirmed) {
        const res = await fetch(`http://localhost:3001/comments/${selectedCommentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include', // ตรวจสอบการตั้งค่า credentials เช่น cookie หรือ token
          body: JSON.stringify({
            postId: id, // ID ของโพสต์ที่เกี่ยวข้อง
            userId: user?.userId // userId ที่กำลังทำการลบ
          }),
        });

        if (!res.ok) {
          const errorText = await res.text(); // อ่านข้อความแสดงข้อผิดพลาดจากเซิร์ฟเวอร์
          console.error("❌ API Error:", errorText);
          // แสดงข้อความข้อผิดพลาดจากเซิร์ฟเวอร์
          Swal.fire({
            title: "ผิดพลาด!",
            text: errorText || "ไม่สามารถลบคอมเมนต์ได้",
            icon: "error",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#d33",
          });
          return;
        }

        // หากการลบสำเร็จ จะทำการอัปเดตคอมเมนต์
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== selectedCommentId)
        );

        await Swal.fire({
          title: "สำเร็จ!",
          text: "ลบความคิดเห็นเรียบร้อย",
          icon: "success",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#3085d6",
        });

        // รีเฟรชข้อมูลคอมเมนต์ใหม่
        await fetchData();
        router.refresh();
      }
    } catch (error) {
      console.error("❌ Error deleting comment:", error);
      Swal.fire({
        title: "ผิดพลาด!",
        text: error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการลบความคิดเห็น",
        icon: "error",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditMessage('');
  };

  const renderTags = (tags: string[]) => {
    return tags.map((tag, index) => (
      <Box
        key={index}
        sx={{
          border: "1px solid #b3b6b7 ",
          marginBottom: 1,
          padding: "5px 10px",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          fontSize: "14px",
          color: "#333",
        }}
      >
        <Typography variant="body2">
          <SellOutlinedIcon
            sx={{ color: "#77bfa3", mr: "0.5px" }}
            fontSize="small"
          />
          {tag}
        </Typography>
      </Box>
    ));
  };

  const handleLike = async () => {
    if (!user?.userId) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "กรุณาเข้าสู่ระบบเพื่อทำการไลค์",
        icon: "warning",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/signin");
        }
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/contents/${data?._id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ userId: user.userId }),
      });

      if (!res.ok) throw new Error("Failed to update like status");

      const updatedPost = await res.json();
      setLiked(updatedPost.likedUsers.includes(user.userId)); // อัปเดตสถานะไลค์
      setUpdatedLikes(updatedPost.likeCount); // อัปเดตจำนวนไลค์
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const formatCommentText = (text: string | undefined) => {
    if (!text) return '';

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#77bfa3", textDecoration: "underline" }}
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/contents/${id}`, {
        credentials: 'include'
      });
      const postData = await res.json();
      setData(postData);

      // Fetch comments with their replies
      const commentsRes = await fetch(`http://localhost:3001/comments/content/${id}`, {
        credentials: 'include'
      });

      if (!commentsRes.ok) {
        console.error("Failed to fetch comments:", {
          status: commentsRes.status,
          statusText: commentsRes.statusText
        });
        return;
      }

      const commentsData = await commentsRes.json();
      console.log("Raw comments data:", commentsData);

      if (!Array.isArray(commentsData)) {
        console.error("Comments data is not an array:", commentsData);
        return;
      }

      // แปลงข้อมูล comments และ replies
      const transformedComments = commentsData.map((comment: any) => {
        // ดึง replies จากข้อมูล comment ที่มีอยู่แล้ว
        const repliesData = comment.replies || [];
        console.log(`Replies for comment ${comment._id}:`, repliesData);

        return {
          id: comment._id,
          _id: comment._id,
          name: comment.userName || 'Anonymous',
          message: comment.comment,
          userId: comment.userId,
          timestamp: new Date(comment.createdAt).toLocaleString(),
          image: comment.userImage || '',
          replies: Array.isArray(repliesData) && repliesData.length > 0
            ? repliesData.map((reply: any) => ({
              id: reply._id,
              _id: reply._id,
              name: reply.userName || 'Anonymous',
              message: reply.commentReply,
              timestamp: new Date(reply.createdAt).toLocaleString(),
              userId: reply.userId,
              image: reply.userImage || ''
            }))
            : []
        };
      });

      console.log("Comments with replies:", transformedComments);
      setComments(transformedComments);

      if (postData && user?.userId) {
        setLiked(postData.likedUsers?.includes(user.userId));
        setUpdatedLikes(postData.likeCount || 0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/comments/content/${id}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลความคิดเห็นได้");
        }

        const data = await response.json();
        console.log("Fetched comments data:", data); // Debug log

        // แปลงข้อมูลให้ตรงกับ interface
        const formattedComments = data.map((comment: any) => {
          console.log("Processing comment:", comment); // Debug log
          return {
            id: comment._id,
            _id: comment._id,
            name: comment.userName || 'Anonymous',
            message: comment.comment,
            userId: comment.userId || '',
            timestamp: new Date(comment.createdAt).toLocaleString(),
            image: comment.userImage || '',
            replies: Array.isArray(comment.replies) && comment.replies.length > 0
              ? comment.replies.map((reply: any) => {
                console.log("Processing reply:", reply); // Debug log
                return {
                  id: reply._id,
                  name: reply.userName || 'Anonymous',
                  message: reply.commentReply,
                  timestamp: new Date(reply.createdAt).toLocaleString(),
                  userId: reply.userId || '',
                  image: reply.userImage || ''
                };
              })
              : []
          };
        });

        console.log("Formatted comments:", formattedComments); // Debug log
        setComments(formattedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError(error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    if (id) {
      fetchComments();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, user?.userId]);

  // ฟังก์ชันสำหรับเพิ่มความคิดเห็น
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.userId) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น",
        icon: "warning",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (!newComment.trim()) {
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "กรุณากรอกความคิดเห็น",
        icon: "warning",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (newComment.trim() && data?._id) {
      try {
        const res = await fetch("http://localhost:3001/comments/addComment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            userId: user.userId,
            userName: user.userName,
            postId: data._id,
            comment: newComment.trim(),
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
            _id: addedComment._id,
            name: user.userName || "Anonymous",
            message: newComment,
            userId: user.userId,
            timestamp: new Date().toLocaleString(),
            replies: []
          }
        ]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
        Swal.fire({
          title: "ผิดพลาด!",
          text: "เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น",
          icon: "error",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#d33",
        });
      }
    }
  };



  // เมื่อ Component โหลด ให้ดึงข้อมูลคอมเมนต์จาก localStorage
  useEffect(() => {
    // เมื่อ `comments` เปลี่ยนแปลง, จะบันทึกข้อมูลทั้งหมดใน `localStorage`
    if (comments.length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments)); // เก็บข้อมูลคอมเมนต์ทั้งหมด
    }
  }, [comments]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments") || "[]");
    if (savedComments.length > 0) {
      setComments(savedComments); // โหลดข้อมูลคอมเมนต์จาก localStorage
    } else {
      fetchData(); // หากไม่มีข้อมูลใน localStorage ให้ดึงข้อมูลจาก API
    }
  }, []);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box key="page-container" sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {isLoggedIn ? (
        <AfterLogin
          key="after-login"
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          handleSearch={handleSearch}
        />
      ) : (
        <Navbar
          key="navbar"
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          handleSearch={handleSearch}
        />
      )}

      <Container
        key="content-container"
        maxWidth="md"
        sx={{ mt: 4, flexGrow: 1, paddingTop: "80px" }}
      >
        {loading ? (
          <Typography
            key="loading-text"
            variant="h5"
            sx={{
              mt: 4,
              color: "var(--comment-text)",
            }}
          >
            กำลังโหลด...
          </Typography>
        ) : error ? (
          <Typography
            key="error-text"
            variant="h5"
            sx={{
              mt: 4,
              color: "var(--comment-text)",
            }}
          >
            {error}
          </Typography>
        ) : !data ? (
          <Typography
            key="no-data-text"
            variant="h5"
            sx={{
              mt: 4,
              color: "var(--comment-text)",
            }}
          >
            ไม่พบข้อมูล
          </Typography>
        ) : (
          <Card
            key="post-card"
            sx={{
              borderRadius: 3,
              boxShadow: 4,
              overflow: "hidden",
              backgroundColor: "var(--post-bg)",
              color: "var(--post-text)",
              mb: 4
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                key="post-title"
                gutterBottom
                variant="h4"
                component="div"
                sx={{ color: "#77bfa3", fontWeight: "bold", mb: 2 }}
              >
                {data.title}
              </Typography>
              <Box display="flex" gap={1} sx={{ mb: 3 }}>
                {renderTags(data.tags)}
              </Box>
              <CardMedia
                key="post-image"
                component="img"
                sx={{
                  height: "auto",
                  maxHeight: "600px",
                  width: "100%",
                  objectFit: "contain",
                  mb: 3,
                  borderRadius: 2
                }}
                image={data.postImage}
                alt="ยังไม่ไม่มีรูภาพ"
              />
              <Typography
                key="post-detail"
                variant="body1"
                sx={{
                  color: "var(--post-text)",
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.8
                }}
              >
                {data.detail || "ไม่มีเนื้อหา"}
              </Typography>
            </CardContent>
            <Box
              key="post-actions"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 2,
                backgroundColor: "var(--comment-bg)",
                color: "var(--comment-text)",
              }}
            >
              <Box
                key="post-actions-left"
                sx={{
                  display: "flex",
                }}
              >
                <Tooltip title="แชร์">
                  <IconButton sx={{ color: "var(--comment-text)" }}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="เพิ่มในรายการโปรด">
                  <IconButton sx={{ color: "#6a6a6" }}>
                    {/* <GradeIcon/> */}
                    <GradeOutlinedIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Tooltip>
                <Divider orientation="vertical" flexItem sx={{ borderColor: '#3b4c77', height: 40, ml: 1 }} />
                <Typography
                  key="post-author"
                  sx={{ ml: 1, fontWeight: "bold", color: "var(--nav-text)" }}
                >
                  {data.userName}
                </Typography>
              </Box>

              <Box key="post-actions-right" sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  key="post-like-button"
                  onClick={handleLike}
                  sx={{ color: liked ? "#ff3030" : "var(--comment-text)" }}
                >
                  {liked ? (
                    <FavoriteOutlinedIcon sx={{ color: "#ff3030" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "var(--comment-text)" }} />
                  )}
                </IconButton>
                <Typography
                  key="post-like-count"
                  variant="body2"
                  sx={{ ml: 1 }}
                >
                  {updatedLikes} ถูกใจ
                </Typography>
              </Box>
            </Box>
          </Card>


        )}
        {/* Comments section header */}
        <Box
          key="comments-section"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4,
            mt: 2,
            px: 2
          }}
        >

          <Box key="left-border" sx={{ borderBottom: "1px solid var(--comment-text)", flexGrow: 1, opacity: 0.3 }} />
          <Typography
            key="comment-count"
            variant="body1"
            sx={{
              color: "var(--comment-text)",
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 500
            }}
          >
            <ForumOutlinedIcon sx={{ fontSize: 20 }} />
            {comments.length +
              comments.reduce(
                (acc, comment) => acc + (Array.isArray(comment.replies) ? comment.replies.length : 0),
                0
              )}{" "}
            ความคิดเห็น
          </Typography>
          <Box key="right-border" sx={{ borderBottom: "1px solid var(--comment-text)", flexGrow: 1, opacity: 0.3 }} />
        </Box>

        {/* Add a Comment Section */}
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            borderRadius: 2,
            backgroundColor: 'grey.100',
          }}
        >
          <Typography variant="h6">เพิ่มความคิดเห็น</Typography>
          <TextField
            fullWidth
            size="small"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="พิมพ์ความคิดเห็นของคุณ..."
            multiline
            maxRows={4}
            sx={{
              marginTop: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'white',
              },
            }}
          />
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            ส่งความคิดเห็น
          </Button>
        </Box>

        {/* รายการคอมเมนต์ */}
        {comments.map((comment) => (
          <Box key={comment.id || comment._id} sx={{ mb: 3 }}>

            {/* คอมเมนต์หลัก */}
            <Box key={`comment-main-${comment.id}`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
              <Avatar key={`comment-avatar-${comment.id}`} src={comment.image || ''} alt={comment.name} sx={{ width: 40, height: 40 }} />
              <Box key={`comment-content-${comment.id}`} sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography key={`comment-name-${comment.id}`} variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {comment.name}
                  </Typography>
                  <IconButton
                    key={`comment-menu-${comment.id}`}
                    size="small"
                    onClick={(e) => {
                      setAnchorCommentEl(e.currentTarget);
                      setSelectedCommentId(comment.id);
                    }}
                    sx={{ p: 0.5, ml: 1 }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>

                {editingCommentId === comment.id ? (
                  <TextField
                    fullWidth
                    multiline
                    size="small"
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    sx={{ my: 1 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box>
                            <Button
                              size="small"
                              onClick={() => handleEditComment(comment.id, editMessage)}
                              disabled={!editMessage.trim()}
                              sx={{ minWidth: 'auto', p: 0.5 }}
                            >
                              บันทึก
                            </Button>
                            <Button
                              size="small"
                              onClick={() => setEditingCommentId(null)}
                              sx={{ minWidth: 'auto', p: 0.5 }}
                            >
                              ยกเลิก
                            </Button>
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <Typography variant="body2" sx={{ mt: 1, mb: 2, whiteSpace: 'pre-wrap' }}>
                    {formatCommentText(comment.message)}
                  </Typography>
                )}

                {/* การกระทำกับคอมเมนต์ */}
                <Box key={`comment-actions-${comment.id}`} sx={{ mt: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Typography key={`comment-timestamp-${comment.id}`} variant="caption" color="text.secondary">
                    {comment.timestamp}
                  </Typography>
                  <Button
                    key={`comment-reply-${comment.id}`}
                    size="small"
                    onClick={() => setReplyingToCommentId(replyingToCommentId === comment.id ? null : comment.id)}  // เมื่อคลิกปุ่ม "ตอบกลับ" ให้ตั้งค่า replyingToCommentId
                    sx={{ minWidth: 'auto', p: 0.5 }}
                  >
                    ตอบกลับ
                  </Button>
                  {comment.userId === user?.userId && (
                    <>

                    </>
                  )}
                </Box>
              </Box>
            </Box>

            {/* เมนูการกระทำของคอมเมนต์ */}
            <Menu
              anchorEl={anchorCommentEl}
              open={Boolean(anchorCommentEl) && selectedCommentId === comment.id}
              onClose={() => {
                setAnchorCommentEl(null);
                setSelectedCommentId(null);
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                onClick={() => {
                  setEditingCommentId(comment.id);
                  setEditMessage(comment.message);
                  setAnchorCommentEl(null);
                }}
              >
                แก้ไข
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDeleteCommentMenu();
                  setAnchorCommentEl(null);
                }}
              >
                ลบ
              </MenuItem>
            </Menu>

            {/* ส่วนของการตอบกลับ */}
            {comment.replies && comment.replies.length > 0 && (
              <Box key={`replies-${comment.id}`} sx={{ ml: 6 }}>
                {comment.replies.map((reply) => (
                  <Box key={reply.id || reply._id} sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
                    <Avatar key={`reply-avatar-${reply.id}`} src={reply.image || ''} alt={reply.name} sx={{ width: 32, height: 32 }} />
                    <Box key={`reply-content-${reply.id}`} sx={{ flexGrow: 1 }}>
                      <Box key={`reply-message-${reply.id}`} sx={{ bgcolor: 'grey.100', borderRadius: 2, p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography key={`reply-name-${reply.id}`} variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            {reply.name}
                          </Typography>
                          <IconButton
                            key={`reply-menu-${reply.id}`}
                            size="small"
                            onClick={(e) => {
                              setAnchorReplyEl(e.currentTarget);
                              setMenuReplyId({ commentId: comment.id, replyId: reply.id });
                            }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography key={`reply-text-${reply.id}`} variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                          {reply.message}
                        </Typography>
                      </Box>
                      <Menu
                        anchorEl={anchorReplyEl}
                        open={Boolean(anchorReplyEl) && menuReplyId?.replyId === reply.id}
                        onClose={() => setAnchorReplyEl(null)}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            setEditingReplyId({ commentId: comment.id, replyId: reply.id });
                            setEditReplyMessage(reply.message);
                            setAnchorReplyEl(null);
                          }}
                        >
                          แก้ไข
                        </MenuItem>

                        <MenuItem
                          onClick={() => {
                            handleDeleteReplyMenu(comment.id, reply.id);
                            setAnchorReplyEl(null);
                          }}
                        >
                          ลบ
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}

            {/* การแสดงช่องกรอกข้อความสำหรับการตอบกลับ */}
            {replyingToCommentId === comment.id && (  // ตรวจสอบว่า comment นี้เป็นคอมเมนต์ที่เราต้องการตอบกลับหรือไม่
              <Box key={`reply-input-${comment.id}`} sx={{ ml: 6, mt: 1 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar
                    key={`reply-avatar-${comment.id}`}
                    src={user?.profileImage || ''}
                    alt={user?.userName || ''}
                    sx={{ width: 32, height: 32 }}
                  />
                  <TextField
                    key={`reply-input-${comment.id}`}
                    fullWidth
                    size="small"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}  // เก็บข้อความตอบกลับ
                    placeholder="พิมพ์ข้อความตอบกลับ..."
                    multiline
                    maxRows={4}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: 'grey.100',
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAddReply(comment.id);  // ส่งการตอบกลับเมื่อกด Enter
                      }
                    }}
                  />
                  <IconButton
                    key={`reply-send-${comment.id}`}
                    onClick={() => handleAddReply(comment.id)}  // เมื่อคลิกส่งให้เพิ่มการตอบกลับ
                    disabled={!replyMessage.trim()}  // ปิดปุ่มถ้ายังไม่ได้พิมพ์ข้อความ
                    color="primary"
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Box>
        ))}

      </Container>
    </Box>
  );
}