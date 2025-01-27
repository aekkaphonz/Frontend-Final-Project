"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface UserType {
  userName?: string;
  profileImage?: string;
  userId?: string; 
}

interface AuthContextType {
  user: UserType | null;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/profile", {
          withCredentials: true,
        });
  
        if (response.data && response.data.length > 0) {
          const userData = response.data[0];
          setUser({
            userName: userData.userName,
            profileImage: userData.profileImage || "https://via.placeholder.com/50",
            userId: userData._id,
          });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
        setIsLoggedIn(false);
      }
    };
  
    fetchProfile();
  }, []);  

  const logout = async () => {
    try {
      await axios.post("http://localhost:3001/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, logout }}>
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
