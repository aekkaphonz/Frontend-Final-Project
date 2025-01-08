"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Navbar from "@/app/navbar/page";

interface Board {
  id: number;
  name: string;
  description: string;
  comments: Comment[];
  coverImage?: string;
}

interface Comment {
  id: number;
  name: string;
  message: string;
}

async function getAttractions() {
  const res = await fetch("https://melivecode.com/api/attractions/");
  if (!res.ok) {
    throw new Error("response was not ok");
  }
  return res.json();
}

export default function BlogPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [activeComment, setActiveComment] = useState<string>("");

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
      const newComment = {
        id: selectedBoard.comments.length + 1,
        name: "Anonymous",
        message: activeComment,
      };

      // อัปเดต state ของ boards และ selectedBoard
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
    } else {
      alert("Please enter a comment!");
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        {!selectedBoard ? (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Attractions
            </Typography>

            <Grid container spacing={2}>
              {boards.map((board) => (
                <Grid item xs={12} md={4} key={board.id}>
                  <Card>
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
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setSelectedBoard(board)}
                      >
                        View Comments ({board.comments.length})
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedBoard(null)}
              sx={{ mt: 2 }}
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
                p: 4,
                backgroundColor: "white",
                boxShadow: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Comments ({selectedBoard.comments.length})
              </Typography>
              {selectedBoard.comments.length === 0 ? (
                <Typography color="text.secondary">
                  No comments yet.
                </Typography>
              ) : (
                <Box sx={{ mb: 2 }}>
                  {selectedBoard.comments.map((comment) => (
                    <Box
                      key={comment.id}
                      sx={{
                        mb: 2,
                        p: 2,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <Typography>
                        <strong>{comment.name}:</strong> {comment.message}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
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
                color="primary"
                onClick={handleAddComment}
              >
                Add Comment
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
