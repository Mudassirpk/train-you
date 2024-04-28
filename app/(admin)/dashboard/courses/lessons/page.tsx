"use client";
import Loading from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Lesson from "./lesson";
import AddLesson from "@/components/Courses/addLesson";
import { CTC } from "@/lib/utils";

export default function Lessions() {
  const searchParams = useSearchParams();

  const { data, isFetching } = useQuery({
    queryKey: ["get-lessons"],
    queryFn: async () =>
      await axios.get(
        `/api/course/get-lessons/${searchParams.get("courseId")}`
      ),
  });

  return (
    <section className="w-full h-full flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <h2 className="w-full text-2xl text-indigo-600 font-semibold">
          Lessons
        </h2>
        <AddLesson />
      </div>
      <div
        className={`w-full flex flex-col gap-2 flex-1 overflow-y-scroll ${CTC["scroll-bar"]}`}
      >
        {isFetching ? (
          <Loading message="fetching lessons" />
        ) : (
          <div className="w-full p-2 flex flex-col gap-2">
            {data?.data.lessons.map((lesson: any, index: number) => {
              return <Lesson lesson={lesson} index={index} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}
