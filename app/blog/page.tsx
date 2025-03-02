"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Container,
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem, Select, FormControl, InputLabel, SelectChangeEvent
} from "@mui/material";
import Swal from "sweetalert2";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

import Navbar from "@/app/navbar/page";
import { useAuth } from "@/app/context/AuthProvider";
import AutherAfterLogin from "@/app/navbar/AutherAfterLogin";

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
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchTag, setSearchTag] = useState("");

  const fetchComments = async (postId: string) => {
    try {
      const res = await fetch(`http://localhost:3001/comments/content/${postId}`);
      if (!res.ok) throw new Error("Failed to fetch comments");

      const result = await res.json();
      return result.length; // ส่งกลับจำนวนคอมเมนต์ทั้งหมด
    } catch (error) {
      console.error("Error fetching comments:", error);
      return 0;
    }
  };

  const fetchPosts = async () => {
    try {
      if (!user?.userId) {
        console.error("❌ userId not found in AuthContext");
        return;
      }

      const response = await fetch(`http://localhost:3001/contents?userId=${user.userId}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const postsWithCommentCount = await Promise.all(
          data.map(async (post: any) => {
            const commentCount = await fetchComments(post._id || post.id);
            return { ...post, commentCount };
          })
        );
        setRows(postsWithCommentCount);
      } else {
        console.error("❌ ไม่สามารถโหลดข้อมูลบทความ");
      }
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการโหลดบทความ:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPosts(); // เรียก fetchPosts เมื่อผู้ใช้ล็อกอิน
    }
  }, [isLoggedIn, user?.userId]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEdit = (post: any) => {
    localStorage.setItem("editPost", JSON.stringify(post));
    router.push(`/editBlog?id=${post._id}`);
  };

  const handleDelete = async () => {
    if (selectedPost) {
      try {
        const response = await fetch(`http://localhost:3001/contents/${selectedPost}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          setRows(rows.filter((row) => row._id !== selectedPost));
          setOpenModal(false);
  
          Swal.fire({
            title: "ลบสำเร็จ!",
            text: "บทความถูกลบเรียบร้อย",
            icon: "success",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#77bfa3",
          });
  
        } else {
          console.error("❌ ไม่สามารถลบบทความ");
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: "ไม่สามารถลบบทความได้",
            icon: "error",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#77bfa3",
          });
        }
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการลบบทความ:", error);
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "เกิดปัญหาขณะลบบทความ",
          icon: "error",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#77bfa3",
        });
      }
    }
  };  

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1400px",
        marginRight: 15,
      }}
    >
      {isLoggedIn ? (
        <AutherAfterLogin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <Grid
        container
        spacing={3}
        sx={{
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
        <Grid item md={8}>
          <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 1, color: "#98c9a3", }}>
            เนื้อหาทั้งหมด
          </Typography>
        </Grid>

        <Grid item md={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 , backgroundColor: "var(--comment-bg)" }} aria-label="simple table">
              <TableHead sx={{
                borderTop: "4px solid #dde7c7",
              }}>
                <TableRow
                  sx={{
                    "& th": { color: "var(--post-text)", fontWeight: "bold" },
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>บทความ</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    วันที่
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    การอ่าน
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    ความคิดเห็น
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">แท็ก</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    <BorderColorIcon />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <TableRow key={row._id || row.id}>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <img
                            src={row.postImage || "https://via.placeholder.com/50"}
                            alt={row.title || "-"}
                            style={{
                              width: "80px",
                              height: "80%",
                              borderRadius: "3px",
                            }}
                          />
                          {row.title || "-"}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {new Date(row.createdAt).toLocaleDateString() || "-"}
                      </TableCell>
                      <TableCell align="right">
                        {Array.isArray(row.views) ? row.views.length : row.viewCount ?? "-"}
                      </TableCell>
                      <TableCell align="right">
                        {row.comments?.length ?? "-"}
                      </TableCell>
                      <TableCell align="right">
                        {row.tags?.join(", ") || "ไม่มีแท็ก"} {/* แสดงแท็ก */}
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          sx={{ color: "#FFD500" }}
                          variant="text"
                          onClick={() => handleEdit(row)}
                        >
                          แก้ไข
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          sx={{ color: "red" }}
                          variant="text"
                          onClick={() => {
                            setSelectedPost(row._id || row.id);
                            setOpenModal(true);
                          }}
                        >
                          ลบ
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ color: "var(--comment-text)"}}>
                      ไม่มีข้อมูล
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Modal ยืนยันการลบ */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" sx={{ mb: 2 }}>
            ยืนยันการลบ
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            คุณต้องการลบบทความนี้หรือไม่?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              ยกเลิก
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              ลบ
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
