"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  FileText,
  X,
} from "lucide-react";

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

  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setStatus("processing");

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "https://blockchain-panel.onrender.com/api/upload",
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
              setFile(droppedFile);
              setStatus("uploaded");
            }
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
                setFile(selected);
                setStatus("uploaded");
              }
            }}
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
            Supported formats: XLS, XLSX, CSV, SQL
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
            onClick={handleSubmit}
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

      {/* ================= PROCESSING MODAL ================= */}
      {status === "processing" && <ProcessingModal />}
    </div>
  );
}