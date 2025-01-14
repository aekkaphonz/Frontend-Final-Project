"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ReplyIcon from "@mui/icons-material/Reply";
import Navbar from "@/app/navbar/page";

interface Board {
  id: number;
  name: string;
  description: string;
  comments: Comment[];
  coverImage?: string;
  viewCount: number;
  likeCount: number;
}

interface Comment {
  id: number;
  name: string;
  message: string;
  replies?: Comment[];
}

async function getAttractions() {
  const res = await fetch("https://melivecode.com/api/attractions/");
  if (!res.ok) {
    throw new Error("response was not ok");
  }
  return res.json();
}

const countCommentsAndReplies = (comments: Comment[]): number => {
  return comments.length + comments.reduce((sum, comment) => sum + (comment.replies?.length || 0), 0);
};

export default function BlogPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [activeComment, setActiveComment] = useState<string>("");
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const attractions = await getAttractions();
        const fetchedBoards: Board[] = attractions.map((attraction: any) => ({
          id: attraction.id,
          name: attraction.name,
          description: attraction.detail,
          comments: [],
          coverImage: attraction.coverimage,
          viewCount: 0, // เริ่มจาก 0
          likeCount: 0, // เริ่มจาก 0
        }));
        setBoards(fetchedBoards);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, []);

  const handleAddComment = () => {
    if (selectedBoard && activeComment.trim()) {
      const newComment: Comment = {
        id: selectedBoard.comments.length + 1,
        name: "Anonymous",
        message: activeComment,
        replies: [],
      };

      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === selectedBoard.id
            ? { ...board, comments: [...board.comments, newComment] }
            : board
        )
      );

      setSelectedBoard((prevBoard) =>
        prevBoard
          ? { ...prevBoard, comments: [...prevBoard.comments, newComment] }
          : null
      );

      setActiveComment("");
    }
  };

  const handleAddReply = (commentId: number) => {
    if (selectedBoard && replyMessage.trim()) {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === selectedBoard.id
            ? {
                ...board,
                comments: board.comments.map((comment) =>
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
                ),
              }
            : board
        )
      );

      setSelectedBoard((prevBoard) =>
        prevBoard
          ? {
              ...prevBoard,
              comments: prevBoard.comments.map((comment) =>
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
              ),
            }
          : null
      );

      setReplyMessage("");
      setReplyingToCommentId(null);
    }
  };

  const handleViewBoard = (board: Board) => {
    setBoards((prevBoards) =>
      prevBoards.map((b) =>
        b.id === board.id ? { ...b, viewCount: b.viewCount + 1 } : b
      )
    );
    setSelectedBoard(board);
  };

  const handleLike = () => {
    if (selectedBoard) {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === selectedBoard.id
            ? { ...board, likeCount: board.likeCount + 1 }
            : board
        )
      );

      setSelectedBoard((prevBoard) =>
        prevBoard
          ? { ...prevBoard, likeCount: prevBoard.likeCount + 1 }
          : null
      );
    }
  };

  return (
    <>
      <Container maxWidth="md">
        {!selectedBoard ? (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Attractions
            </Typography>
            <Grid container spacing={2}>
              {boards.map((board) => (
                <Grid item xs={12} md={4} key={board.id}>
                  <Card
                    onClick={() => handleViewBoard(board)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { boxShadow: 4 },
                    }}
                  >
                    {board.coverImage && (
                      <CardMedia
                        sx={{ height: 140 }}
                        image={board.coverImage}
                        title={board.name}
                      />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {board.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {board.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <VisibilityIcon
                            sx={{ fontSize: "1.2rem", mr: 1 }}
                          />
                          <Typography>{board.viewCount}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ChatBubbleOutlineIcon
                            sx={{ fontSize: "1.2rem", mr: 1 }}
                          />
                          <Typography>
                            {countCommentsAndReplies(board.comments)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ThumbUpIcon
                            sx={{ fontSize: "1.2rem", mr: 1 }}
                          />
                          <Typography>{board.likeCount}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={() => setSelectedBoard(null)}
              sx={{
                mt: 2,
                backgroundColor: "#77bfa3",
                color: "#fff",
                "&:hover": { backgroundColor: "#66a994" },
              }}
            >
              Back to Boards
            </Button>
            <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>
              {selectedBoard.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {selectedBoard.description}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleLike}
                sx={{
                  mr: 2,
                  borderColor: "#77bfa3",
                  color: "#77bfa3",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <ThumbUpIcon sx={{ mr: 1 }} />
                Like
              </Button>
              <Typography>{selectedBoard.likeCount} Likes</Typography>
            </Box>

            <Box
              sx={{
                p: 4,
                backgroundColor: "white",
                boxShadow: 2,
                borderRadius: 2,
              }}
            >
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Add a comment"
                value={activeComment}
                onChange={(e) => setActiveComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleAddComment}
                sx={{
                  backgroundColor: "#77bfa3",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#66a994" },
                }}
              >
                Add Comment
              </Button>

              <Box sx={{ mt: 4 }}>
                {selectedBoard.comments.map((comment) => (
                  <Box
                    key={comment.id}
                    sx={{
                      mt: 2,
                      p: 2,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                      boxShadow: 1,
                    }}
                  >
                    <Typography>
                      <strong>{comment.name}</strong>: {comment.message}
                    </Typography>
                    {comment.replies &&
                      comment.replies.map((reply) => (
                        <Box
                          key={reply.id}
                          sx={{
                            mt: 1,
                            pl: 2,
                            borderLeft: "2px solid #ccc",
                          }}
                        >
                          <Typography>
                            <strong>{reply.name}</strong>: {reply.message}
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
                          placeholder="Reply to comment"
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <Button
                          variant="contained"
                          onClick={() => handleAddReply(comment.id)}
                          sx={{
                            backgroundColor: "#77bfa3",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#66a994" },
                          }}
                        >
                          Add Reply
                        </Button>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
