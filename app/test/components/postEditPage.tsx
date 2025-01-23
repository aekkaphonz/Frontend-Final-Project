"use client";
import {
  Box,
  Button,
  CardContent,
  Grid,
  Paper,
  Avatar,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

type Content = {
  _id: string;
  title: string;
  detail: string;
  description: string;
  postImage?: string;
};

type User = {
  _id: string;
  email: string;
  userName: string;
  gender: string;
  dateOfBirth: string;
  profileImage: string;
  content: Content[];
};

const PostEditPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get<User[]>(
        "http://localhost:3001/user/profile",
        {
          withCredentials: true,
        }
      );
      if (response.data && response.data.length > 0) {
        setUser(response.data[0]);
      } else {
        setError("No user data found");
      }
    } catch (err) {
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    contentId: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("postImage", file);

    try {
      await axios.put(
        `http://localhost:3001/contents/updateContent/${contentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      alert("Image updated successfully");
      fetchUserData();
    } catch (err) {
      alert("Failed to update image");
    }
  };

  const handleSave = async (contentId: string, updatedContent: Content) => {
    try {
      await axios.put(
        `http://localhost:3001/contents/updateContent/${contentId}`,
        updatedContent,
        { withCredentials: true }
      );
      alert("Content updated successfully");
      fetchUserData();
    } catch (err) {
      alert("Failed to update content");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>No user data available</p>;
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: "2rem", p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "16px" }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
            {user.profileImage && (
              <img
                src={user.profileImage}
                alt="Profile Image"
                className="w-24 h-24 rounded-full object-cover"
              />
            )}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
              {user.userName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "medium", mb: 3 }}
        >
          Posts
        </Typography>

        <Grid container spacing={3}>
          {user.content.length > 0 ? (
            user.content.map((item) => (
              <Grid item xs={12} key={item._id}>
                <Paper sx={{ p: 3, borderRadius: "12px" }}>
                  <Box>
                    {item.postImage && (
                      <Box
                        component="img"
                        src={item.postImage}
                        alt={item.title}
                        sx={{
                          width: "100%",
                          height: 400,
                          objectFit: "cover",
                          borderRadius: "8px",
                          mb: 2,
                        }}
                      />
                    )}
                    <Button
                      variant="outlined"
                      component="label"
                      color="primary"
                      sx={{ mb: 2 }}
                    >
                      Upload New Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, item._id)}
                      />
                    </Button>
                  </Box>
                  <TextField
                    fullWidth
                    label="Title"
                    defaultValue={item.title}
                    onChange={(e) =>
                      setUser((prev) =>
                        prev
                          ? {
                              ...prev,
                              content: prev.content.map((contentItem) =>
                                contentItem._id === item._id
                                  ? { ...contentItem, title: e.target.value }
                                  : contentItem
                              ),
                            }
                          : null
                      )
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Detail"
                    multiline
                    rows={3}
                    defaultValue={item.detail}
                    onChange={(e) =>
                      setUser((prev) =>
                        prev
                          ? {
                              ...prev,
                              content: prev.content.map((contentItem) =>
                                contentItem._id === item._id
                                  ? { ...contentItem, detail: e.target.value }
                                  : contentItem
                              ),
                            }
                          : null
                      )
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={2}
                    defaultValue={item.description}
                    onChange={(e) =>
                      setUser((prev) =>
                        prev
                          ? {
                              ...prev,
                              content: prev.content.map((contentItem) =>
                                contentItem._id === item._id
                                  ? {
                                      ...contentItem,
                                      description: e.target.value,
                                    }
                                  : contentItem
                              ),
                            }
                          : null
                      )
                    }
                    sx={{ mb: 2 }}
                  />
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleSave(item._id, {
                          ...item,
                          title:
                            user.content.find(
                              (contentItem) => contentItem._id === item._id
                            )?.title || "",
                          detail:
                            user.content.find(
                              (contentItem) => contentItem._id === item._id
                            )?.detail || "",
                          description:
                            user.content.find(
                              (contentItem) => contentItem._id === item._id
                            )?.description || "",
                        })
                      }
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => fetchUserData()}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No content available.
            </Typography>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default PostEditPage;
