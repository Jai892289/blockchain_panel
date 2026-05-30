"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  FileText,
  X,
} from "lucide-react";
import * as XLSX from "xlsx";

function ProcessingModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* MODAL */}
      <div className="relative bg-[var(--card)] w-[350px] h-[250px] rounded-3xl flex flex-col items-center justify-center shadow-xl border border-[var(--border)]">

        {/* ANIMATED CIRCLE */}
        <div className="relative w-20 h-20 mb-6">

          <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900/40"></div>

          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute bottom-0 w-full bg-blue-600 animate-fill"></div>
          </div>
        </div>

        <p className="text-xs tracking-[0.3em] text-[var(--foreground)]/70 text-center">
          DATA UPLOADING TO BLOCKCHAIN
        </p>
      </div>
    </div>
  );
}

export default function UploadPages() {

  const [status, setStatus] = useState<
    "idle" | "uploaded" | "processing" | "done"
  >("idle");

  const [showPreview, setShowPreview] = useState(false);
const [previewData, setPreviewData] = useState<any[]>([]);

  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const handleFileSelect = async (selected: File) => {
  setFile(selected);
  setStatus("uploaded");

  try {
    const buffer = await selected.arrayBuffer();

    const workbook = XLSX.read(buffer, {
      type: "array",
    });

    const sheet =
      workbook.Sheets[
        workbook.SheetNames[0]
      ];

    const json = XLSX.utils.sheet_to_json(sheet);

    setPreviewData(json);
  } catch (err) {
    console.log(err);
  }
};

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setStatus("processing");

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      localStorage.setItem(
        "uploadedData",
        JSON.stringify(data)
      );

      setStatus("done");

      router.push("/dashboard/match");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-4">

        <h3 className="text-[20px] font-semibold text-[var(--foreground)]">
          File Upload
        </h3>

        <p className="text-[15px] text-[var(--foreground)]/60 mt-2">
          Supported formats: XLS, CSV, SQL - Maximum file size: 50MB
        </p>

        {/* ================= UPLOAD AREA ================= */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();

            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile) {
  handleFileSelect(droppedFile);
}

            // if (droppedFile) {
            //   setFile(droppedFile);
            //   setStatus("uploaded");
            // }
          }}
          className="
            mt-4
            border-2 border-dashed border-[#c8d7f0]
            dark:border-slate-600
            rounded-[30px]
            p-4
            text-center
            bg-[var(--card)]
            transition-all duration-300
            hover:border-blue-400
            hover:shadow-lg
          "
        >

          {/* HIDDEN INPUT */}
          <input
            type="file"
            accept=".pdf,.csv,.xls,.xlsx,.sql"
            className="hidden"
            id="fileUpload"
            onChange={(e) => {
  const selected = e.target.files?.[0];

  if (selected) {
    handleFileSelect(selected);
  }
}}
            // onChange={(e) => {
            //   const selected = e.target.files?.[0];

            //   if (selected) {
            //     setFile(selected);
            //     setStatus("uploaded");
            //   }
            // }}
          />

          {/* ICON */}
          <div className="flex justify-center mb-1">

            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-[#f3f7ff]
                dark:bg-slate-800
                border border-[#dbe7ff]
                dark:border-slate-700
                flex items-center justify-center
                shadow-sm
              "
            >
              <UploadCloud
                size={26}
                className="text-[#2563eb]"
                strokeWidth={2.2}
              />
            </div>
          </div>

          {/* TEXT */}
          <p className="text-[15px] font-medium text-[var(--foreground)]">
            Drag and drop your files here
          </p>

          <p className="text-sm text-[var(--foreground)]/50 mt-1 mb-4">
            or
          </p>

          {/* BUTTON */}
          <label
            htmlFor="fileUpload"
            className="
              inline-flex items-center gap-2
              px-6 py-3
              rounded-xl
              text-sm font-medium

              bg-white
              dark:bg-slate-800

              text-[var(--foreground)]

              border border-[var(--border)]

              hover:shadow-md
              hover:scale-[1.02]

              transition-all duration-200
              cursor-pointer
            "
          >
            Browse Files
          </label>

          {/* BOTTOM TEXT */}
          <p className="text-xs text-[#8ba0c7] mt-5">
            Supported formats: XLS, XLSX, CSV
          </p>
        </div>
      </div>

      {/* ================= FILE CARD ================= */}
      {status === "uploaded" && file && (
        <>
          <div
            className="
              bg-[var(--card)]
              border border-[var(--border)]
              rounded-2xl
              p-5
              flex justify-between items-center
              mb-6
              shadow-sm
            "
          >

            {/* LEFT */}
            <div className="flex items-center gap-4">

              {/* FILE ICON */}
              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-[#eff6ff]
                  flex items-center justify-center
                "
              >
                <FileText
                  size={22}
                  className="text-blue-600"
                />
              </div>

              {/* FILE INFO */}
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {file.name}
                </p>

                <p className="text-xs text-[var(--foreground)]/60 mt-1">
                  {(file.size / 1024).toFixed(1)} KB – 100% uploaded
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

              <span className="text-green-600 text-sm font-medium">
                ✔ Success
              </span>

              {/* REMOVE */}
              <button
                onClick={() => {
                  setFile(null);
                  setStatus("idle");
                }}
                className="
                  w-8 h-8
                  rounded-full
                  hover:bg-red-50
                  dark:hover:bg-red-900/20
                  flex items-center justify-center
                  transition-all
                  cursor-pointer
                "
              >
                <X
                  size={18}
                  className="text-red-500"
                />
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
          
  onClick={() => setShowPreview(true)}
            // onClick={handleSubmit}
            className="
              w-full
              bg-[#2563eb]
              text-white
              py-3.5
              rounded-2xl
              hover:bg-[#1d4ed8]
              transition-all duration-300
              font-medium
              shadow-md
              cursor-pointer
            "
          >
            Upload your Data
          </button>
        </>
      )}

      {showPreview && (
  <PreviewModal
    data={previewData}
    onClose={() => setShowPreview(false)}
    onNext={async () => {
      setShowPreview(false);
      await handleSubmit();
    }}
  />
)}

      {/* ================= PROCESSING MODAL ================= */}
      {status === "processing" && <ProcessingModal />}
    </div>
  );
}


function PreviewModal({
  data,
  onClose,
  onNext,
}: {
  data: any[];
  onClose: () => void;
  onNext: () => void;
}) {
  const columns =
    data.length > 0
      ? Object.keys(data[0])
      : [];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          relative
          w-full
          max-w-5xl
          h-[600px]
          overflow-scroll
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-[32px]
          shadow-2xl

        "
      >

        {/* HEADER */}
        <div className="border-b border-[var(--border)] px-8 py-6">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">
                Verify Uploaded Data
              </h2>

              <p className="text-sm text-[var(--foreground)]/60 mt-1">
                Review your Excel file before proceeding to blockchain matching
              </p>
            </div>

            <div
              className="
                h-14 w-14
                rounded-2xl
                bg-blue-100
                dark:bg-blue-900/30
                flex items-center justify-center
                text-blue-600
                text-xl
                font-bold
              "
            >
              📄
            </div>

          </div>

        </div>

        {/* BODY */}
        <div className="p-8">

          {/* STATS */}
<div className="grid grid-cols-3 gap-3 mb-6">

            <div className="rounded-2xl border border-[var(--border)] p-4 bg-[var(--background)]">

              <p className="text-xs text-[var(--foreground)]/60">
                Total Records
              </p>

              <h3 className="text-3xl font-bold mt-2 text-[var(--foreground)]">
                {data.length}
              </h3>

            </div>

            <div className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--background)]">

              <p className="text-xs text-[var(--foreground)]/60">
                Columns Found
              </p>

              <h3 className="text-3xl font-bold mt-2 text-[var(--foreground)]">
                {columns.length}
              </h3>

            </div>

            <div className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--background)]">

              <p className="text-xs text-[var(--foreground)]/60">
                Preview Rows
              </p>

              <h3 className="text-3xl font-bold mt-2 text-[var(--foreground)]">
                {Math.min(data.length, 10)}
              </h3>

            </div>

          </div>

          {/* COLUMN TAGS */}
          <div className="mb-6">

            <h4 className="font-semibold text-[var(--foreground)] mb-3">
              Detected Columns
            </h4>

            <div className="flex flex-wrap gap-2">

              {columns.map((column) => (

                <span
                  key={column}
                  className="
                    px-3 py-1.5
                    rounded-full
                    text-xs
                    font-medium
                    bg-blue-50
                    dark:bg-blue-900/20
                    text-blue-700
                    dark:text-blue-300
                    border border-blue-200
                    dark:border-blue-800
                  "
                >
                  {column}
                </span>

              ))}

            </div>

          </div>

          {/* TABLE */}
          <div
            className="
              border border-[var(--border)]
              rounded-2xl
              overflow-hidden
              bg-[var(--background)]
            "
          >

            <div className="px-5 py-4 border-b border-[var(--border)]">

              <h3 className="font-semibold text-[var(--foreground)]">
                Excel Data Preview
              </h3>

            </div>

<div
  className="
    overflow-auto
    h-[350px]
    max-w-full 
  "
>
              <table className="w-full">

                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10">

                  <tr>

                    {columns.map((key) => (

                      <th
                        key={key}
                        className="
                          px-4 py-4
                          text-left
                          text-xs
                          uppercase
                          tracking-wider
                          font-semibold
                          whitespace-nowrap
                          border-b
                        "
                      >
                        {key}
                      </th>

                    ))}

                  </tr>

                </thead>

                <tbody>

                  {data
                    
                    .map((row, index) => (

                      <tr
                        key={index}
                        className="
                          hover:bg-slate-50
                          dark:hover:bg-slate-800/40
                        "
                      >

                        {columns.map((column) => (

                          <td
                            key={column}
                            className="
                              px-4 py-3
                              text-sm
                              border-b
                              border-[var(--border)]
                              whitespace-nowrap
                            "
                          >
                            {String(
                              row[column] ?? "-"
                            )}
                          </td>

                        ))}

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div
          className="
            border-t border-[var(--border)]
            px-8 py-5
            flex items-center justify-between
          "
        >

          <div className="text-sm text-[var(--foreground)]/60">
            Please verify that the uploaded data is correct before continuing.
          </div>

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="
                px-6 py-3
                rounded-xl
                border border-[var(--border)]
                bg-[var(--card)]
                hover:bg-slate-50
                dark:hover:bg-slate-800
                transition-all
                font-medium
                cursor-pointer
              "
            >
              Upload Different File
            </button>

            <button
              onClick={onNext}
              className="
                px-6 py-3
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-medium
                shadow-lg
                transition-all
                                cursor-pointer

              "
            >
              Confirm & Continue →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


