import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  thumbnail: string;
  description: string;
};

function Course({ title, thumbnail, description }: Props) {
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
      <div className="flex-1">
        <p className="font-semibold capitalize">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Course;
