"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Sb from "@/app/sidebarAuther/page";
import ReadOnlyProfilePage from "../component/profilePage";
import EditPage from "../component/settingPage";
import AutherAfterLogin from "@/app/navbar/AutherAfterLogin";

const EditUsersPage = () => {
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
      <EditPage />
    </div>
  );
};

export default EditUsersPage;
