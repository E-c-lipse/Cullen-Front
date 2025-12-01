"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../model/user";

// Define the shape of our Auth Context
interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}

// Create the context with undefined as default (will be provided by AuthProvider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Props
interface AuthProviderProps {
    children: ReactNode;
}

// AuthProvider Component
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Hydrate user from localStorage on mount
    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        const userName = localStorage.getItem("user_name");

        if (userId && userName) {
            // Reconstruct user object from localStorage
            // Note: We only store id and name, so we create a partial user object
            // You may want to fetch full user data from API here
            const storedUser: User = {
                id: parseInt(userId, 10),
                name: userName,
                // These fields would need to be fetched from API or stored in localStorage
                sex: (localStorage.getItem("user_sex") as 'M' | 'F') || 'M',
                age: parseInt(localStorage.getItem("user_age") || "0", 10),
                blood_type_id: parseInt(localStorage.getItem("user_blood_type_id") || "0", 10),
                department: localStorage.getItem("user_department") || "",
                macro_region: localStorage.getItem("user_macro_region") || "",
                credits: parseInt(localStorage.getItem("user_credits") || "0", 10),
                hospital_id: parseInt(localStorage.getItem("user_hospital_id") || "0", 10),
            };

            setUser(storedUser);
        }

        setLoading(false);
    }, []);

    // Login function - sets user and persists to localStorage
    const login = (userData: User) => {
        setUser(userData);

        // Persist all user data to localStorage
        localStorage.setItem("user_id", userData.id.toString());
        localStorage.setItem("user_name", userData.name);
        localStorage.setItem("user_sex", userData.sex);
        localStorage.setItem("user_age", userData.age.toString());
        localStorage.setItem("user_blood_type_id", userData.blood_type_id.toString());
        localStorage.setItem("user_department", userData.department);
        localStorage.setItem("user_macro_region", userData.macro_region);
        localStorage.setItem("user_credits", userData.credits.toString());
        localStorage.setItem("user_hospital_id", userData.hospital_id.toString());
    };

    // Logout function - clears user and localStorage
    const logout = () => {
        setUser(null);

        // Clear all user data from localStorage
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_sex");
        localStorage.removeItem("user_age");
        localStorage.removeItem("user_blood_type_id");
        localStorage.removeItem("user_department");
        localStorage.removeItem("user_macro_region");
        localStorage.removeItem("user_credits");
        localStorage.removeItem("user_hospital_id");
    };

    // Update user function - updates user state and localStorage
    const updateUser = (userData: User) => {
        setUser(userData);

        // Update localStorage with new data
        localStorage.setItem("user_id", userData.id.toString());
        localStorage.setItem("user_name", userData.name);
        localStorage.setItem("user_sex", userData.sex);
        localStorage.setItem("user_age", userData.age.toString());
        localStorage.setItem("user_blood_type_id", userData.blood_type_id.toString());
        localStorage.setItem("user_department", userData.department);
        localStorage.setItem("user_macro_region", userData.macro_region);
        localStorage.setItem("user_credits", userData.credits.toString());
        localStorage.setItem("user_hospital_id", userData.hospital_id.toString());
    };

    const value: AuthContextType = {
        user,
        loading,
        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the Auth Context
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
