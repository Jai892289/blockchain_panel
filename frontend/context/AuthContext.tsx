"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, logoutUser } from "@/services/auth.service";
import api from "@/lib/axios";

type AuthContextType = {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

//   const login = async (email: string, password: string) => {
//       console.log("LOGIN FUNCTION CALLED", email, password);

//     const res = await loginUser(email, password);
//     setUser(res.data.user);
//     router.push("/dashboard");
//   };

const login = async (email: string, password: string) => {
  try {
    console.log("➡️ calling login API");

    const res = await api.post("/auth/login", { email, password });

    console.log("✅ API response:", res.data);

    const { token, user } = res.data;

    // 1. store token
    localStorage.setItem("token", token);

    // 2. update state
    setUser(user || { email }); // fallback if user not returned

    console.log("📦 token saved");

    // 3. redirect
window.location.href = "/dashboard";
    console.log("➡️ redirecting...");
  } catch (err: any) {
    console.error("❌ login error:", err.response?.data || err.message);
  }
};

  const logout = async () => {
    await logoutUser();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;