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
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Swal from "sweetalert2";
import dayjs from "dayjs";

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
  const [errors, setErrors] = useState({
    gender: "",
    dateOfBirth: "",
  });
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
    let isValid = true;
    let tempErrors = { gender: "", dateOfBirth: "" };

    if (!user.gender) {
      tempErrors.gender = "กรุณาเลือกเพศ";
      isValid = false;
    }

    if (!user.dateOfBirth) {
      tempErrors.dateOfBirth = "กรุณาเลือกวันเกิด";
      isValid = false;
    } else if (dayjs(user.dateOfBirth).isAfter(dayjs())) {
      tempErrors.dateOfBirth = "วันเกิดห้ามเป็นวันในอนาคต";
      isValid = false;
    }

    setErrors(tempErrors);

    if (!isValid) return;
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

      if (response.status === 200) {
        Swal.fire({
          title: "อัปเดตข้อมูลสำเร็จ!",
          text: "ข้อมูลโปรไฟล์ของคุณได้รับการอัปเดตเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#77bfa3",
        }).then(() => {
          router.push("/profile");
        });
      }
    } catch (error) {
      console.error("Failed to update user data", error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถอัปเดตข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#d33",
      });
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
      <form>
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

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
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
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <FormControl
                  variant="standard"
                  fullWidth
                  error={Boolean(errors.gender)}
                >
                  <InputLabel id="gender-select-label">เพศ</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    value={user.gender || ""}
                    onChange={(e) =>
                      setUser({ ...user, gender: e.target.value })
                    }
                    label="เพศ"
                  >
                    <MenuItem value="">
                      <em>เลือก</em>
                    </MenuItem>
                    <MenuItem value="ชาย">ชาย</MenuItem>
                    <MenuItem value="หญิง">หญิง</MenuItem>
                    <MenuItem value="อื่นๆ">อื่นๆ</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography color="error" variant="caption">
                      {errors.gender}
                    </Typography>
                  )}
                </FormControl>

                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="th"
                >
                  <DatePicker
                    value={
                      user.dateOfBirth
                        ? dayjs(user.dateOfBirth, "YYYY-MM-DD")
                        : null
                    }
                    onChange={(newValue) =>
                      setUser({
                        ...user,
                        dateOfBirth: newValue
                          ? newValue.format("YYYY-MM-DD")
                          : "",
                      })
                    }
                    label="วัน/เดือน/ปี"
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: Boolean(errors.dateOfBirth),
                      },
                    }}
                  />
                </LocalizationProvider>
                {errors.dateOfBirth && (
                  <Typography color="error" variant="caption">
                    {errors.dateOfBirth}
                  </Typography>
                )}
              </Box>
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
