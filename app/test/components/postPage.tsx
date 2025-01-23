"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
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


const UserContentDisplay = () => {
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
          Header 
        </Typography>

        <Grid container spacing={3}>
          {user.content.length > 0 ? (
            user.content.map((item) => (
              <Grid item xs={12} key={item._id}>
                <Card sx={{ borderRadius: "12px", overflow: "hidden" }}>
                  {item.postImage && (
                    <Box
                      component="img"
                      src={item.postImage}
                      alt={item.title}
                      sx={{
                        width: "100%",
                        height: 400,
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      gutterBottom
                    >
                      {item.detail}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
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

export default UserContentDisplay;
