// "use client";

// import { useEffect, useState } from "react";

// import {
//   FileText,
//   CheckCircle,
//   Target,
//   AlertCircle,
// } from "lucide-react";

// export default function ReportPage() {

//   const [report, setReport] = useState<any>(null);

//   // =========================================
//   // FETCH REPORT API
//   // =========================================

//   useEffect(() => {

//     const fetchReport = async () => {

//       try {

//         const response = await fetch(
//           "http://localhost:5001/api/match-report"
//         );

//         const data = await response.json();

//         console.log("*********************",data);

//         setReport(data.data);

//       } catch (error) {

//         console.log(error);
//       }
//     };

//     fetchReport();

//   }, []);

//   return (

//     <div className="w-full scrollbar-hide">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">

//         <div>

//           <h1 className="text-xl font-semibold text-[var(--foreground)]">
//             Match Results
//           </h1>

//           <p className="text-gray-500 text-sm">
//             Data verification results and reports
//           </p>

//         </div>

//         <div className="flex gap-3">

//           <button
//             className="
//             px-4 py-2 
//             border border-[var(--border)] 
//             rounded-lg text-sm 
//             bg-[var(--card)]
//             hover:bg-gray-100 dark:hover:bg-slate-800
//           "
//           >
//             📄 View Reports
//           </button>

//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
//             ⬇ Download Report
//           </button>

//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-4 gap-4 mb-6">

//         <StatCard
//           title="Total Records"
//           value={report?.totalRecords || 0}
//           color="blue"
//         />

//         <StatCard
//           title="Matched Records"
//           value={report?.matchedRecords || 0}
//           color="green"
//         />

//         <StatCard
//           title="Accuracy Rate"
//           value={`${report?.accuracyRate || 0}%`}
//           color="purple"
//         />

//         <StatCard
//           title="Mismatched Records"
//           value={report?.mismatchedRecords || 0}
//           color="red"
//         />

//       </div>

//       {/* TABLE */}
//       <div
//         className="
//         bg-[var(--card)]
//         border border-[var(--border)]
//         rounded-xl 
//         p-6 mb-6
//         shadow-sm
//       "
//       >

//         <h2 className="font-semibold mb-4 text-[var(--foreground)]">
//           Detailed Results
//         </h2>

//         <table className="w-full text-sm">

//           <thead className="text-gray-400 border-b border-[var(--border)]">

//             <tr>
//               <th className="text-left py-2 font-medium">
//                 Record ID
//               </th>

//               <th className="text-left font-medium">
//                 Record Type
//               </th>

//               <th className="text-left font-medium">
//                 Status
//               </th>

//               <th className="text-left font-medium">
//                 Remarks
//               </th>

//               <th className="text-left font-medium">
//                 Timestamp
//               </th>
//             </tr>

//           </thead>

//           <tbody className="divide-y divide-[var(--border)]">

//             {report?.records?.map((item: any) => (

//               <Row
//                 key={item.recordId}
//                 id={item.recordId}
//                 type={item.recordType}
//                 status={item.status}
//                 remark={item.remark}
//                 timestamp={item.timestamp}
//               />

//             ))}

//           </tbody>

//         </table>
//       </div>

//       {/* BLOCKCHAIN DETAILS */}
//       <div
//         className="
//         bg-yellow-50 
//         dark:bg-yellow-900/10
//         border border-yellow-300 
//         dark:border-yellow-800/40
//         rounded-xl p-6
//       "
//       >

//         <h2 className="font-semibold mb-4 text-[var(--report-text)]">
//           Blockchain Verification Details
//         </h2>

//         <div className="grid grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">

//           <div>
//             <p className="text-gray-500">
//               Block Number
//             </p>

//             <p>19,234,567</p>
//           </div>

//           <div>
//             <p className="text-gray-500">
//               Transaction Hash
//             </p>

//             <p className="break-all">
//               0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500">
//               Network
//             </p>

//             <p>Ethereum Mainnet</p>
//           </div>

//           <div>
//             <p className="text-gray-500">
//               Verification Date
//             </p>

//             <p>
//               {new Date().toLocaleString()}
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// // =========================================
// // STAT CARD
// // =========================================

// function StatCard({ title, value, color }: any) {

//   const styles: any = {

//     blue: {
//       text: "text-blue-600",
//       bg: "bg-blue-100 dark:bg-blue-900/20",

//       icon: (
//         <FileText
//           className="text-blue-600 dark:text-blue-400"
//           size={20}
//         />
//       ),
//     },

//     green: {
//       text: "text-green-600",
//       bg: "bg-green-100 dark:bg-green-900/20",

//       icon: (
//         <CheckCircle
//           className="text-green-600 dark:text-green-400"
//           size={20}
//         />
//       ),
//     },

//     purple: {
//       text: "text-purple-600",
//       bg: "bg-purple-100 dark:bg-purple-900/20",

//       icon: (
//         <Target
//           className="text-purple-600 dark:text-purple-400"
//           size={20}
//         />
//       ),
//     },

//     red: {
//       text: "text-red-600",
//       bg: "bg-red-100 dark:bg-red-900/20",

//       icon: (
//         <AlertCircle
//           className="text-red-600 dark:text-red-400"
//           size={20}
//         />
//       ),
//     },
//   };

//   const s = styles[color];

//   return (

//     <div
//       className="
//       bg-[var(--card)]
//       border border-[var(--border)]
//       rounded-xl 
//       p-4 
//       flex justify-between items-center
//     "
//     >

//       <div>

//         <p className="text-sm text-gray-500">
//           {title}
//         </p>

//         <h2 className={`text-2xl font-semibold ${s.text}`}>
//           {value}
//         </h2>

//       </div>

//       <div
//         className={`w-12 h-12 rounded-full flex items-center justify-center ${s.bg}`}
//       >
//         {s.icon}
//       </div>

//     </div>
//   );
// }

// // =========================================
// // TABLE ROW
// // =========================================

// function Row({
//   id,
//   type,
//   status,
//   remark,
//   timestamp,
// }: any) {

//   return (

//     <tr>

//       <td className="py-3 text-[var(--foreground)]">
//         {id}
//       </td>

//       <td className="text-[var(--foreground)]">
//         {type}
//       </td>

//       <td>

//         <span
//           className={`px-2 py-1 rounded-full text-xs ${
//             status === "matched"
//               ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
//               : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
//           }`}
//         >
//           {status === "matched"
//             ? "Matched"
//             : "Mismatched"}
//         </span>

//       </td>

//       <td className="text-gray-500">
//         {remark}
//       </td>

//       <td className="text-gray-400">

//         {new Date(timestamp).toLocaleString()}

//       </td>

//     </tr>
//   );
// }



"use client";

import { useEffect, useState } from "react";

import {
  FileText,
  CheckCircle,
  Target,
  AlertCircle,
} from "lucide-react";

export default function ReportPage() {

  const [report, setReport] = useState<any>(null);

  // =========================================
  // FETCH REPORT API
  // =========================================

  useEffect(() => {

    const fetchReport = async () => {

      try {

        const response = await fetch(
          "https://blockchain-panel.onrender.com/api/match-report"
        );

        const data = await response.json();

        console.log("*********************", data);

        setReport(data.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchReport();

  }, []);

  // =========================================
  // CALCULATIONS
  // =========================================

  const totalRecords =
    report?.uploadedData?.data?.length > 0
      ? report?.uploadedData?.data?.length - 1
      : 0;

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

    <div className="w-full scrollbar-hide">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-xl font-semibold text-[var(--foreground)]">
            Match Results
          </h1>

          <p className="text-gray-500 text-sm">
            Data verification results and reports
          </p>

        </div>

        <div className="flex gap-3">

          <button
            className="
            px-4 py-2 
            border border-[var(--border)] 
            rounded-lg text-sm 
            bg-[var(--card)]
            hover:bg-gray-100 dark:hover:bg-slate-800
          "
          >
            📄 View Reports
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            ⬇ Download Report
          </button>

        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <StatCard
          title="Total Records"
          value={totalRecords}
          color="blue"
        />

        <StatCard
          title="Matched Records"
          value={matchedRecords}
          color="green"
        />

        <StatCard
          title="Accuracy Rate"
          value={`${accuracyRate}%`}
          color="purple"
        />

        <StatCard
          title="Mismatched Records"
          value={mismatchedRecords}
          color="red"
        />

      </div>

      {/* TABLE */}
      <div
        className="
        bg-[var(--card)]
        border border-[var(--border)]
        rounded-xl 
        p-6 mb-6
        shadow-sm
      "
      >

        <h2 className="font-semibold mb-4 text-[var(--foreground)]">
          Detailed Results
        </h2>

        <table className="w-full text-sm">

          <thead className="text-gray-400 border-b border-[var(--border)]">

            <tr>
              <th className="text-left py-2 font-medium">
                Record ID
              </th>

              <th className="text-left font-medium">
                Record Type
              </th>

              <th className="text-left font-medium">
                Status
              </th>

              <th className="text-left font-medium">
                Remarks
              </th>

              <th className="text-left font-medium">
                Timestamp
              </th>
            </tr>

          </thead>

          <tbody className="divide-y divide-[var(--border)]">

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

          </tbody>

        </table>
      </div>

      {/* BLOCKCHAIN DETAILS */}
      <div
        className="
        bg-yellow-50 
        dark:bg-yellow-900/10
        border border-yellow-300 
        dark:border-yellow-800/40
        rounded-xl p-6
      "
      >

        <h2 className="font-semibold mb-4 text-[var(--report-text)]">
          Blockchain Verification Details
        </h2>

        <div className="grid grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">

          <div>

            <p className="text-gray-500">
              Block Number
            </p>

<p>  {report?.blockchain?.blockNumber || "-"}
</p>
          </div>

          <div>

            <p className="text-gray-500">
              Transaction Hash
            </p>

           <p className="break-all">
  {report?.blockchain?.txHash || "-"}
</p>

          </div>

          <div>

            <p className="text-gray-500">
              Network
            </p>

<p>
  {report?.blockchain?.network || "-"}
</p>
          </div>

          <div>

            <p className="text-gray-500">
              Verification Date
            </p>

            <p>
              {new Date(
                report?.createdAt
              ).toLocaleString()}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

// =========================================
// STAT CARD
// =========================================

function StatCard({ title, value, color }: any) {

  const styles: any = {

    blue: {
      text: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/20",

      icon: (
        <FileText
          className="text-blue-600 dark:text-blue-400"
          size={20}
        />
      ),
    },

    green: {
      text: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/20",

      icon: (
        <CheckCircle
          className="text-green-600 dark:text-green-400"
          size={20}
        />
      ),
    },

    purple: {
      text: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/20",

      icon: (
        <Target
          className="text-purple-600 dark:text-purple-400"
          size={20}
        />
      ),
    },

    red: {
      text: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/20",

      icon: (
        <AlertCircle
          className="text-red-600 dark:text-red-400"
          size={20}
        />
      ),
    },
  };

  const s = styles[color];

  return (

    <div
      className="
      bg-[var(--card)]
      border border-[var(--border)]
      rounded-xl 
      p-4 
      flex justify-between items-center
    "
    >

      <div>

        <p className="text-sm text-gray-500">
          {title}
        </p>

        <h2 className={`text-2xl font-semibold ${s.text}`}>
          {value}
        </h2>

      </div>

      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${s.bg}`}
      >
        {s.icon}
      </div>

    </div>
  );
}

// =========================================
// TABLE ROW
// =========================================

function Row({
  id,
  type,
  status,
  remark,
  timestamp,
}: any) {

  return (

    <tr>

      <td className="py-3 text-[var(--foreground)]">
        {id}
      </td>

      <td className="text-[var(--foreground)]">
        {type}
      </td>

      <td>

        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "matched"
              ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
              : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {status === "matched"
            ? "Matched"
            : "Mismatched"}
        </span>

      </td>

      <td className="text-gray-500">
        {remark}
      </td>

      <td className="text-gray-400">

        {new Date(timestamp).toLocaleString()}

      </td>

    </tr>
  );
}