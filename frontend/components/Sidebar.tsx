"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  LayoutDashboard,
  UploadCloud,
  CheckCircle,
  FileText,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
};

export default function Sidebar({ collapsed, setCollapsed }: Props) {
  const pathname = usePathname();

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative ${
        collapsed ? "w-20" : "w-64"
      } 
      ${isDark ? "bg-[var(--background)]" : "bg-blue-600"}
      text-white dark:text-gray-200
      transition-all duration-300`}
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 p-5">
        <div className="w-10 h-10 bg-white dark:bg-[var(--card)] text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">
          Z
        </div>
        {!collapsed && <span className="text-lg font-semibold">WEB23</span>}
      </div>

      {/* TOGGLEsd BUTTONs*/}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-5 cursor-pointer top-10 border border-gray-300 dark:border-[var(--border)] bg-white dark:bg-[var(--card)] text-blue-600 dark:text-blue-400 w-8 h-8 rounded-full shadow-md flex items-center justify-center"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* MENU */}
      <div className="mt-6 flex flex-col gap-2 px-3">
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200
              ${
                active
                  ? "bg-white dark:bg-[var(--card)] text-blue-600 dark:text-blue-400 shadow-md scale-[1.02]"
                  : "text-white dark:text-gray-300 hover:bg-blue-500/70 dark:hover:bg-[var(--card)]"
              }`}
            >
              <span>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* FOOTER */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 text-xs opacity-70 text-white dark:text-gray-400">
          © 2026 web23 Pvt. Ltd.
        </div>
      )}
    </div>
  );
}

const menu = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/dashboard" },
  { label: "Upload Data", icon: <UploadCloud size={18} />, href: "/dashboard/upload" },
  { label: "Match Data", icon: <CheckCircle size={18} />, href: "/dashboard/match" },
  { label: "Report", icon: <FileText size={18} />, href: "/dashboard/report" },
  { label: "Profile", icon: <User size={18} />, href: "/dashboard/profile" },
];