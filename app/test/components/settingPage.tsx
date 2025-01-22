"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import EditIcon from '@mui/icons-material/Edit'; 

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
  const [file, setFile] = useState<File | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:3001/user/profile", {
        withCredentials: true,
      });
      console.log('cats:', response.data);
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

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("profileImage", file as Blob);
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("gender", user.gender);
      formData.append("dateOfBirth", user.dateOfBirth);

      const response = await axios.put(
        `http://localhost:3001/user/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Updated user data:", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update user data", error);
      alert("Error updating profile");
    }
  };
 
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <form>
      <Card sx={{ maxWidth: 500, mx: "auto", mt: "10rem" }}>
        <CardContent>
          <Box
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
            <div className="flex justify-center items-center relative">
              {user.profileImage && (
                <img
                  src={user.profileImage}
                  alt="Profile Image"
                  className="w-24 h-24 rounded-full object-cover"
                />
              )}
              <label htmlFor="file-input" className="absolute right-0 bottom-0">
                <IconButton component="span">
                  <EditIcon />
                </IconButton>
              </label>
            </div>
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

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
                    endAdornment: <InputAdornment position="end"></InputAdornment>,
                  }}
                  disabled
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
                  onChange={(e) => setUser({ ...user, userName: e.target.value })}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"></InputAdornment>,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-1/5">
                <strong>เพศ :</strong>
              </div>
              <div className="w-4/5 flex-1">
                <TextField
                  value={user.gender}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"></InputAdornment>,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-1/5">
                <strong>วันเกิด :</strong>
              </div>
              <div className="w-4/5 flex-1">
                <TextField
                  value={user.dateOfBirth}
                  variant="outlined"
                  fullWidth
                  onChange={(e) =>
                    setUser({ ...user, dateOfBirth: e.target.value })
                  }
                  InputProps={{
                    endAdornment: <InputAdornment position="end"></InputAdornment>,
                  }}
                />
              </div>
            </div>

            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" color="primary" onClick={handleProfileUpdate}>
              บันทึกการเปลี่ยนแปลง
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};

export default EditPage;
