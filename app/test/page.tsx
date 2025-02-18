"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SettingNav from "./components/settingNav";
import EditPage from "../profile/component/settingPage";
import Sb from "@/app/sidebarAuther/page";
import ReadOnlyProfilePage from "../profile/component/profilePage";

const UsersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <Sb isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ReadOnlyProfilePage />
      
      <EditPage />
    </div>
  );
};
  
export default UsersPage;
