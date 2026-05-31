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
  const [options, setOptions] = useState<string[]>([]);
  const [showPreview, setShowPreview] =
    useState(false);

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

  // const options = [
  //   "All",
  //   "Property ID",
  //   "Owner Name",
  //   "Address",
  //   "Mobile no.",
  //   "Property Type",
  //   "Plot area",
  // ];

  // =========================================
  // FORMATS
  // =========================================

  const formats = [
    { label: "Excel (.xls, .xlsx)", value: "Excel" },
    { label: "CSV (.csv)", value: "CSV" },
  ];

  // =========================================
  // GET UPLOADED DATA
  // =========================================

  useEffect(() => {
  const stored = localStorage.getItem("uploadedData");

  if (stored) {
    const parsed = JSON.parse(stored);

    setUploadedData(parsed);

    const rows = parsed?.data || [];

    const firstRow = Array.isArray(rows)
      ? rows[0]
      : null;

      setOptions(["All"]);

    // if (firstRow && typeof firstRow === "object") {
    //   setOptions([
    //     "All",
    //     ...Object.keys(firstRow),
    //   ]);
    // }

    console.log("UPLOADED DATA", parsed);
    console.log("FIRST ROW", firstRow);
  }
}, []);

//   useEffect(() => {
//     const stored = 
//     localStorage.getItem("uploadedData");

//     if (stored) {
//       const parsed = JSON.parse(stored);

//       setUploadedData(parsed);

//       // Get column names dynamically
//       // const firstRow = parsed?.data?.[0];

//       const rows = parsed?.data || parsed;

// const firstRow = Array.isArray(rows)
//   ? rows[0]
//   : null;

// if (firstRow && typeof firstRow === "object") {
//   setOptions([
//     "All",
//     ...Object.keys(firstRow),
//   ]);
// }

//       console.log("UPLOADED DATA", parsed);
// console.log("FIRST ROW", parsed?.data?.[0]);

//       // if (firstRow) {
//       //   setOptions([
//       //     "All",
//       //     ...Object.keys(firstRow),
//       //   ]);
//       // }
//     }
//   }, []);

  // useEffect(() => {

  //   const stored = localStorage.getItem("uploadedData");

  //   if (stored) {

  //     const parsed = JSON.parse(stored);

  //     console.log(parsed);

  //     setUploadedData(parsed);
  //   }

  // }, []);

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
    setSelected(
      selected.includes("All")
        ? []
        : ["All"]
    );
  }
};

  // const handleSelect = (value: string) => {

  //   if (value === "All") {

  //     setSelected(selected.includes("All") ? [] : options);

  //     return;
  //   }

  //   setSelected((prev) =>
  //     prev.includes(value)
  //       ? prev.filter((v) => v !== value)
  //       : [...prev.filter((v) => v !== "All"), value]
  //   );
  // };

  // =========================================
  // FINAL SUBMIT
  // =========================================

//   const selectedColumns = selected.filter(
//   (field) => field !== "All"
// );

const rows =
  uploadedData?.data || uploadedData || [];

const selectedColumns =
  selected.includes("All")
    ? Object.keys(rows[0] || {})
    : selected;

// const selectedColumns =
//   selected.includes("All")
//     ? Object.keys(uploadedData?.data?.[0] || {})
//     : selected;


const filteredData =
  uploadedData?.data?.map((row: any) => {
    const filteredRow: any = {};

    selectedColumns.forEach((field) => {
      filteredRow[field] = row[field];
    });

    return filteredRow;
  });

  const handleStartMatching = async () => {

    try {

      setLoading(true);

      const payload = {
  uploadedData: filteredData,
  selectedFields: selectedColumns,
  format,
  fromDate,
  toDate,
};

      // const payload = {
      //   uploadedData,
      //   selectedFields: selected,
      //   format,
      //   fromDate,
      //   toDate,
      // };

      console.log(payload);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/match`,
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
                      ${isCompleted
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
                      ${isCompleted
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
                      className={`w-12 h-[2px] mx-3 ${step > stepNumber
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
                    <span className="text-gray-400 text-sm">
  {selected.length === 0
    ? "-Please Select-"
    : "All"}
</span>
                    {/* {selected.length === 0
                      ? "-Please Select-"
                      : selected.join(", ")} */}

                    {/* {selected.length === 0
                      ? "-Please Select-"
                      : `${selected.length} selected`} */}

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
{/* 
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
              /> */}

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

                  {/* <p>
                    <strong>From Date:</strong> {fromDate}
                  </p>

                  <p>
                    <strong>To Date:</strong> {toDate}
                  </p> */}

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
  onClick={() => {
    if (step === 1) {
      router.back(); // go to previous page
    } else {
      setStep((s) => s - 1);
    }
  }}
  className="w-62 py-3 border border-blue-500 text-blue-500 rounded-lg cursor-pointer"
>
  ← Back
</button>

            {/* <button
              disabled={step === 1}
              onClick={() => setStep((s) => s - 1)}
              className="w-62 py-3 border border-blue-500 text-blue-500 rounded-lg cursor-pointer"
            >
              ← Back 
            </button> */}

            <button
              onClick={() => {

                if (step === 3) {

                  handleStartMatching();

                } else {

                  if (step === 1) {
                    if (selected.length === 0) {
                      alert(
                        "Please select at least one field"
                      );
                      return;
                    }

                    setShowPreview(true);
                  } else {
                    setStep((s) => s + 1);
                  }

                  // setStep((s) => s + 1);
                }
              }}
              className="w-62 py-3 bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              {step === 3 ? "Start Matching →" : "Next →"}
            </button>

          </div>
        </div>
      </div>
      {showPreview && (
        <PreviewModal
          selected={selected}
          uploadedData={uploadedData}
          onClose={() =>
            setShowPreview(false)
          }
          onConfirm={() => {
            setShowPreview(false);
            setStep(2);
          }}
        />
      )}


    </div>
  );
}

function PreviewModal({
  selected,
  uploadedData,
  onClose,
  onConfirm,
}: any) {
  const previewRows =
    uploadedData?.data || [];

    const selectedFields =
  selected.includes("All")
    ? Object.keys(
        uploadedData?.data?.[0] || {}
      )
    : selected;

  // const selectedFields = selected.filter(
  //   (x: string) => x !== "All"
  // );

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
          max-w-6xl
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-[32px]
          shadow-2xl
          overflow-scroll
          h-[600px]
        "
      >

        {/* HEADER */}
        <div className="px-8 py-6 border-b border-[var(--border)]">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">
                Verify Matching Configuration
              </h2>

              <p className="text-sm text-[var(--foreground)]/60 mt-1">
                Review selected fields before starting blockchain verification
              </p>
            </div>

            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-blue-100
                dark:bg-blue-900/30
                flex items-center justify-center
                text-blue-600
                text-2xl
                font-bold
              "
            >
              ✓
            </div>

          </div>

        </div>

        {/* BODY */}
        <div className="p-8">

          {/* SELECTED FIELDS */}
          <div className="mb-8">

            <h3 className="font-semibold text-lg text-[var(--foreground)] mb-4">
              Selected Matching Fields
            </h3>

            <div className="flex flex-wrap gap-3">

              {selectedFields.map((item: string) => (

                <div
                  key={item}
                  className="
                    px-4 py-2
                    rounded-full
                    bg-blue-50
                    dark:bg-blue-900/20
                    border border-blue-200
                    dark:border-blue-800
                    text-blue-700
                    dark:text-blue-300
                    text-sm
                    font-medium
                  "
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mb-8">

            <div
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--background)]
                p-5
              "
            >
              <p className="text-xs text-gray-500">
                Selected Fields
              </p>

              <h3 className="text-3xl font-bold mt-2 text-[var(--foreground)]">
                {selectedFields.length}
              </h3>
            </div>

            <div
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--background)]
                p-5
              "
            >
              <p className="text-xs text-gray-500">
                Preview Records
              </p>

              <h3 className="text-3xl font-bold mt-2 text-[var(--foreground)]">
                {previewRows.length}
              </h3>
            </div>

            <div
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--background)]
                p-5
              "
            >
              <p className="text-xs text-gray-500">
                Total Records
              </p>

              <h3 className="text-3xl font-bold mt-2 text-[var(--foreground)]">
                {uploadedData?.data?.length || 0}
              </h3>
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
                Data Preview 
              </h3>
            </div>

            <div className="overflow-auto max-h-[420px]">

              <table className="w-full">

                <thead className="bg-slate-50 dark:bg-slate-800">

                  <tr>

                    {selectedFields.map(
                      (field: string) => (

                        <th
                          key={field}
                          className="
                            px-4 py-4
                            text-left
                            text-xs
                            uppercase
                            tracking-wider
                            font-semibold
                            whitespace-nowrap
                          "
                        >
                          {field}
                        </th>

                      )
                    )}

                  </tr>

                </thead>

                <tbody>

                  {previewRows.map(
                    (
                      row: any,
                      index: number
                    ) => (

                      <tr
                        key={index}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                      >

                        {selectedFields.map(
                          (field: string) => (

                            <td
                              key={field}
                              className="
                                px-4 py-3
                                border-b
                                border-[var(--border)]
                                text-sm
                                whitespace-nowrap
                              "
                            >
                              {String(
                                row[field] ?? "-"
                              )}
                            </td>

                          )
                        )}

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-[var(--border)]
            px-8
            py-5
          "
        >

          <div className="text-sm text-[var(--foreground)]/60">
            Please verify the selected columns before continuing with blockchain matching.
          </div>

          <div className="flex gap-3">
{/* 
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
              Edit Selection
            </button> */}

            <button
              onClick={onConfirm}
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