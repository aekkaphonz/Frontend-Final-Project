"use client";

import { Box, Button, Checkbox, TextField } from "@mui/material";
import "./signup.css";
import React from "react";
import { useForm, Controller } from "react-hook-form";

export default function SignUp() {
  const { register, handleSubmit, control } = useForm();

  const handleFormSubmit = (formData: any) => {
    console.log("form data is", formData);
    alert("Sign up successful ");
  };

  return (
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
        <div className="font-bold text-3xl">Sign up</div>

        <div className="flex gap-4">
          <div className="flex-1">
            <TextField
              id="firstname"
              label="First Name *"
              variant="outlined"
              fullWidth
              {...register("firstName")}
            />
          </div>

          <div className="flex-1">
            <TextField
              id="lastname"
              label="Last Name *"
              variant="outlined"
              fullWidth
              {...register("lastName")}
            />
          </div>
        </div>

        <div className="w-full">
          <TextField
            id="email"
            label="Email"
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

        <div>
          <Controller
            name="agreeToTerms"
            control={control}
            render={({ field }) => (
              <div>
                <Checkbox {...field} defaultChecked />
                <label>
                  I agree to receive emails related to product updates.
                </label>
              </div>
            )}
          />
        </div>

        <div className="btn1">
          <Button
            variant="contained"
            className="w-full bg-green-500 text-white"
            type="submit"
          >
            Confirm
          </Button>
        </div>
      </Box>
    </form>
  );
}
