"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loading from "@/app/(admin)/dashboard/loading";

export default function Dashboard() {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") return <Loading />;
  return <main className="flex-1">Dashboard</main>;
}
