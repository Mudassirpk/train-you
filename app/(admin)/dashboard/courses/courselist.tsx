import React from "react";
import Course from "./course";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/loading";
import { useSession } from "next-auth/react";

type Props = {};

function CourseList({}: Props) {
  const session = useSession();

  const { data, isFetching } = useQuery({
    queryKey: ["get-users-courses"],
    queryFn: async () =>
      await axios.get(
        `/api/course/get-courses${
          session.data?.user.role === "student"
            ? "/" + session.data.user._id
            : ""
        }`
      ),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full flex-1 overflow-y-scroll p-2 flex flex-col gap-2 items-center">
      {isFetching ? (
        <Loading />
      ) : (
        data?.data.courses.map(
          (course: {
            thumbnail: string;
            title: string;
            _id: string;
            description: string;
          }) => (
            <Course
              _id={course._id}
              thumbnail={course.thumbnail}
              key={course._id}
              description={course.description}
              title={course.title}
            />
          )
        )
      )}
    </div>
  );
}

export default CourseList;
