"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // ตรวจสอบ token ใน localStorage
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("userToken", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};