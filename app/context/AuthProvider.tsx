"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

interface UserType {
  userName?: string;
  profileImage?: string;
  userId?: string; 
}

interface AuthContextType {
  user: UserType | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

// เพิ่ม interface สำหรับ response จาก API
interface ProfileResponse {
  _id: string;
  userName: string;
  profileImage?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const response = await axios.get<ProfileResponse[]>("http://localhost:3001/user/profile", {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.length > 0) {
        const userData = response.data[0];
        setUser({
          userName: userData.userName,
          profileImage: userData.profileImage || "https://via.placeholder.com/50",
          userId: userData._id,
        });
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        console.warn("User is not authorized, setting as logged out.");
      } else {
        console.error("Error fetching profile:", error);
      }
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        await fetchProfile(); // Refresh user data immediately after login
        router.push('/'); // Redirect to home page
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await axios.post("http://localhost:3001/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setIsLoggedIn(false);
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const refreshUserData = async () => {
    await fetchProfile();
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
