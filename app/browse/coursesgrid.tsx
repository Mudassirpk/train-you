"use client";
import CourseCard from "@/components/Courses/CourseCard";
import Loading from "@/components/loading";
import Message from "@/components/message";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function CoursesGrid() {

  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const { data, isFetching } = useQuery({
    queryKey: ["get-public-courses"],
    queryFn: async () =>
      await axios.get(
        `/api/course/get-courses?is_public=true${
          query ? "&query=" + query : ""
        }`
      ),
  });

  return isFetching ? (
    <div className="w-full text-center mb-4">
      <Loading message="Fetching courses" />
    </div>
  ) : (
    <div
      className={
        "w-full my-6 gap-2 grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
      }
    >
      {data?.data.courses.length > 0 ? (
        data?.data.courses.map((course: any) => {
          return (
            <CourseCard
              key={course._id}
              courseId={course._id}
              title={course.title}
              description={course.description}
              thumbnail={course.thumbnail}
            />
          );
        })
      ) : (
        <div className="w-full text-center">
          <Message
            size="lg"
            message={`No course found ${
              searchParams.get("query")
                ? "for query " + searchParams.get("query")
                : ""
            }`}
          />
        </div>
      )}
    </div>
  );
}
