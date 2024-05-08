import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
};

function Course({ id, title, thumbnail, description }: Props) {
  return (
    <div className="w-full flex items-center gap-4 shadow-gray-200 shadow-sm rounded-xl">
      <div className="w-[80px] h-[80px] rounded-xl overflow-hidden relative">
        <Image
          src={thumbnail}
          alt="course-image"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex justify-between items-center pr-4">
        <div>
          <p className="font-semibold capitalize">{title}</p>
          <p>{description}</p>
        </div>
        <Link href={`/details/${id}`} className="px-2 py-1 rounded-xl hover:bg-indigo-500 bg-indigo-600 text-white">Enroll</Link>
      </div>
    </div>
  );
}

export default Course;
