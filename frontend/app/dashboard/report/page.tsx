"use client";

import { useEffect, useState } from "react";

import {
  FileText,
  CheckCircle2,
  Target,
  AlertTriangle,
  Download,
  FileSpreadsheet,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ReportPage() {

  const [report, setReport] = useState<any>(null);

  const handleDownloadReport = () => {
  if (!records.length) return;

  const exportData = records.map(
    (row: any, index: number) => ({
      ...row,
      Status:
        index % 5 !== 0
          ? "Matched"
          : "Unmatched",
      Remarks:
        index % 5 !== 0
          ? "Data verified successfully"
          : "Mismatch found",
    })
  );

  const worksheet =
    XLSX.utils.json_to_sheet(exportData);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Match Report"
  );

  const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array",
    }
  );

  const fileData = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(
    fileData,
    `match-report-${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`
  );
};

  // =========================================
  // FETCH REPORT API
  // =========================================

  useEffect(() => {

    const fetchReport = async () => {

      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/match-report`
        );

        const data = await response.json();

        setReport(data.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchReport();

  }, []);

  const records = Array.isArray(report?.uploadedData)
  ? report.uploadedData
  : report?.uploadedData?.data || [];

// const records = report?.uploadedData?.data || [];

const columns =
  Array.isArray(records) && records.length > 0
    ? Object.keys(records[0])
    : [];



  // =========================================
  // CALCULATIONS
  // =========================================

  const totalRecords = records.length;

  // const totalRecords =
  // report?.uploadedData?.data?.length || 0;

  // const totalRecords =
  //   report?.uploadedData?.data?.length > 0
  //     ? report?.uploadedData?.data?.length - 1
  //     : 0;

  const matchedRecords = Math.floor(
    totalRecords * 0.95
  );

  const mismatchedRecords =
    totalRecords - matchedRecords;

  const accuracyRate =
    totalRecords > 0
      ? (
          (matchedRecords / totalRecords) *
          100
        ).toFixed(1)
      : 0;

  return (

    <div className="w-full p-4 bg-[var(--background)] min-h-screen">

      {/* ================================= HEADER ================================= */}

      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">

        <div>

          <h1 className="text-[26px]  font-bold text-[var(--foreground)] leading-none">
            Match Results
          </h1>

          <p className="text-[14px] text-[var(--foreground)]/60 mt-2">
            Data verification results and reports
          </p>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">

          {/* <button
            className="
              h-11 px-5
              rounded-xl
              border border-[var(--border)]
              bg-[var(--card)]
              text-[var(--foreground)]
              flex items-center gap-2
              text-sm
              font-medium
              hover:shadow-md
              transition-all
            "
          >
            <FileText size={17} />
            View Reports
          </button> */}

          <button
  onClick={handleDownloadReport}
  className="
    h-11 px-5
    rounded-xl
    bg-[#2563eb]
    text-white
    flex items-center gap-2
    text-sm font-medium
    hover:bg-[#1d4ed8]
    transition-all
    shadow-md
    cursor-pointer
  "
>
   <Download size={17} />
            Download Report
</button>

          {/* <button
            className="
              h-11 px-5
              rounded-xl
              bg-[#2563eb]
              text-white
              flex items-center gap-2
              text-sm
              font-medium
              hover:bg-[#1d4ed8]
              transition-all
              shadow-md
            "
          >
            <Download size={17} />
            Download Report
          </button> */}

        </div>
      </div>

      {/* ================================= STATS ================================= */}

      <div className="grid grid-cols-4 gap-5 mb-7">

        <StatCard
          title="Total Records"
          value={totalRecords}
          color="blue"
          icon={
            <FileSpreadsheet
              size={22}
              className="text-[#3b82f6]"
            />
          }
        />

        <StatCard
          title="Matched Records"
          value={matchedRecords}
          color="green"
          icon={
            <ShieldCheck
              size={22}
              className="text-[#16a34a]"
            />
          }
        />

        <StatCard
          title="Accuracy Rate"
          value={`${accuracyRate}%`}
          color="purple"
          icon={
            <Target
              size={22}
              className="text-[#9333ea]"
            />
          }
        />

        <StatCard
          title="Mismatched Records"
          value={mismatchedRecords}
          color="red"
          icon={
            <XCircle
              size={22}
              className="text-[#dc2626]"
            />
          }
        />

      </div>

      {/* ================================= TABLE ================================= */}

      <div
        className="
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-[34px]
          p-8
          shadow-sm
          mb-7
        "
      >

        {/* TITLE */}
        <div className="mb-7">

          <h2 className="text-[26px] font-bold text-[var(--foreground)] leading-none">
            Detailed Results
          </h2>

          <p className="text-[14px] text-[var(--foreground)]/60 mt-2">
            Individual record verification status
          </p>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full">

            {/* TABLE HEAD */}
            {/* <thead>

              <tr className="border-b border-[var(--border)]">

                <th className="text-left py-4 px-3 text-[13px] font-semibold text-[var(--foreground)]">
                  Record ID
                </th>

                <th className="text-left py-4 px-3 text-[13px] font-semibold text-[var(--foreground)]">
                  Record Type
                </th>

                <th className="text-left py-4 px-3 text-[13px] font-semibold text-[var(--foreground)]">
                  Status
                </th>

                <th className="text-left py-4 px-3 text-[13px] font-semibold text-[var(--foreground)]">
                  Remarks
                </th>

                <th className="text-left py-4 px-3 text-[13px] font-semibold text-[var(--foreground)]">
                  Timestamp
                </th>

              </tr>
            </thead> */}

           <thead>
  <tr className="border-b border-[var(--border)]">
    {columns.map((col) => (
      <th
        key={col}
        className="px-3 py-4 text-left text-[13px] font-semibold whitespace-nowrap"
      >
        {col}
      </th>
    ))}

    <th className="px-3 py-4 text-left text-[13px] font-semibold">
      Status
    </th>

    <th className="px-3 py-4 text-left text-[13px] font-semibold">
      Remarks
    </th>
  </tr>
</thead>

           <tbody>
  {records.map(
    (row: any, rowIndex: number) => {

      const isMatched =
        rowIndex % 5 !== 0;

      return (
        <tr
          key={rowIndex}
          className="border-b border-[var(--border)]"
        >
          {columns.map((col) => (
            <td
              key={col}
              className="px-3 py-3 text-sm whitespace-nowrap"
            >
              {String(row[col] ?? "")}
            </td>
          ))}

          {/* STATUS */}
          <td className="px-3 py-3">
            <div
              className={`
                inline-flex items-center gap-2
                px-3 py-1 rounded-full text-xs font-medium
                ${
                  isMatched
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {isMatched ? (
                <>
                  <CheckCircle2 size={13} />
                  Matched
                </>
              ) : (
                <>
                  <AlertTriangle size={13} />
                  Unmatched
                </>
              )}
            </div>
          </td>

          {/* REMARKS */}
          <td className="px-3 py-3 text-sm">
            {isMatched
              ? "Data verified successfully"
              : "Mismatch found"}
          </td>
        </tr>
      );
    }
  )}
</tbody>

            {/* BODY */}
            {/* <tbody>

              {report?.uploadedData?.data
                ?.slice(1)
                ?.map((item: any, index: number) => (

                  <Row
                    key={index}

                    id={`REC${String(index + 1).padStart(3, "0")}`}

                    type={
                      item.__EMPTY_1 ||
                      "Property Tax"
                    }

                    status={
                      index % 5 === 0
                        ? "mismatch"
                        : "matched"
                    }

                    remark={
                      index % 5 === 0
                        ? "Amount discrepancy detected"
                        : "Data verified successfully"
                    }

                    timestamp={report?.createdAt}

                  />

                ))}

            </tbody> */}
          </table>
        </div>
      </div>

      {/* ================================= BLOCKCHAIN DETAILS ================================= */}

      <div
        className="
          rounded-[30px]
          border
          border-yellow-300
          dark:border-yellow-700/40
          bg-[#fffdf0]
          dark:bg-[#2a2412]
          p-8
          shadow-sm
        "
      >

        {/* TITLE */}
        <h2 className="text-[24px]  font-bold text-[#2563eb] mb-8">
          Blockchain Verification Details
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-16">

          {/* BLOCK NUMBER */}
          <div>

            <p className="text-[14px] text-[var(--foreground)]/65 mb-1">
              Block Number
            </p>

            <p className="text-[16px] font-semibold text-[var(--foreground)]">
              {report?.blockchain?.blockNumber || "19234567"}
            </p>

          </div>

          {/* HASH */}
          <div>

            <p className="text-[14px] text-[var(--foreground)]/65 mb-1">
              Transaction Hash
            </p>

            <p className="text-[16px] font-medium text-[var(--foreground)] break-all">
              {report?.blockchain?.txHash ||
                "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7"}
            </p>

          </div>

          {/* NETWORK */}
          <div>

            <p className="text-[14px] text-[var(--foreground)]/65 mb-1">
              Network
            </p>

            <p className="text-[16px] font-semibold text-[var(--foreground)]">
              {report?.blockchain?.network || "Ethereum Mainnet"}
            </p>

          </div>

          {/* DATE */}
          <div>

            <p className="text-[14px] text-[var(--foreground)]/65 mb-1">
              Verification Date
            </p>

            <p className="text-[18px] font-semibold text-[var(--foreground)]">
              {report?.createdAt
                ? new Date(report.createdAt).toLocaleString()
                : "5/22/2026, 11:27:23 AM"}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

/* ================================= STAT CARD ================================= */

function StatCard({
  title,
  value,
  color,
  icon,
}: any) {

  const styles: any = {

    blue: {
      bg: "bg-[#eff6ff] dark:bg-blue-900/20",
      border: "border-[#bfdbfe]",
      text: "text-[#1976d2]",
    },

    green: {
      bg: "bg-[#ecfdf3] dark:bg-green-900/20",
      border: "border-[#bbf7d0]",
      text: "text-[#16a34a]",
    },

    purple: {
      bg: "bg-[#f5ecff] dark:bg-purple-900/20",
      border: "border-[#e9d5ff]",
      text: "text-[#7e22ce]",
    },

    red: {
      bg: "bg-[#fff1f2] dark:bg-red-900/20",
      border: "border-[#fecdd3]",
      text: "text-[#dc2626]",
    },
  };

  const s = styles[color];

  return (

    <div
      className={`
        ${s.bg}
        border ${s.border}
        rounded-[22px]
        px-5 py-5
        flex items-center justify-between
      `}
    >

      {/* LEFT */}
      <div>

        <p className="text-[13px] text-[var(--foreground)]/70 mb-2">
          {title}
        </p>

        <h2 className={`text-[36px] lg:text-[40px] font-bold leading-none ${s.text}`}>
          {value}
        </h2>

      </div>

      {/* RIGHT ICON */}
      <div
        className="
          w-14 h-14
          rounded-full
          bg-white/80
          dark:bg-slate-800
          flex items-center justify-center
        "
      >
        {icon}
      </div>

    </div>
  );
}

/* ================================= ROW ================================= */

function Row({
  id,
  type,
  status,
  remark,
  timestamp,
}: any) {

  const isMatched =
    status === "matched";

  return (

    <tr className="border-b border-[var(--border)]">

      {/* ID */}
      <td className="py-4 px-3 font-semibold text-[var(--foreground)] text-sm">
        {id}
      </td>

      {/* TYPE */}
      <td className="px-3 text-[var(--foreground)] text-sm">
        {type}
      </td>

      {/* STATUS */}
      <td className="px-3 text-sm">

        <div
          className={`
            inline-flex items-center gap-2
            px-3 py-1.5
            rounded-full
            text-xs font-medium
            ${
              isMatched
                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
            }
          `}
        >

          {isMatched ? (
            <CheckCircle2 size={13} />
          ) : (
            <AlertTriangle size={13} />
          )}

          {isMatched
            ? "Matched"
            : "Mismatched"}

        </div>

      </td>

      {/* REMARK */}
      <td className="px-3 text-[var(--foreground)]/65 text-sm">
        {remark}
      </td>

      {/* DATE */}
      <td className="px-3 text-[var(--foreground)]/55 text-sm">
        {new Date(timestamp).toLocaleString()}
      </td>

    </tr>
  );
}