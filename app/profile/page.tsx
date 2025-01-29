"use client";

import React from "react";

import { useState } from "react";

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

  const handleSearch = (query: string) => {};
  return (
    <div>
      {isLoggedIn ? (
        <AutherAfterLogin
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      ) : (
        <Navbar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          handleSearch={handleSearch}
        />
      )}
      <ReadOnlyProfilePage />
    </div>
  );
};

export default UsersPage;
