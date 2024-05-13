"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loading from "@/components/loading";
import { Separator } from "@/components/ui/separator";
import DashboardCard from "@/components/dashboard/dashboardCard";
import BestSelling from "@/components/dashboard/bestSelling";
import LatestEvent from "@/components/dashboard/latestevent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDate } from "@/lib/utils";
import dayjs from "dayjs";

export default function Dashboard() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") return <Loading />;

  // query for teacher states
  const { data: teacherStates, isFetching: fetchingTeacherStates } = useQuery({
    queryKey: ["get-states-student"],
    queryFn: async () =>
      await axios.get(`/api/states/teacher/${data?.user._id}`),
    enabled: data?.user.role === "teacher",
  });

  // query for student states
  const { data: studentStates, isFetching: fetchingStudentStates } = useQuery({
    queryKey: ["get-states-student"],
    queryFn: async () => await axios.get(`/api/states/${data?.user._id}`),
    enabled: data?.user.role === "student",
  });

  return (
    <main className="flex-1 h-screen py-4 pr-4">
      <section className="w-full h-full p-2 rounded-lg border-2 border-indigo-600">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-indigo-600 font-semibold py-1 px-2">
            Dashboard
          </h1>
          <div className="flex items-center gap-2 font-semibold">
            <p className="text-indigo-900">Signed In as</p>{" "}
            <p className="px-2 capitalize py-1 bg-indigo-100 text-indigo-900 rounded-lg">
              {(data?.user as any).role}
            </p>
          </div>
        </div>
        <Separator className="my-2" />

        {fetchingStudentStates || fetchingTeacherStates ? (
          <Loading message="Fetching courses" />
        ) : (
          <div className="w-full grid gap-2 grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
            <DashboardCard
              title={`${
                data?.user.role === "teacher" ? "Courses" : "Courses Enrolled"
              }`}
              stats={
                data?.user.role === "student"
                  ? studentStates?.data?.states.coursesEnrolled
                  : teacherStates?.data.states.coursesCreated
              }
              date={"till " + formatDate(dayjs().toString())}
            />{" "}
            {data?.user.role === "teacher" ? (
              <>
                <DashboardCard
                  title="Enrollments"
                  date="For month of July"
                  stats={teacherStates?.data.states.enrollments}
                />
                <DashboardCard
                  stateSize="2xl"
                  title="Earnings"
                  stats={teacherStates?.data.states.earnings.amount}
                  date={`For month of ${teacherStates?.data.states.earnings.month}`}
                  unit={{ title: "RS ", position: "left" }}
                />
                <BestSelling course={teacherStates?.data.states.bestSelling} />
              </>
            ) : null}
            <LatestEvent
              event={
                studentStates?.data.states.latestEvent ||
                teacherStates?.data.states.latestEvent
              }
            />
          </div>
        )}
      </section>
    </main>
  );
}
