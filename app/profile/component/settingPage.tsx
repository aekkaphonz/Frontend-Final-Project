"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
      router.push("/profile")
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
<div
  style={{
    background: "linear-gradient(135deg, #eceff1, #f5f5f5)",
    minHeight: "100vh",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  }}
>
    <form >
      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: "6rem",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
        }}
      >
        <CardContent
          sx={{
            padding: "2rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#66a692",
              marginBottom: "1rem",
            }}
          >
            แก้ไขข้อมูลส่วนตัว
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: "2rem",
            }}
          >
            {user.profileImage && (
              <img
                src={user.profileImage}
                alt="Profile"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #66a692",
                }}
              />
            )}
            <label htmlFor="file-input">
              <IconButton
                component="span"
                sx={{
                  marginTop: "1rem",
                  background: "#f0f0f0",
                  border: "1px solid #ccc",
                  "&:hover": {
                    background: "#e0e0e0",
                  },
                }}
              >
                <EditIcon sx={{ color: "#66a692" }} />
              </IconButton>
            </label>
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <TextField
              label="อีเมล"
              value={user.email}
              variant="outlined"
              fullWidth
              disabled
            />
            <TextField
              label="ชื่อผู้ใช้"
              value={user.userName}
              variant="outlined"
              fullWidth
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
            />
            <TextField
              label="เพศ"
              value={user.gender}
              variant="outlined"
              fullWidth
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            />
            <TextField
              label="วันเกิด"
              value={user.dateOfBirth}
              variant="outlined"
              fullWidth
              onChange={(e) =>
                setUser({ ...user, dateOfBirth: e.target.value })
              }
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                padding: "0.5rem 2rem",
                backgroundColor: "#77bfa3",
                "&:hover": {
                  backgroundColor: "#66a692",
                },
              }}
              onClick={handleProfileUpdate}
            >
              บันทึกการเปลี่ยนแปลง
            </Button>
          </Box>
        </CardContent>
      </Card>
    </form>
    </div>
  );
};

export default EditPage;
