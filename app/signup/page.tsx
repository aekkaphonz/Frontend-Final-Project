"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import "./signup.css";
import React, { useEffect, useState } from "react";
import { useForm, Controller, FieldValue, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";

import Swal from "sweetalert2";

import axios from "axios";



export default function SignUp() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const router = useRouter();
  // useEffect(() => {
  //   if (isFormSubmitted) {
  //     router.push("/signin");
  //    }
  // }, [isFormSubmitted, router]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const handleReset = () => {
    reset({
      userName: "",
      email: "",
      password: "",
      confirmpassword: "",
      gender: "",
      dateOfBirth: null,
    });
  };

  const onSubmit = async (data: FieldValues) => {
    const gender =
      data.gender === 0
        ? "เลือก"
        : data.gender === 1
        ? "ชาย"
        : data.gender === 2
        ? "หญิง"
        : "อื่นๆ";
    const dateOfBirth = data.dateOfBirth
      ? dayjs(data.dateOfBirth).format("DD/MM/YYYY")
      : "ยังไม่กำหนด";

    try {
      const response = await axios.post("http://localhost:3001/user/register", {
        userName: data.userName,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmpassword,
        gender,
        dateOfBirth,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "สมัครสมาชิกสำเร็จ !",
          text: "คุณสมัครสมาชิกเรียบร้อยแล้ว!",
          icon: "success",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#77bfa3",
        });
        reset(); // รีเซ็ตฟอร์ม
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#d33",
      });
    }
  };

  // const [age, setAge] = React.useState("");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ maxWidth: 500, mx: "auto", mt: "2rem" }}>
        <CardContent>
          <Box
            className="border__R"
            display="flex"
            flexDirection="column"
            gap="2rem"
            padding="2rem"
          >
            <div
              className="font-bold text-3xl text-center flex items-center justify-center "
            >
              สมัครสมาชิก
            </div>

            {/* ข้อมูลผู้ใช้ */}
            {/* <Box
              sx={{
                backgroundColor: "#bfd8bd", // 
                padding: "16px",
                borderRadius: "8px", // ขอบมน
                height: "50px",
                width: "400px"
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#757575", 
                  marginBottom: "8px",
                }}
              >
                ข้อมูลผู้ใช้
              </Typography>
            </Box> */}

            {/* ชื่อ */}
            <div className="w-full">
              <TextField
                id="firstname"
                label={
                  <span>
                    ชื่อผู้ใช้ <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                fullWidth
                {...register("userName", {
                  required: "กรุณาระบุชื่อผู้ใช้",
                })}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">{`${errors.userName.message}`}</p>
              )}
            </div>

            {/* เมล */}
            <div className="w-full">
              <TextField
                id="email"
                label={
                  <span>
                    อีเมล <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "กรุณาระบุอีเมล",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "กรุณากรอกอีเมลที่ถูกต้อง",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>
              )}
            </div>

            {/* รหัสผ่าน */}
            <div className="w-full">
              <TextField
                type="password"
                id="password"
                label={
                  <span>
                    รหัสผ่าน <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                fullWidth
                {...register("password", {
                  required: "กรุณาระบุรหัสผ่าน",
                  minLength: {
                    value: 6,
                    message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัว",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{`${errors.password.message}`}</p>
              )}
            </div>

            {/* ยืนยันรหัสผ่าน */}
            <div className="w-full">
              <TextField
                type="confirmpassword"
                id="confirmpassword"
                label={
                  <span>
                      ยืนยันรหัสผ่าน <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                fullWidth
                {...register("confirmpassword", {
                  required: "กรุณายืนยันรหัสผ่าน",
                  minLength: {
                    value: 6,
                    message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัว",
                  },
                })}
              />
              {errors.confirmpassword && (
                <p className="text-red-500 text-sm">{`${errors.confirmpassword.message}`}</p>
              )}
            </div>

            {/* เพศ */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  rules={{ required: "กรุณาระบุเพศ" }}
                  render={({ field }) => (
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        เพศ
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        {...field}
                        label="เพศ"
                      >
                        <MenuItem value={0}>
                          <em>เลือก</em>
                        </MenuItem>
                        <MenuItem value={1}>ชาย</MenuItem>
                        <MenuItem value={2}>หญิง</MenuItem>
                        <MenuItem value={3}>อื่นๆ</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                {errors.gender && (
                  <p className="text-red-500 text-sm">{`${errors.gender.message}`}</p>
                )}
              </div>

              {/* วัน/เดือน/ปี */}
              <div className="flex-1">
                <Controller
                  name="dateOfBirth"
                  control={control}
                  defaultValue={null}
                  rules={{
                    required: "กรุณาระบุวันเดือนปีเกิด",
                    validate: (value) => {
                      if (!value) return "กรุณาระบุวันเดือนปีเกิด";
                      if (dayjs(value).isAfter(dayjs()))
                        return "กรุณาเลือกวันเดือนปีเกิดให้ถูกต้อง";
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        label="วัน/เดือน/ปี"
                        format="DD/MM/YYYY"
                        slotProps={{
                          textField: { fullWidth: true },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />

                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.dateOfBirth.message === "string"
                      ? errors.dateOfBirth.message
                      : "เกิดข้อผิดพลาด"}
                  </p>
                )}
              </div>
            </div>

            {/* <div> เผื่อใช้
              <Controller
                name="agreeToTerms"
                control={control}
                render={({ field }) => (
                  <div>
                    <Checkbox {...field} defaultChecked />
                    <label>
                      ข้าพเจ้ายอมรับข้อกำหนดและเงื่อนไขในการดำเนินการ
                    </label>
                  </div>
                )}
              />

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
                ยืนยัน
              </Button>

            </div> */}

            <div className="grid grid-cols-2 justify-between items-center">
              <div className="btn1 flex items-center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#77bfa3",
                    "&:hover": {
                      backgroundColor: "#98c9a3",
                    },
                    "&:focus": {
                      backgroundColor: "#bfd8bd",
                    },
                    "&.MuiButton-root": {
                      outline: "none",
                    },
                  }}
                  className="w-4/5 text-white p-2 text-lg"
                  type="submit"
                >
                  ยืนยัน
                </Button>
              </div>
              <div className="btn1 flex items-center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "	#FFCC33",
                    "&:hover": {
                      backgroundColor: "#FFCC66",
                    },
                    "&:focus": {
                      backgroundColor: "#FFCC66",
                    },
                    "&.MuiButton-root": {
                      outline: "none",
                    },
                  }}
                  className="w-4/5 text-white p-2 text-lg"
                  type="button"
                  onClick={handleReset}
                >
                  รีเซ็ต
                </Button>
              </div>

            </div>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
}
