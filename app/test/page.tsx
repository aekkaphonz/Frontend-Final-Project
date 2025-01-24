"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import SettingNav from './components/settingNav';
import EditPage from './components/settingPage';
import { useAuth } from "@/app/context/AuthProvider";
import Navbar from "@/app/navbar/page";
import AfterLogin from "@/app/navbar/AfterLogin"

const UsersPage = () => {
  const { isLoggedIn } = useAuth();

  return (



    <div>
      {isLoggedIn ? <AfterLogin /> : <Navbar />}
      {/* <SettingNav /> */}
      <EditPage />
    </div>
  );
};

export default UsersPage;