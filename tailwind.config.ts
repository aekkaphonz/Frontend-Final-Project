import type { Config } from "tailwindcss";

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        softBlack: "#1e1e2f", // พื้นหลังโหมดมืด
        lightText: "#f5f5f7", // ตัวหนังสือสีขาวในโหมดมืด
        lightBackground: "#ffffff", // พื้นหลังโหมดสว่าง
        darkIcon: "#b3b3b3", // สีไอคอนในโหมดมืด
        hoverDark: "#30303f", // สีพื้นหลังเมื่อ hover ในโหมดมืด
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;