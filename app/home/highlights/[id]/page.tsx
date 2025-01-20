  "use client";

  import React, { useEffect, useState } from "react";
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
  } from "@mui/material";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import ShareIcon from "@mui/icons-material/Share";
  import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
  import SendIcon from "@mui/icons-material/Send";
  import ReplyIcon from "@mui/icons-material/Reply";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
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
    const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(null);
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editingReplyId, setEditingReplyId] = useState<{commentId: number; replyId: number | null} | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuCommentId, setMenuCommentId] = useState<number | null>(null);
    const params: any = useParams();
    const router = useRouter();

    useEffect(() => {
      async function fetchData(id: string) {
        try {
          const res = await fetch(`https://melivecode.com/api/attractions/${id}`);
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

    const handleGoBack = () => {
      router.back();
    };

    return (
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
                    <IconButton sx={{ color: "#f50057" }}>
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
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
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body1">
                      <strong>{comment.name}:</strong> {comment.message}
                    </Typography>
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, comment.id)}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
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
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, reply.id)}
                            size="small"
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      <Menu
                        anchorEl={anchorEl}
                        open={menuCommentId === reply.id}
                        onClose={handleMenuClose}
                      >
                        <MenuItem
                          onClick={() =>
                            setEditingReplyId({ commentId: comment.id, replyId: reply.id })
                          }
                        >
                          แก้ไข
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleDeleteReply(comment.id, reply.id);
                            handleMenuClose();
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
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="ตอบกลับ..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      sx={{ mb: 2 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              color="primary"
                              onClick={() => handleAddReply(comment.id)}
                              edge="end"
                            >
                              <SendIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    );
  }
