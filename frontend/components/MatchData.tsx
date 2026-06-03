"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


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

const [selected, setSelected] = useState<string[]>(["All"]);

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
    setOptions(["All"]);

    // Auto-select All
    setSelected(["All"]);
  }
}, []);


const handleCreate = async () => {
  try {
    setLoading(true);

    const payload = {
      action: "create",

      uploadedData: filteredData,

      selectedFields: selectedColumns,

      format,

      fromDate,

      toDate,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/match`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(payload),
      }
    );

    const data =
      await response.json();

    // Duplicate Data
    if (
      response.status === 409
    ) {
      alert(
        "Data already exists on blockchain"
      );

      return;
    }

    if (!response.ok) {
      throw new Error(
        data.message
      );
    }

   console.log(
  "CREATE SUCCESS",
  data
);

sessionStorage.setItem(
  "matchReport",
  JSON.stringify(data.data)
);

toast.success(
  "Records successfully stored on blockchain"
);

router.push(
  "/dashboard/report"
);

  } catch (error: any) {
    console.log(error);

    alert(
      error.message ||
        "Create failed"
    );
  } finally {
    setLoading(false);
  }
};

const handleStartMatching =
  async () => {
    try {
      setLoading(true);

      const payload = {
        action: "verify",

        uploadedData:
          filteredData,

        selectedFields:
          selectedColumns,

        format,

        fromDate,

        toDate,
      };

      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/match`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok
      ) {
        throw new Error(
          data.message
        );
      }

      console.log(
        "VERIFY SUCCESS",
        data
      );

      sessionStorage.setItem(
        "matchReport",
        JSON.stringify(
          data.data
        )
      );

      router.push(
        "/dashboard/report"
      );

    } catch (error: any) {

      console.log(error);

      alert(
        error.message ||
          "Verification failed"
      );

    } finally {

      setLoading(false);

    }
  };

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

//   const handleStartMatching = async () => {

//     try {

//       setLoading(true);

//       const payload = {
//   uploadedData: filteredData,
//   selectedFields: selectedColumns,
//   format,
//   fromDate,
//   toDate,
// };

//       // const payload = {
//       //   uploadedData,
//       //   selectedFields: selected,
//       //   format,
//       //   fromDate,
//       //   toDate,
//       // };

//       console.log(payload);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/match`,
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//           },

//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await response.json();

//       console.log(data);

//       let value = 0;

//       const interval = setInterval(() => {

//         value += 10;

//         setProgress(value);

//         if (value >= 100) {

//           clearInterval(interval);

//           router.push("/dashboard/report");
//         }

//       }, 400);

//     } catch (error) {

//       console.log(error);
//     }
//   };

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
                      {selected.includes("All")
  ? "All"
  : selected.join(", ")}
  {/* {selected.length === 0
    ? "-Please Select-"
    : "All"} */}
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
    disabled={loading}
    onClick={() => {
      if (step === 1) {
        router.back();
      } else {
        setStep((s) => s - 1);
      }
    }}
    className="
      px-10 py-3
      border border-blue-500
      text-blue-500
      rounded-xl
      cursor-pointer
      disabled:opacity-50
    "
  >
    ← Back
  </button>

  {step === 3 && (
    <button
      disabled={loading}
      onClick={handleCreate}
      className="
        px-10 py-3
        bg-red-600
        hover:bg-red-700
        text-white
        rounded-xl
        font-medium
        shadow-md
        transition-all
        cursor-pointer
        disabled:opacity-50
      "
    >
      {loading ? "Creating..." : "Create →"}
    </button>
  )}

  <button
    disabled={loading}
    onClick={() => {
      if (step === 3) {
        handleStartMatching();
      } else if (step === 1) {
        setShowPreview(true);
      } else {
        setStep((s) => s + 1);
      }
    }}
    className="
      px-10 py-3
      bg-blue-600
      hover:bg-blue-700
      text-white
      rounded-xl
      font-medium
      cursor-pointer
      disabled:opacity-50
    "
  >
    {step === 3
      ? loading
        ? "Matching..."
        : "Start Matching →"
      : "Next →"}
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
    max-w-5xl
    h-[630px]
    bg-[var(--card)]
    border border-[var(--border)]
    rounded-[32px]
    shadow-2xl
    overflow-hidden
  "
>

        {/* HEADER */}
      <div className="relative overflow-hidden border-b border-[var(--border)]">

  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

  <div className="relative px-8 py-7">

    <button
      onClick={onClose}
      className="
        absolute
        top-6
        right-6
        w-10 h-10
        rounded-xl
        bg-white
        dark:bg-slate-800
        border border-[var(--border)]
        flex items-center justify-center
        hover:scale-105
        transition-all
        shadow-sm
        cursor-pointer
      "
    >
      ✕
    </button>

    <div className="flex items-center gap-5">

      <div
        className="
          h-16 w-16
          rounded-3xl
          bg-blue-100
          dark:bg-blue-900/30
          flex items-center justify-center
          text-3xl
        "
      >
        ✓
      </div>

      <div>

        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          Verify Matching Configuration
        </h2>

        <p className="text-[15px] text-[var(--foreground)]/60 mt-1">
          Review selected fields before proceeding to blockchain matching
        </p>

      </div>

    </div>

  </div>

</div>

        {/* BODY */}
<div
  className="
    p-4
    h-[420px]
    overflow-y-auto
    overflow-x-hidden
    hide-scrollbar
  "
>
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
          <div className="grid grid-cols-3 gap-5 mb-8">

  <div className="rounded-[28px] p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100">

    <div className="flex justify-between items-center">

      <div>
        <p className="text-sm text-slate-500">
          Selected Fields
        </p>

        <h3 className="text-4xl font-bold text-blue-700 mt-3">
          {selectedFields.length}
        </h3>
      </div>

      <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-3xl">
        🏷️
      </div>

    </div>

  </div>

  <div className="rounded-[28px] p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-100">

    <div className="flex justify-between items-center">

      <div>
        <p className="text-sm text-slate-500">
          Preview Records
        </p>

        <h3 className="text-4xl font-bold text-green-700 mt-3">
          {previewRows.length}
        </h3>
      </div>

      <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-3xl">
        👁️
      </div>

    </div>

  </div>

  <div className="rounded-[28px] p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-100">

    <div className="flex justify-between items-center">

      <div>
        <p className="text-sm text-slate-500">
          Total Records
        </p>

        <h3 className="text-4xl font-bold text-purple-700 mt-3">
          {uploadedData?.data?.length || 0}
        </h3>
      </div>

      <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-3xl">
        📊
      </div>

    </div>

  </div>

</div>

          {/* TABLE */}
        {/* TABLE SECTION */}
<div
  className="
    rounded-[30px]
    overflow-hidden
    border border-[var(--border)]
    bg-white
    dark:bg-slate-900
    shadow-sm
  "
>

  {/* TABLE HEADER */}
  <div
    className="
      px-6 py-5
      border-b border-[var(--border)]
      bg-gradient-to-r
      from-slate-50
      to-blue-50
      dark:from-slate-800
      dark:to-slate-900
    "
  >

    <div className="flex items-center justify-between">

      <div>

        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          Data Preview
        </h3>

        <p className="text-sm text-[var(--foreground)]/60 mt-1">
          Preview uploaded records before blockchain matching
        </p>

      </div>

      <div
        className="
          h-12 w-12
          rounded-2xl
          bg-white
          dark:bg-slate-800
          shadow-sm
          flex items-center justify-center
          text-xl
        "
      >
        📊
      </div>

    </div>

  </div>

  {/* TABLE */}
  <div
    className="
      overflow-auto
      max-h-[420px]
      hide-scrollbar
    "
  >

    <table className="w-full">

      <thead className="sticky top-0 z-20 bg-white dark:bg-slate-900">

        <tr>

          {selectedFields.map((field: string) => (

            <th
              key={field}
              className="
                px-5 py-4
                text-left
                text-xs
                uppercase
                tracking-widest
                font-bold
                text-slate-600
                border-b
                border-[var(--border)]
                whitespace-nowrap
              "
            >
              {field}
            </th>

          ))}

        </tr>

      </thead>

      <tbody>

        {previewRows.map(
          (row: any, index: number) => (

            <tr
              key={index}
              className="
                hover:bg-blue-50/40
                dark:hover:bg-slate-800/40
                transition-colors
              "
            >

              {selectedFields.map(
                (field: string) => (

                  <td
                    key={field}
                    className="
                      px-5 py-4
                      text-sm
                      border-b
                      border-[var(--border)]
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
    border-t border-[var(--border)]
    bg-gradient-to-r
    from-slate-50
    via-white
    to-blue-50
    dark:from-slate-900
    dark:via-slate-900
    dark:to-slate-800
    px-6 py-4
    flex items-center justify-between
  "
>

  <div className="flex items-center gap-3">

    <div
      className="
        h-10 w-10
        rounded-2xl
        bg-blue-100
        dark:bg-blue-900/30
        flex items-center justify-center
      "
    >
      ✅
    </div>

    <div>

      <p className="font-medium text-[var(--foreground)]">
        Matching Configuration Ready
      </p>

      <p className="text-sm text-[var(--foreground)]/60">
        Verify selected fields before blockchain matching.
      </p>

    </div>

  </div>

  <button
    onClick={onConfirm}
    className="
      px-7 py-3
      rounded-2xl
      bg-gradient-to-r
      from-blue-600
      to-blue-700
      hover:from-blue-700
      hover:to-blue-800
      text-white
      font-semibold
      shadow-lg
      hover:shadow-xl
      hover:-translate-y-0.5
      transition-all
      cursor-pointer
    "
  >
    Confirm & Continue →
  </button>

</div>

      </div>

    </div>
  );
}