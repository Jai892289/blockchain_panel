"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const data = [
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

export default function DashboardPage() {
  return (
    <div className="p-2 h-full">

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        <Card title="Last Upload Date" value="April 5," sub="2026" />
        <Card title="Total DataUploads" value="1,247" />
        <Card title="Successful Matches" value="1,189" />
        <Card title="Failed Matches" value="58" />
      </div>

      {/* CHART BOX */}
      <div className="
        bg-[var(--card)] 
        border border-[var(--border)] 
        rounded-[25px] 
        p-6
        shadow-sm 
        dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
      ">

        {/* TOP */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-400">
              Upload and match statistics over time
            </p>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Activity Trends
            </h3>
          </div>

          {/* FILTER */}
          <div className="flex items-center gap-6">

            {/* LEGEND */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Upload Data
              </span>

              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Match Data
              </span>
            </div>

            {/* TOGGLE */}
            <div className="bg-gray-100 dark:bg-slate-800 rounded-full p-1 flex text-sm">
              <button className="px-4 py-1 text-gray-500">Day</button>
              <button className="px-4 py-1 text-gray-500">Week</button>
              <button className="px-4 py-1 bg-blue-600 text-white rounded-full">
                Month
              </button>
              <button className="px-4 py-1 text-gray-500">Year</button>
            </div>

          </div>
        </div>

        {/* GRAPH */}
        <div className="h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderRadius: "10px",
                  border: "none",
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="upload"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorUpload)"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="match"
                stroke="#a78bfa"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, sub }: any) {
  return (
    <div className="
      bg-[var(--card)] 
      border border-[var(--border)] 
      rounded-2xl 
      px-4 py-6 
      flex items-center gap-4 
      shadow-sm
      dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
    ">

      {/* ICON */}
      <div className="
        w-12 h-12 
        bg-white dark:bg-slate-700 
        rounded-full 
        flex items-center justify-center 
        shadow-md
      ">
        📊
      </div>

      <div>
        <p className="text-xs text-gray-500">{title}</p>

        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          {value} {sub && <span className="text-sm">{sub}</span>}
        </h2>
      </div>
    </div>
  );
}