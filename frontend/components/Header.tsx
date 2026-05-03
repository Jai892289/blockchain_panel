"use client";

import { useState, useRef, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    router.push("/login");
  };

  return (
    <div className="
      flex justify-between items-center
      px-8 py-5
      bg-[var(--card)]
      rounded-t-[28px]
      border-b border-[var(--border)]
    ">
      {/* LEFT */}
      <div>
        <h1 className="text-[20px] font-semibold text-[var(--foreground)]">
          Data Verification System
        </h1>
        <p className="text-sm text-gray-500">
          Urban Local Bodies - Blockchain Portal
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5 text-gray-500 dark:text-gray-400">

        {/* ICONS */}
        <div className="flex items-center gap-4">

          {/* THEME */}
          <ThemeToggle />

          {/* NOTIFICATION */}
          <div className="relative">
            <button className="w-9 h-9 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-slate-800">
              🔔
            </button>

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
              5
            </span>
          </div>
        </div>

        {/* AVATAR + DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <img
            onClick={() => setOpen(!open)}
            src="https://i.pravatar.cc/40"
            className="
              w-10 h-10 rounded-full cursor-pointer
              border-2 border-[var(--border)]
            "
          />

          {/* DROPDOWN */}
          {open && (
  <div
    className="
      absolute right-0 mt-4 w-64
      bg-[var(--card)]
      border border-[var(--border)]
      rounded-2xl
      shadow-lg
      p-3
      z-50
    "
  >
    {/* USER INFO */}
    <div className="flex items-center gap-3 p-3 rounded-xl">
      <img
        src="https://i.pravatar.cc/40"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-sm font-medium text-[var(--foreground)]">
          Rajesh Kumar
        </p>
        <p className="text-xs text-gray-500">
          rajesh@email.com
        </p>
      </div>
    </div>

    <div className="h-px bg-[var(--border)] my-2"></div>

    {/* MENU ITEMS */}
    <button
      onClick={() => {
        router.push("/dashboard/profile");
        setOpen(false);
      }}
      className="
        w-full flex items-center gap-2
        px-3 py-2 rounded-lg text-sm cursor-pointer
        text-[var(--infos-text)]
        hover:bg-gray-100 dark:hover:bg-slate-800
        transition
      "
    >
      👤 Profile
    </button>

   

    <div className="h-px bg-[var(--border)] my-2"></div>

    {/* LOGOUT */}
    <button
      onClick={() => {
        localStorage.removeItem("token");
        router.push("/login");
      }}
      className="
        w-full flex items-center gap-2
        px-3 py-2 rounded-lg text-sm cursor-pointer
        text-red-500
        hover:bg-red-50 dark:hover:bg-red-900/20
        transition
      "
    >
      🚪 Logout
    </button>
  </div>
)}
        </div>

      </div>
    </div>
  );
}