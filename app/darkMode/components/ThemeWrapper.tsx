"use client";

import { useTheme } from "next-themes";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
  
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100" // โหมดมืด: พื้นหลังสีเข้ม ตัวหนังสือสีขาว
            : "bg-gray-50 text-gray-900" // โหมดสว่าง: พื้นหลังสีอ่อน ตัวหนังสือสีเข้ม
        }`}
      >
        {children}
      </div>
    );
  }
  
