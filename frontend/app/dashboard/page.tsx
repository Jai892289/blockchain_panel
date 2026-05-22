"use client";

import { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import icon1 from "../../public/icon1.png"
import icon2 from "../../public/icon2.png"
import icon3 from "../../public/icon3.png"
import icon4 from "../../public/icon4.png"

/* ================= DATA ================= */

const monthlyData = [
  { name: "Jan", upload: 200, match: 150 },
  { name: "Feb", upload: 220, match: 160 },
  { name: "Mar", upload: 240, match: 180 },
  { name: "Apr", upload: 260, match: 200 },
  { name: "May", upload: 300, match: 220 },
  { name: "Jun", upload: 320, match: 230 },
  { name: "Jul", upload: 350, match: 250 },
  { name: "Aug", upload: 330, match: 260 },
  { name: "Sep", upload: 310, match: 270 },
  { name: "Oct", upload: 520, match: 420 },
  { name: "Nov", upload: 480, match: 300 },
  { name: "Dec", upload: 550, match: 320 },
];

const weeklyData = [
  { name: "Mon", upload: 120, match: 90 },
  { name: "Tue", upload: 150, match: 110 },
  { name: "Wed", upload: 180, match: 140 },
  { name: "Thu", upload: 170, match: 130 },
  { name: "Fri", upload: 210, match: 160 },
  { name: "Sat", upload: 250, match: 190 },
  { name: "Sun", upload: 220, match: 170 },
];

const dailyData = [
  { name: "1AM", upload: 40, match: 20 },
  { name: "4AM", upload: 50, match: 25 },
  { name: "7AM", upload: 70, match: 40 },
  { name: "10AM", upload: 120, match: 80 },
  { name: "1PM", upload: 180, match: 130 },
  { name: "4PM", upload: 220, match: 170 },
  { name: "7PM", upload: 260, match: 200 },
  { name: "10PM", upload: 190, match: 140 },
];

const yearlyData = [
  { name: "2021", upload: 1200, match: 950 },
  { name: "2022", upload: 1600, match: 1200 },
  { name: "2023", upload: 2100, match: 1650 },
  { name: "2024", upload: 2800, match: 2200 },
  { name: "2025", upload: 3400, match: 2800 },
  { name: "2026", upload: 4200, match: 3600 },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Month");

  const chartData =
    activeTab === "Day"
      ? dailyData
      : activeTab === "Week"
      ? weeklyData
      : activeTab === "Year"
      ? yearlyData
      : monthlyData;

  return (
    <div className="p-4 bg-[var(--background)] min-h-screen">

      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-4 gap-5 mb-6">

        <Card
          title="Last Upload Date"
          value="April 5,"
          sub="2026"
          bg="bg-[#dbeeff]"
          text="text-[#0f5fc2]"
          icon={icon1}
        />

        <Card
          title="Total DataUploads"
          value="1,247"
          bg="bg-[#daf5d9]"
          text="text-[#109b1c]"
          icon={icon2}
        />

        <Card
          title="Successful Matches"
          value="1,189"
          bg="bg-[#ead9ff]"
          text="text-[#7b2cff]"
          icon={icon3}
        />

        <Card
          title="Failed Matches"
          value="58"
          bg="bg-[#ffdce3]"
          text="text-[#d61f45]"
          icon={icon4}
        />
      </div>

      {/* ================= CHART ================= */}
      <div
        className="
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-[35px]
          p-8
          shadow-sm
        "
      >

        {/* HEADER */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-5">

          <div>
            <p className="text-[var(--foreground)]/70 text-[17px] mb-1 font-medium">
              Upload and match statistics over time
            </p>

            <h2 className="text-[28px] font-bold text-[var(--foreground)]">
              Activity Trends
            </h2>
          </div>

          <div className="flex items-center gap-8">

            {/* LEGEND */}
            <div className="flex items-center gap-8 text-[15px] text-[var(--foreground)]/80 font-medium">

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2f6bff]" />
                Upload Data
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b17cff]" />
                Match Data
              </div>
            </div>

            {/* FILTERS */}
            <div className="bg-[var(--infos)] p-1.5 rounded-2xl flex items-center gap-1">

              {["Day", "Week", "Month", "Year"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-6 py-2 text-sm rounded-xl font-medium transition-all duration-300
                    ${
                      activeTab === tab
                        ? "bg-[#2f6bff] text-white shadow"
                        : "text-[var(--foreground)]/80"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}

            </div>
          </div>
        </div>

        {/* GRAPH */}
        <div className="h-[420px]">

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>

              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--foreground)", fontSize: 13 }}
              />

              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  color: "var(--foreground)",
                  padding: "10px 14px",
                }}
              />

              {/* BLUE LINE */}
              <Line
                type="monotone"
                dataKey="upload"
                stroke="#2f6bff"
                strokeWidth={3}
                dot={false}
                animationDuration={500}
              />

              {/* PURPLE LINE */}
              <Line
                type="monotone"
                dataKey="match"
                stroke="#b17cff"
                strokeWidth={3}
                dot={false}
                animationDuration={500}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>
      </div>
    </div>
  );
}

/* ================= CARD ================= */

function Card({
  title,
  value,
  sub,
  icon,
  bg,
  text,
}: any) {
  return (
    <div
      className={`
        ${bg}
        dark:bg-[var(--infos)]
        rounded-[24px]
        px-5 py-5
        flex items-center gap-5
        border border-[var(--border)]
      `}
    >

      {/* ICON */}
      {/* ICON */}
<div
  className="
    bg-[var(--card)]
    w-16 h-16
    rounded-full
    flex items-center justify-center
    shadow-sm
    overflow-hidden
  "
>
  <img
    src={icon.src}
    alt="icon"
    className="
      w-9 h-9
      object-contain
    "
  />
</div>

      {/* TEXT */}
      <div>
        <p className="text-[12px] text-[var(--foreground)]/70 mb-1 font-medium">
          {title}
        </p>

        <h2 className={`text-[30px] font-bold leading-none ${text}`}>
          {value}

          {sub && (
            <span className="text-[14px] ml-1 font-semibold">
              {sub}
            </span>
          )}
        </h2>
      </div>
    </div>
  );
}