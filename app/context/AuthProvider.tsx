"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
    user: { userName?: string; profileImage?: string } | null;
    isLoggedIn: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoggedIn: false,
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ userName?: string } | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:3001/user/profile", {
                    withCredentials: true,
                });
                if (response.data) {
                    console.log("Profile fetched:", response.data); // Debug
                    setUser(response.data);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Error fetching profile:", error); // Debug
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
            console.error("Logout failed:", error); // Debug
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
