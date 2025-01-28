"use client";

import { useTheme } from "next-themes";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-softBlack text-lightText" // โหมดมืด
          : "bg-lightBackground text-gray-900" // โหมดสว่าง
      }`}
    >
      {children}
    </div>
  );
}