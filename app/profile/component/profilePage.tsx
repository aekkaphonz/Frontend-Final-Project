"use client";
import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  email: string;
  userName: string;
  gender: string;
  dateOfBirth: string;
  profileImage: string;
};

const ReadOnlyProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:3001/user/profile", {
        withCredentials: true,
      });
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
    <Box
      sx={{
        background: "linear-gradient(135deg, #eceff1, #f5f5f5)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: "700px",
          background: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            background: "url('https://via.placeholder.com/700x200') center/cover",
            height: "200px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "-50px",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "50%",
              overflow: "hidden",
              border: "5px solid #fff",
            }}
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100px",
                  height: "100px",
                  background: "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                ?
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            padding: "3rem 2rem 2rem",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {user.userName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "1rem" }}>
            {user.email}
          </Typography>
          <Divider sx={{ marginY: "1.5rem" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ width: "100%" }}>
              <strong>เพศ:</strong> {user.gender}
            </Typography>
            <Typography variant="body1" sx={{ width: "100%" }}>
              <strong>วันเกิด:</strong> {user.dateOfBirth}
            </Typography>
          </Box>
          <Button className="mt-8"
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              padding: "0.5rem 2rem",
              backgroundColor: "#77bfa3",
              "&:hover": {
                backgroundColor: "#66a692",
              },
            }}
            onClick={() => router.push("/profile/edit")}
          >
            แก้ไขข้อมูล
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReadOnlyProfilePage;
