"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import SettingNav from './components/settingNav';
import Navbar from "@/app/navbar/AfterLogin";
import EditPage from './components/settingPage';



const UsersPage = () => {


  return (

   
    
    <div>
      <Navbar /> {/* แดงแต่รันได้ */}
      <EditPage/>
    </div>
  );
};

export default UsersPage;
