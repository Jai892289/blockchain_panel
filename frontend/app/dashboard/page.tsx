"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import icon1 from "../../public/icon1.png"
import icon2 from "../../public/icon2.png"
import icon3 from "../../public/icon3.png"
import icon4 from "../../public/icon4.png"



export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Month");
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/stats`
      );

      const result = await response.json();

console.log("FULL API", result);
console.log("DATA", result.data);
console.log("DAILY", result.data.dailyTrends);
console.log("MONTHLY", result.data.monthlyTrends);
console.log("YEARLY", result.data.yearlyTrends);
      setDashboard(result.data);
      console.log("SETTING", result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

const chartData =
  activeTab === "Day"
    ? dashboard?.dailyTrends || []
    : activeTab === "Week"
    ? dashboard?.weeklyTrends || []
    : activeTab === "Year"
    ? dashboard?.yearlyTrends || []
    : dashboard?.monthlyTrends || [];


  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        Loading...
      </div>
    );
  }

  console.log("Dashboard =>", dashboard);
console.log("Active Tab =>", activeTab);
console.log("Chart Data =>", chartData);

  return (
    <div className="p-4 bg-[var(--background)] min-h-screen">

      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-4 gap-5 mb-6">

        <Card
          title="Last Upload Date"
          value={
            dashboard?.lastUploadDate
              ? new Date(
                dashboard.lastUploadDate
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })
              : "-"
          }
          sub={
            dashboard?.lastUploadDate
              ? String(
                new Date(
                  dashboard.lastUploadDate
                ).getFullYear()
              )
              : ""
          }
          bg="bg-[#dbeeff]"
          text="text-[#0f5fc2]"
          icon={icon1}
        />

        <Card
          title="Total DataUploads"
          value={
            dashboard?.totalUploads?.toLocaleString() ||
            "0"
          } bg="bg-[#daf5d9]"
          text="text-[#109b1c]"
          icon={icon2}
        />

        <Card
          title="Successful Matches"
          value={
            dashboard?.successfulMatches?.toLocaleString() ||
            "0"
          } bg="bg-[#ead9ff]"
          text="text-[#7b2cff]"
          icon={icon3}
        />

        <Card
          title="Failed Matches"
          value={
            dashboard?.failedMatches?.toLocaleString() ||
            "0"
          } bg="bg-[#ffdce3]"
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
                    ${activeTab === tab
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

  <YAxis
    axisLine={false}
    tickLine={false}
  />

  <XAxis
    dataKey="label"
    axisLine={false}
    tickLine={false}
  />

  <Tooltip />

  <Line
    type="monotone"
    dataKey="uploads"
    stroke="#2f6bff"
    strokeWidth={4}
    dot={{ r: 8 }}
    activeDot={{ r: 10 }}
  />

  <Line
    type="monotone"
    dataKey="matches"
    stroke="#b17cff"
    strokeWidth={4}
    dot={{ r: 8 }}
    activeDot={{ r: 10 }}
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