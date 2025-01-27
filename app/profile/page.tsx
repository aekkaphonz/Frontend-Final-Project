"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "@/app/navbar/page";
import AutherAfterLogin from "@/app/navbar/AutherAfterLogin";
import { useAuth } from "@/app/context/AuthProvider";

import ReadOnlyProfilePage from "../profile/component/profilePage";

const UsersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { isLoggedIn } = useAuth();
  return (
    <div>
      {isLoggedIn ? (
        <AutherAfterLogin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <ReadOnlyProfilePage />
    </div>
  );
};

export default UsersPage;
