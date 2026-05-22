"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MatchDataFlow() {

  const router = useRouter();

  // =========================================
  // STATES
  // =========================================

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [uploadedData, setUploadedData] = useState<any>(null);

  const [open, setOpen] = useState(false);

  const [formatOpen, setFormatOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<string[]>([]);

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [format, setFormat] = useState("CSV");

  // =========================================
  // STEPS
  // =========================================

  const steps = [
    "Select Date Range",
    "Select Data Format",
    "Start Matching",
  ];

  // =========================================
  // OPTIONS
  // =========================================

  const options = [
    "All",
    "Property ID",
    "Owner Name",
    "Address",
    "Mobile no.",
    "Property Type",
    "Plot area",
  ];

  // =========================================
  // FORMATS
  // =========================================

  const formats = [
    { label: "Excel (.xls, .xlsx)", value: "Excel" },
    { label: "CSV (.csv)", value: "CSV" },
    { label: "SQL Database (.sql)", value: "SQL" },
  ];

  // =========================================
  // GET UPLOADED DATA
  // =========================================

  useEffect(() => {

    const stored = localStorage.getItem("uploadedData");

    if (stored) {

      const parsed = JSON.parse(stored);

      console.log(parsed);

      setUploadedData(parsed);
    }

  }, []);

  // =========================================
  // CLOSE DROPDOWN OUTSIDE
  // =========================================

  useEffect(() => {

    function handleClickOutside(e: MouseEvent) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setFormatOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  // =========================================
  // MULTI SELECT
  // =========================================

  const handleSelect = (value: string) => {

    if (value === "All") {

      setSelected(selected.includes("All") ? [] : options);

      return;
    }

    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev.filter((v) => v !== "All"), value]
    );
  };

  // =========================================
  // FINAL SUBMIT
  // =========================================

  const handleStartMatching = async () => {

    try {

      setLoading(true);

      const payload = {
        uploadedData,
        selectedFields: selected,
        format,
        fromDate,
        toDate,
      };

      console.log(payload);

      const response = await fetch(
        "https://blockchain-panel.onrender.com/api/match",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      console.log(data);

      let value = 0;

      const interval = setInterval(() => {

        value += 10;

        setProgress(value);

        if (value >= 100) {

          clearInterval(interval);

          router.push("/dashboard/report");
        }

      }, 400);

    } catch (error) {

      console.log(error);
    }
  };

  // =========================================
  // LOADING SCREEN
  // =========================================

  if (loading) {

    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--card)]">

        <div className="w-20 h-20 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin mb-6"></div>

        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          Matching data with Blockchain...
        </h2>

        <p className="text-gray-500 mb-6">
          Verifying {progress}% of records...
        </p>

        <div className="w-[500px] h-2 bg-[var(--border)] rounded-full overflow-hidden">

          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>

        </div>

        <p className="text-gray-400 text-sm mt-4">
          This may take a few minutes. Please wait.
        </p>

      </div>
    );
  }

  return (

    <div className="w-full h-full flex flex-col p-4 bg-[var(--background)]">

      {/* MAIN CARD */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-[30px] w-full p-10">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-12">

          <div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Match Data
            </h2>

            <p className="text-gray-500 mt-1 text-sm">
              Verify your data against blockchain records
            </p>
          </div>

          {/* STEPPER */}
          <div className="flex items-center gap-6">

            {steps.map((label, index) => {

              const stepNumber = index + 1;

              const isActive = step === stepNumber;

              const isCompleted = step > stepNumber;

              return (

                <div key={index} className="flex items-center">

                  <div className="flex flex-col items-center">

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-[var(--border)] text-gray-500"
                      }`}
                    >
                      {isCompleted ? "✔" : stepNumber}
                    </div>

                    <span
                      className={`text-xs mt-2
                      ${
                        isCompleted
                          ? "text-green-600"
                          : isActive
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>

                  </div>

                  {index !== steps.length - 1 && (

                    <div
                      className={`w-12 h-[2px] mx-3 ${
                        step > stepNumber
                          ? "bg-green-500"
                          : "bg-[var(--border)]"
                      }`}
                    />

                  )}

                </div>
              );
            })}

          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-10 min-h-[260px]">

          {/* STEP 1 */}
          {step === 1 && (

            <div className="max-w-lg mx-auto">

              <label className="text-sm text-gray-600 mb-2 block">
                Data Matched by
              </label>

              <div className="relative" ref={dropdownRef}>

                <div
                  onClick={() => setOpen(!open)}
                  className="border border-[var(--border)] rounded-lg px-4 py-3 flex justify-between cursor-pointer bg-[var(--card)]"
                >

                  <span className="text-gray-400 text-sm">

                    {selected.length === 0
                      ? "-Please Select-"
                      : `${selected.length} selected`}

                  </span>

                  ▼

                </div>

                {open && (

                  <div className="absolute w-full mt-2 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow p-4 z-50">

                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">

                      {options.map((item) => (

                        <label
                          key={item}
                          className="flex gap-2 text-sm cursor-pointer"
                        >

                          <input
                            type="checkbox"
                            checked={selected.includes(item)}
                            onChange={() => handleSelect(item)}
                          />

                          {item}

                        </label>
                      ))}

                    </div>

                    <button
                      onClick={() => setOpen(false)}
                      className="w-full mt-4 py-3 rounded-full bg-blue-600 text-white cursor-pointer"
                    >
                      Apply Filter
                    </button>

                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (

            <div className="max-w-lg mx-auto">

              <label className="text-sm text-gray-600 mb-2 block">
                Select Data Format
              </label>

              <div className="relative mb-5" ref={dropdownRef}>

                <div
                  onClick={() => setFormatOpen(!formatOpen)}
                  className="border border-[var(--border)] rounded-lg px-4 py-3 cursor-pointer bg-[var(--card)]"
                >
                  {format}
                </div>

                {formatOpen && (

                  <div className="absolute w-full mt-2 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow z-50">

                    {formats.map((f) => (

                      <div
                        key={f.value}
                        onClick={() => {
                          setFormat(f.value);
                          setFormatOpen(false);
                        }}
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer flex justify-between"
                      >
                        {f.label}

                        {format === f.value && "✔"}
                      </div>
                    ))}

                  </div>
                )}
              </div>

              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border border-[var(--border)] rounded-lg px-4 py-3 mb-4 bg-[var(--card)]"
              />

              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full border border-[var(--border)] rounded-lg px-4 py-3 bg-[var(--card)]"
              />

            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (

            <div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 mb-6">

                <h3 className="font-semibold text-[var(--foreground)] mb-4">
                  Matching Configuration
                </h3>

                <div className="space-y-2 text-sm">

                  <p>
                    <strong>Selected Fields:</strong>{" "}
                    {selected.join(", ")}
                  </p>

                  <p>
                    <strong>Format:</strong> {format}
                  </p>

                  <p>
                    <strong>From Date:</strong> {fromDate}
                  </p>

                  <p>
                    <strong>To Date:</strong> {toDate}
                  </p>

                  <p>
                    <strong>Uploaded Records:</strong>{" "}
                    {uploadedData?.data?.length || 0}
                  </p>

                </div>

              </div>

              <div className="border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-300 text-yellow-700 rounded-xl p-4 text-sm">
                Matching may take time. Please wait.
              </div>

            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-center gap-4 mt-6">

            <button
              disabled={step === 1}
              onClick={() => setStep((s) => s - 1)}
              className="w-62 py-3 border border-blue-500 text-blue-500 rounded-lg cursor-pointer"
            >
              ← Back
            </button>

            <button
              onClick={() => {

                if (step === 3) {

                  handleStartMatching();

                } else {

                  setStep((s) => s + 1);
                }
              }}
              className="w-62 py-3 bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              {step === 3 ? "Start Matching →" : "Next →"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}