"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex bg-[#0b1f3a] text-white">
      {/* LEFT SIDE */}
      <div className="w-1/2 relative flex flex-col justify-center px-16">
        {/* LOGO */}
        <div className="absolute top-10 left-16 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
            <span className="font-bold">Z</span>
          </div>
          <span className="text-xl font-semibold tracking-wide">WEB23</span>
        </div>

        {/* TEXT */}
        <h1 className="text-5xl font-light leading-tight mb-6">
          Transparent-Chain
        </h1>

        <h2 className="text-5xl font-bold leading-tight mb-6">
          Data Verification Portal
        </h2>

        <h3 className="text-4xl font-semibold mb-6">
          Secure. Transparent. Verified.
        </h3>

        <p className="text-gray-300 max-w-md text-sm">
          Verify, manage, and secure your digital records with advanced
          blockchain technology. Built for reliability, transparency, and
          real-time validation.
        </p>

        {/* GLOW EFFECT */}
        <div className="absolute right-10 top-20 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-400 opacity-10 blur-3xl rounded-full"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-500">
        <div className="w-[400px] bg-blue-600/90 backdrop-blur-xl p-8 rounded-2xl border border-blue-300/30 shadow-2xl">
          {/* HEADER */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
              Z
            </div>
            <span className="font-semibold">WEB23</span>
          </div>

          <h2 className="text-2xl font-semibold mb-1">Welcome Back!</h2>
          <p className="text-sm text-blue-100 mb-6">
            Sign in to your account to continue
          </p>

          {/* INPUTS */}
          <input
            type="text"
            placeholder="User Name / E-mail"
            className="w-full mb-4 px-4 py-3 rounded-full bg-transparent border border-blue-300 text-white placeholder-blue-200 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 rounded-full bg-transparent border border-blue-300 text-white placeholder-blue-200 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* OPTIONS */}
          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>
            <span className="underline cursor-pointer">
              Forgot Password?
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={() => login(email, password)}
            className="w-full bg-gray-200 text-blue-700 py-3 rounded-full font-semibold hover:bg-white transition cursor-pointer"
          >
            Login → jk
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6 text-sm">
            <div className="flex-1 h-px bg-blue-300"></div>
            OR
            <div className="flex-1 h-px bg-blue-300"></div>
          </div>

          {/* GOOGLE BUTTON */}
          <button className="w-full flex items-center justify-center gap-2 border border-blue-200 py-3 rounded-full hover:bg-blue-500 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}