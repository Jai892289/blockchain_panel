"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  KeyRound,
  ChevronRight,
} from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-end px-10 lg:px-24 overflow-hidden relative"
      style={{
        backgroundImage: "url('/login-bg.png')",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/35" />

      {/* LEFT TEXT */}
      <div className="absolute left-8 lg:left-16 top-0 h-full flex flex-col justify-center z-10 max-w-3xl">
        
        {/* LOGO */}
        <div className="absolute top-10 left-0 flex items-center gap-3">
          <img
            src="/logo.png"
            alt="WEB23 Logo"
            className="h-12 object-contain"
          />
        </div>

        <h1 className="text-[52px] font-light leading-tight text-white">
          Transparent-Chain
        </h1>

        <h2 className="text-[56px] font-bold leading-[1.05] mt-1 text-white">
          Data Verification Portal
        </h2>

        <h3 className="text-[46px] font-semibold mt-3 text-white">
          Secure. Transparent. Verified.
        </h3>

        <p className="text-white text-lg leading-8 max-w-2xl mt-6">
          Verify, manage, and secure your digital records with advanced
          blockchain technology. Built for reliability, transparency,
          and real-time validation.
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-[450px] rounded-3xl border border-white/20 bg-[#1677FF] backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.45)] px-7 py-6">

        {/* HEADER */}
        <div className="flex justify-center mb-2">
          <img
            src="/logo.png"
            alt="WEB23 Logo"
            className="h-14 object-contain w-32"
          />
        </div>

        <h2 className="text-[24px] font-semibold mb-1 text-white text-center">
          Welcome Back!
        </h2>

        <p className="text-sm text-gray-100 mb-7 text-center">
          Sign in to your account to continue
        </p>

        {/* EMAIL */}
        <div className="relative mb-4">
          <Mail
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/80"
          />

          <input
            type="text"
            placeholder="User Name / E-mail"
            className="w-full text-sm pl-14 pr-5 py-3 rounded-full bg-white/5 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:border-white"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="relative mb-3">
          <KeyRound
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/80"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full text-sm pl-14 pr-5 py-3 rounded-full bg-white/5 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:border-white"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* OPTIONS */}
        <div className="flex justify-between items-center text-gray-200 mb-3">
          
          <label className="flex items-center gap-2 cursor-pointer text-xs">
            <input
  type="checkbox"
  className="
    w-5 h-5
    rounded-[6px]
    border-2 border-white
    bg-transparent
    accent-white
    cursor-pointer
    appearance-none
    checked:bg-white
    checked:border-white
    relative
  "
/>

            Remember me
          </label>

          <button className="hover:text-white underline text-xs">
            Forgot Password?
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={() => login(email, password)}
          className="w-full bg-white text-blue-700 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer flex items-center justify-center gap-1"
        >
          Login
          <ChevronRight size={18} />
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-4 text-sm text-gray-200">
          <div className="flex-1 h-px bg-white/30" />
          OR
          <div className="flex-1 h-px bg-white/30" />
        </div>

        {/* GOOGLE */}
        <button className="w-full flex text-white items-center justify-center gap-3 border border-white/50 bg-white/40 py-3 rounded-full hover:bg-white/15 transition-all duration-300">
          
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            className="w-5 h-5 object-contain"
            alt="google"
          />

          <span className="text-sm font-medium">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
}