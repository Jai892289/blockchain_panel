import UploadContainer from "@/components/UploadContainer";
import ImportantInfo from "@/components/UploadInformation";
import UploadPages from "@/components/UploadPage";

export default function UploadPage() {
  return (
    <div className="overflow-hidden scrollbar-hide p-4 bg-[var(--background)] min-h-screen">
    <UploadContainer >
       <UploadPages />

      </UploadContainer>
      <ImportantInfo />
    </div>
  )
}