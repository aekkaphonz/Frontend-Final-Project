"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import SettingNav from './components/settingNav';
import EditPage from './components/settingPage';


const UsersPage = () => {


  return (

   
    
    <div>
      <SettingNav />
      <EditPage/>
    </div>
  );
};

export default UsersPage;
