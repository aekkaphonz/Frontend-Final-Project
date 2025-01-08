'use client'

import React, { useState } from "react";

const Navbar = () => {

  const  [isClick, setIsClick] = useState(false);

  const toggleNavbar = ()=>{
    setIsClick(!isClick)
  }
  return (
    <div>
      <nav className="bg-gray-500">
        <div className=" mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="text-white">
                  Blogs
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <a
                  href="/"
                  className="text-white hover:bg-gray-300 hover:text-black rounded-lg p-2"
                >
                  หน้าหลัก
                </a>
                <a
                  href="/"
                  className="text-white hover:bg-gray-300 hover:text-black rounded-lg p-2"
                >
                  หน้าฟีด
                </a>
                <a
                  href="/"
                  className="text-white hover:bg-gray-300 hover:text-black rounded-lg p-2"
                >
                  ตั้งค่า
                </a>
                <a
                  href="/signin"
                  className="text-white hover:bg-gray-300 hover:text-black rounded-lg p-2"
                >
                  เข้าสู่ระบบ
                </a>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white
               md:text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleNavbar}
              >EIEi</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
