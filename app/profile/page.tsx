"use client";

import React from "react";

import { useState } from "react";

import Navbar from "@/app/navbar/page";
import AutherAfterLogin from "@/app/navbar/AutherAfterLogin";
import { useAuth } from "@/app/context/AuthProvider";
import Sb from "@/app/sidebarAuther/page";
import ReadOnlyProfilePage from "../profile/component/profilePage";
const UsersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { isLoggedIn } = useAuth();

  return (
    <div >
        <Sb isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ReadOnlyProfilePage />
    </div>
  );
};

export default UsersPage;
