"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="p-4 h-screen overflow-hidden bg-[var(--background)]">
      
      <div className="bg-[var(--dashboard)] border border-[var(--border)] rounded-[30px] h-full flex overflow-hidden">
        
        {/* SIDEBAR */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col mx-2 mt-2 mb-2 overflow-hidden">
          
          {/* HEADER */}
          <Header />

          {/* CONTENT */}
          <div className="
            flex-1 p-6 
            bg-[var(--card)] 
            border border-[var(--border)]
            rounded-b-[30px] 
            overflow-y-auto scrollbar-hide

            shadow-sm 
            dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
          ">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}