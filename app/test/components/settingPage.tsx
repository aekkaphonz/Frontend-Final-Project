"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

type User = {
  _id: string;
  email: string;
  password: string;
  userName: string;
  gender: string;
  dateOfBirth: string;
  profileImage: string;
  content: any[];
};

const EditPage = () => {
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
      console.log("User data:", response.data);
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
    <form>
      <Card
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: "10rem",
        }}
      >
        <CardContent>
          <Box
            className="border__R"
            display="flex"
            flexDirection="column"
            gap="2rem"
            mt="2rem"
            padding="2rem"
            maxWidth="500px"
            mx="auto"
          >
            <div className="flex justify-center">
              <strong>User profile</strong>
            </div>
            {user.profileImage && (
              <div className="flex justify-center">
                <img
                  src={user.profileImage}
                  alt="Profile Image"
                  style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                />
              </div>
            )}
                <div className="flex items-center gap-1">
                <div className="w-1/5">
                    <strong>อีเมล :</strong>
                </div>
                <div className="w-4/5 flex-1">
                    <TextField
                    value={user.email}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end"></InputAdornment>
                        ),
                    }}
                    />
                </div>
                </div>
            <div className="flex items-center gap-1">
              <div className="w-1/5">
                <strong>ชื่อผู้ใช้ :</strong>
              </div>
              <div className="w-4/5 flex-1">
                <TextField
                  value={user.userName}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end"></InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
            </div>
            <div>
              <p>
                <strong>Date of Birth:</strong> {user.dateOfBirth}
              </p>
            </div>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};

export default EditPage;
