// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export default async function HomePage() {
//   const cookieStore = await cookies(); // 👈 important
//   const token = cookieStore.get("token");

//   if (token) {
//     redirect("/dashboard");
//   } else {
//     redirect("/login");
//   }
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, []);

  return null;
}