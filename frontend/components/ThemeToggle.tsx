"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Load theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-9 h-9 flex items-center justify-center rounded-full
        transition-all duration-200 cursor-pointer
        ${
          dark
            ? "bg-yellow-100 dark:bg-yellow-900/30"
            : "hover:bg-gray-100 dark:hover:bg-slate-800"
        }
      `}
    >
      {dark ? (
        <span className="text-yellow-400 text-lg">🌙</span>
      ) : (
        <span className="text-gray-700 dark:text-gray-300 text-lg">☀️</span>
      )}
    </button>
  );
}