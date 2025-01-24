"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Sb from "@/app/sidebarAuther/page";
import ReadOnlyProfilePage from "../component/profilePage";
import EditPage from "../component/settingPage";

const EditUsersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <Sb isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <EditPage />
    </div>
  );
};

export default EditUsersPage;
