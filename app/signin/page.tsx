"use client";

import React from "react";
import { Box, Button, TextField } from "@mui/material";

import { useForm } from "react-hook-form";
function signin() {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (formData: any) => {
    console.log("User email", formData);
    alert("Login success! ");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
          <div className="font-bold text-3xl">Sign in</div>
          <div className="w-96">
            <TextField
              id="Email"
              label="Email * "
              variant="outlined"
              fullWidth
              {...register("email")}
            />
          </div>
          <div className="w-full">
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
              {...register("password")}
            />
          </div>

          <div className="btn1">
            <Button
              variant="contained"
              className="w-full bg-green-500 text-white"
              type="submit"
            >
              Login
            </Button>
          </div>
          <a href="http://localhost:3000/signup" className="text-right underline">Don't have an account? Sign Up</a>
        </Box>
      </form>
    </div>
  );
}

export default signin;
