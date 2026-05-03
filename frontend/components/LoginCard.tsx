"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginCard() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-blue-600 p-8 rounded-2xl w-[350px]">
      <h2 className="text-white text-xl mb-4">Welcome Back</h2>

      <input
        className="w-full p-3 mb-3 rounded bg-blue-500 text-white"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-3 mb-4 rounded bg-blue-500 text-white"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* <button
        onClick={() => login(email, password)}
        className="w-full bg-white text-blue-600 p-3 rounded font-semibold"
      >
        Login
      </button> */}

      <button
  onClick={() => {
    console.log("BUTTON CLICKED");
    login(email, password);
  }}
  className="w-full bg-gray-200 text-blue-700 py-3 rounded-full font-semibold cursor-pointer"
>
  Login →
</button>
    </div>
  );
}