export default function ImportantInfo() {
  return (
    <div
      className="
        mt-8
        bg-[var(--infos)]

        border border-blue-200 

        rounded-[25px]
        p-6
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[var(--infos-text)] text-lg">ℹ️</span>
        <h3 className="text-[var(--infos-text)] dark:text-blue-300 font-semibold">
          Important Information
        </h3>
      </div>

      {/* LIST */}
      <ul className="space-y-2 text-sm text-[var(--infos-text)]  list-disc pl-6">
        <li>
          All uploaded files are encrypted and stored securely on the blockchain
        </li>
        <li>
          Files are automatically scanned for malware before processing
        </li>
        <li>
          Data verification typically takes 2–5 minutes to complete
        </li>
        <li>
          You will receive a notification once the verification is complete
        </li>
      </ul>
    </div>
  );
}