"use client";
import Loading from "@/components/loading";
import MediaGrid from "@/components/media-grid";
import MediaPreview from "@/components/media-preview";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Lesson from "./lesson";
import AddLesson from "@/components/Courses/addLesson";

export default function Lessions() {
  const searchParams = useSearchParams();

  console.log("course id:", searchParams.get("courseId"));

  const { data, isFetching } = useQuery({
    queryKey: ["get-lessons"],
    queryFn: async () =>
      await axios.get(
        `/api/course/get-lessons/${searchParams.get("courseId")}`
      ),
  });

  console.log(
    data?.data.lessons[0].mediaId.videos.map((video: any) => {
      return { ...video, type: "video" };
    })
  );

  return (
    <section className="w-full">
      <div className="w-full flex justify-between items-center">
        <h2 className="w-full text-2xl text-indigo-600 font-semibold">
          Lessons
        </h2>
        <AddLesson />
      </div>
      <div className="w-full flex flex-col gap-2">
        {isFetching ? (
          <Loading message="fetching lessons" />
        ) : (
          <div className="w-full p-2 flex flex-col gap-2">
            {data?.data.lessons.map((lesson: any) => {
              return <Lesson lesson={lesson} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}
