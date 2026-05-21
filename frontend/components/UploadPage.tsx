"use client";
import { useState } from "react";
  import { useRouter } from "next/navigation";

function ProcessingModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      
      {/* OPTIONAL BACKDROP */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* MODAL */}
      <div className="relative bg-white w-[350px] h-[250px] rounded-2xl flex flex-col items-center justify-center shadow-lg">

        {/* ANIMATED CIRCLE */}
        <div className="relative w-20 h-20 mb-6">
          
          <div className="absolute inset-0 rounded-full bg-blue-100"></div>

          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute bottom-0 w-full bg-blue-600 animate-fill"></div>
          </div>
        </div>

        <p className="text-xs tracking-widest text-gray-600 text-center">
          DATA UPLOADING TO BLOCKCHAIN
        </p>
      </div>
    </div>
  );
}


export default function UploadPages() {
  const [status, setStatus] = useState<"idle" | "uploaded" | "processing" | "done">("idle");

  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    setStatus("uploaded");
  };


const router = useRouter();

const handleSubmit = async () => {
  if (!file) return;

  try {
    setStatus("processing");

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      "http://localhost:5001/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log(data);

    // SAVE DATA
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

// const handleSubmit = () => {
//   setStatus("processing");

//   setTimeout(() => {
//     setStatus("done");

//     // 👉 Navigate to match page
//     router.push("/dashboard/match");
//   }, 3000);
// };


  return (
    <div className="">
      {/* UPLOAD BOX */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold">File Upload</h3>
        <p className="text-sm text-gray-400 mt-2">
          Supported formats: XLS, CSV, SQL - Maximum file size: 50MB
        </p>

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
  className="mt-6 border-2 border-dashed border-blue-200 rounded-2xl p-10 text-center"
>
  {/* Hidden input */}
  <input
    type="file"
    accept=".pdf,.csv,.xls,.xlsx"
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

  {/* UI */}
  <p className="text-gray-500 mb-3">Drag and drop your files here</p>

<label
  htmlFor="fileUpload"
  className="
    inline-flex items-center gap-2
    px-5 py-2.5 
    rounded-xl 
    text-sm font-medium

    bg-blue-600 text-white
    hover:bg-blue-700

    shadow-sm
    transition-all duration-200
    cursor-pointer

    dark:bg-blue-500 dark:hover:bg-blue-600
  "
>
  📁 Browse Files
</label>

  <p className="text-xs text-gray-400 mt-3">
    Supported formats: XLS, XLSX, CSV, SQL
  </p>
</div>
      </div>

      {/* FILE CARD */}
   {status === "uploaded" && file && (
  <>
    <div className="bg-gray-50 border rounded-xl p-4 flex justify-between items-center mb-6">
      
      <div className="flex items-center gap-3">
        
        {/* FILE TYPE BADGE */}
        <div className="bg-red-500 text-white px-2 py-1 text-xs rounded uppercase">
          {file.name.split(".").pop()}
        </div>

        {/* FILE INFO */}
        <div>
          <p className="text-sm font-medium text-black">{file.name}</p>
          <p className="text-xs text-gray-700">
            {(file.size / 1024).toFixed(1)} KB – 100% uploaded
          </p>
        </div>
      </div>

      {/* STATUS */}
      <div className="flex items-center gap-3 ">
        <span className="text-green-600 text-sm">✔ Success</span>

        {/* REMOVE FILE */}
        <button
          onClick={() => {
            setFile(null);
            setStatus("idle");
          }}
          className="text-gray-400 hover:text-red-500 text-lg cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>

    <button
      onClick={handleSubmit}
      className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer"
    >
      Upload your Data
    </button>
  </>
)}

      {/* PROCESS MODAL */}
      {status === "processing" && <ProcessingModal />}
    </div>
  );
}