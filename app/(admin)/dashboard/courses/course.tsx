"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  thumbnail: string;
  _id: string;
};

function Course({ title, description, thumbnail, _id }: Props) {
  return (
    <div className="w-full p-2 rounded-lg shadow-sm shadow-gray-400 border-t border-indigo-600 flex gap-2 items-center ">
      <div className="h-16 w-16 relative rounded-lg overflow-hidden">
        <Image
          alt="course-image"
          src={thumbnail}
          fill={true}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex flex-col flex-1">
        <p className="font-semibold ">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      <Link
        href={`/dashboard/courses/${_id}`}
        className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
      >
        Details
      </Link>
    </div>
  );
}

export default Course;
