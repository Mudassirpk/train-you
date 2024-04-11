"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  title: string;
  description: string;
  thumbnail: string;
};

function Course({}: Props) {
  const { isFetched, data } = useQuery({
    queryKey: ["get-courses"],
    queryFn: async () => await axios.get("/api/course/get-courses"),
  });

  if (isFetched) console.log(data);

  return (
    <div className="w-full px-2 rounded-lg border-2 border-indigo-600 flex gap-2 items-center ">
      <div className="h-16 w-16 relative rounded-lg overflow-hidden">
        <Image
          alt="course-image"
          src={"/teacher.jpg"}
          fill={true}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex flex-col flex-1">
        <p className="font-semibold ">Learn C++</p>
        <p className="text-sm">Learn c++ and build performant application</p>
      </div>
      <Link
        href={"/dashboard/courses/1"}
        className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
      >
        Details
      </Link>
    </div>
  );
}

export default Course;
