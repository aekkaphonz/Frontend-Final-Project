"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography, Container, Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import Sb from "@/app/sidebarAuther/page";

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
  const router = useRouter(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rows, setRows] = useState<any[]>([]); 
  const [openModal, setOpenModal] = useState(false); 
  const [selectedPost, setSelectedPost] = useState<string | null>(null); 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts"); 
      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setRows([]); 
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post: any) => {
    const queryString = `/editBlog?id=${post._id}&title=${encodeURIComponent(post.title)}&content=${encodeURIComponent(post.content)}&images=${encodeURIComponent(JSON.stringify(post.images))}&tags=${encodeURIComponent(post.tags.join(", "))}`;
    
    router.push(queryString);
  };
  

  const handleDelete = async () => {
    if (selectedPost) {
      try {
        const response = await fetch(`http://localhost:3001/posts/${selectedPost}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("ลบบทความสำเร็จ!");
          setRows(rows.filter((row) => row._id !== selectedPost)); 
        } else {
          throw new Error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
    setOpenModal(false);
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
          <Typography sx={{ fontWeight: "bold", fontSize: 26, mb: 1 }}>เนื้อหาบทความ</Typography>
        </Grid>
        <Grid item md={12}>
          <Box sx={{ border: "1px solid #C0C0C0" }} />
        </Grid>

        <Grid item md={12}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button variant="text">
              <FilterAltOutlinedIcon />
              ตัวกรอง
            </Button>
          </Box>
        </Grid>

        <Grid item md={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>บทความ</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    วันที่
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    ยอดอ่าน
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    ความคิดเห็น
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    <EditOutlinedIcon />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    <DeleteOutlineOutlinedIcon />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <img
                            src={row.images[0] || "https://via.placeholder.com/50"} 
                            alt={row.title || "-"}
                            style={{ width: "50px", height: "50px", borderRadius: "8px" }}
                          />
                          {row.title || "-"}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{new Date(row.createdAt).toLocaleDateString() || "-"}</TableCell>
                      <TableCell align="right">{row.viewPost ?? "-"}</TableCell>
                      <TableCell align="right">{row.commentPost ?? "-"}</TableCell>
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
                            setSelectedPost(row._id); 
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
                    <TableCell colSpan={6} align="center">
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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            ยืนยันการลบ
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            คุณต้องการลบบทความนี้หรือไม่?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" color="primary" onClick={() => setOpenModal(false)}>
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
