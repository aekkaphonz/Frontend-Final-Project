"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const SwitchTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSwitchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className={`border h-[3rem] w-[3rem] rounded-full flex items-center justify-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-800 text-yellow-400"
          : "bg-gray-100 text-blue-600"
      }`}
      onClick={handleSwitchTheme}
    >
      {theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
    </button>
  );
};

export default SwitchTheme;