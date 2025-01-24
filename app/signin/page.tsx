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
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import { Controller } from "react-hook-form";

import GoogleIcon from "@mui/icons-material/Google";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";


function signin() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const router = useRouter();

  const { register, handleSubmit, control } = useForm();

  const handleGoogleLogin = async () => {
    try {
     
      window.location.href = "http://localhost:3001/auth/google";
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  

  const handleFormSubmit = async (formData: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      

      console.log("Response data:", response.data);
      console.log("Response status:", response.status);

      if (response.data) {
        // router.push("http://localhost:3000/test");
        router.push("/");
      } else {
        alert("การเข้าสู่ระบบล้มเหลว");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.error("Backend error:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "การเข้าสู่ระบบล้มเหลว"}`
        );
      } else {
        console.error("Error login:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card sx={{ maxWidth: 500, mx: "auto", mt: "2rem" }}>
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
            <div
              className="font-bold text-3xl text-center flex items-center justify-center "
            >
              เข้าสู่ระบบ
            </div>
            
            <div className="w-full">
              <TextField
                id="Email"
                label="อีเมล"
                variant="outlined"
                fullWidth
                {...register("email")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="w-full">
              <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                label="รหัสผ่าน"
                variant="outlined"
                fullWidth
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </div>

            <div className="grid grid-cols-2 justify-between items-center">
              <div className="flex items-center">
                <Controller
                  name="agreeToTerms"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Checkbox {...field} defaultChecked />
                      <label>บันทึกการเข้าใช้งาน</label>
                    </div>
                  )}
                />
              </div>
              <div className="text-right">
                <a 
                  href="http://localhost:3000/signup" 
                  className="text-red-500 underline" 
                >
                  ลืมรหัสผ่าน? 
                </a>
              </div>
            </div>

            <div className="btn1">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#77bfa3",
                  "&:hover": {
                    backgroundColor: "#77bfa3",
                  },
                  "&:focus": {
                    backgroundColor: "#77bfa3",
                  },
                  "&.MuiButton-root": {
                    outline: "none",
                  },
                }}
                className="w-full text-white p-2 text-lg"
                type="submit"
              >
                เข้าสู่ระบบ
              </Button>
            </div>
            
            <div className="flex justify-center items-center gap-2 ">
              <a className="text-right  ">ยังไม่เป็นสมาชิก?</a>
              <a href="http://localhost:3000/signup" className="text-blue-500">
                ลงทะเบียนสมัครสมาชิก
              </a>
            </div>
            <div className="flex justify-center items-center relative">
              <hr className="w-4/5 border-t-1 border-gray-400" />
              <span className="absolute bg-white px-2">หรือ</span>
            </div>
            <div className="flex justify-center items-center">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ffffff",
                  gap: "10px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                  },
                  "&:focus": {
                    backgroundColor: "#ffffff",
                  },
                  "&.MuiButton-root": {
                    outline: "none",
                  },
                }}
                className="w-4/6 text-[#77bfa3] p-2 text-sm "
                type="button"
                onClick={handleGoogleLogin}
              >
                <img
                  src="/images/google-logo.png"
                  alt="Cleaning Illustration"
                  style={{
                    maxWidth: "25px",
                    height: "auto",
                  }}
                />
                Login with Google
              </Button>
            </div>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
}

export default signin;
