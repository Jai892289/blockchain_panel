export default function UploadContainer({ children }: any) {
  return (
    <div
      className="
        bg-[var(--card)]
        border border-[var(--border)]
        rounded-[30px]
        p-8
        shadow-sm
        dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
      "
    >
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-[20px] font-semibold text-[var(--foreground)]">
          Upload Data
        </h2>
        <p className="text-sm text-gray-500">
          Upload your data files for blockchain verification
        </p>
      </div>

      {/* INNER CARD */}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}