"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/app/(admin)/dashboard/loading";
import { Separator } from "@/components/ui/separator";
import DashboardCard from "@/components/dashboard/dashboardCard";
import BestSelling from "@/components/dashboard/bestSelling";
import LatestEvent from "@/components/dashboard/latestevent";

export default function Dashboard() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") return <Loading />;
  
  return (
    <main className="flex-1 h-screen py-4 pr-4">
      <section className="w-full h-full p-2 rounded-lg border-2 border-indigo-600">
        <h1 className="text-2xl text-indigo-600 font-semibold py-1 px-2">
          Dashboard
        </h1>
        <Separator className="my-2" />

        <div className="w-full grid gap-2 grid-cols-3">
          <DashboardCard title="Courses" stats={19} date="till 2 June, 2024" />{" "}
          <DashboardCard
            title="Enrollments"
            date="For month of July"
            stats={55}
          />{" "}
          <DashboardCard
            title="Earnings"
            stats={55}
            date="For month of July "
            unit={{ title: "RS", position: "left" }}
          />{" "}
          <BestSelling />
          <LatestEvent />
        </div>
      </section>
    </main>
  );
}
