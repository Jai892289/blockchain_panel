"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
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

export default function Sidebar({
  collapsed,
  setCollapsed,
}: Props) {

  const pathname = usePathname();

  const [isDark, setIsDark] =
    useState(false);

  // =========================================
  // DARK MODE DETECT
  // =========================================

  useEffect(() => {

    const check = () => {

      setIsDark(
        document.documentElement.classList.contains(
          "dark"
        )
      );
    };

    check();

    const observer =
      new MutationObserver(check);

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );

    return () =>
      observer.disconnect();

  }, []);

  return (

    <div
      className={`
        relative
        ${
          collapsed
            ? "w-[90px]"
            : "w-[270px]"
        }

        ${
          isDark
            ? "bg-[var(--sidebar)]"
            : "bg-[#2563eb]"
        }

        text-white
        dark:text-gray-200

        transition-all duration-300
        min-h-screen
        flex flex-col
      `}
    >

      {/* ================================= LOGO ================================= */}

      <div
        className={`
          flex items-center
          ${
            collapsed
              ? "justify-center"
              : "justify-start gap-3"
          }

          px-5 py-6
        `}
      >

        {/* LOGO */}
        <div
          className={`
             justify-center
            overflow-hidden

            ${
              collapsed
                ? "w-12 h-12"
                : "w-[170px] h-[52px]"
            }
          `}
        >

          <img
            src="/logo.png"
            alt="WEB23 Logo"
            className="
              w-35 h-full
              object-contain
            "
          />
        </div>

        {/* TEXT */}
        {collapsed && (

         <img
            src="/dash_logo.png"
            alt="WEB23 Logo"
            className="
              w-35 h-full
              object-contain
            "
          />
        )}
      </div>

      {/* ================================= TOGGLE BUTTON ================================= */}

      <button
        onClick={() =>
          setCollapsed(!collapsed)
        }
        className="
          absolute
          -right-5
          top-10

          cursor-pointer

          border border-gray-300
          dark:border-[var(--border)]

          bg-white
          dark:bg-[var(--card)]

          text-blue-600
          dark:text-blue-400

          w-9 h-9
          rounded-full

          shadow-md

          flex items-center justify-center

          hover:scale-105
          transition-all
        "
      >

        {collapsed ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}

      </button>

      {/* ================================= MENU ================================= */}

      <div className="mt-5 flex flex-col gap-2 px-3">

        {menu.map((item) => {

          const active =
            pathname === item.href;

          return (

            <Link
              key={item.label}
              href={item.href}

              className={`
                flex items-center

                ${
                  collapsed
                    ? "justify-center"
                    : "gap-3"
                }

                px-4 py-3

                rounded-2xl

                transition-all duration-200

                ${
                  active
                    ? `
                      bg-white
                      dark:bg-[var(--card)]

                      text-blue-600
                      dark:text-blue-400

                      shadow-md
                    `
                    : `
                      text-white
                      dark:text-gray-300

                      hover:bg-blue-500/70
                      dark:hover:bg-[var(--card)]
                    `
                }
              `}
            >

              {/* ICON */}
              <span>
                {item.icon}
              </span>

              {/* LABEL */}
              {!collapsed && (

                <span className="text-sm font-medium">
                  {item.label}
                </span>
              )}

            </Link>
          );
        })}
      </div>

      {/* ================================= FOOTER ================================= */}

      {!collapsed && (

        <div
          className="
            mt-auto
            px-5 py-5

            text-xs
            opacity-70

            text-white
            dark:text-gray-400
          "
        >
          © 2026 WEB23 Pvt. Ltd.
        </div>
      )}
    </div>
  );
}

/* ================================= MENU ================================= */

const menu = [

  {
    label: "Dashboard",

    icon: (
      <LayoutDashboard size={18} />
    ),

    href: "/dashboard",
  },

  {
    label: "Upload Data",

    icon: (
      <UploadCloud size={18} />
    ),

    href: "/dashboard/upload",
  },

  {
    label: "Match Data",

    icon: (
      <CheckCircle size={18} />
    ),

    href: "/dashboard/match",
  },

  {
    label: "Report",

    icon: (
      <FileText size={18} />
    ),

    href: "/dashboard/report",
  },

  {
    label: "Profile",

    icon: (
      <User size={18} />
    ),

    href: "/dashboard/profile",
  },
];