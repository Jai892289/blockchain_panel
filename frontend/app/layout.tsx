import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Poppins } from "next/font/google"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
            <body className={`${poppins.variable} font-sans min-h-screen overflow-x-hidden`}>

      {/* <body className="h-screen overflow-hidden"> */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}