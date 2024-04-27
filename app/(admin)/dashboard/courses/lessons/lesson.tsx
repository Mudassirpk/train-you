"use client";
import React, { useState } from "react";
import Image from "next/image";
import MediaPreview from "@/components/media-preview";
import MediaGrid from "@/components/media-grid";
type Props = { lesson: any };

function Lesson({ lesson }: Props) {
  const [detailsOpened, setDetailsOpened] = useState(false);

  return (
    <div className="w-full bg-gray-100 rounded-xl gap-2 flex flex-col items-center overflow-hidden p-1">
      <div className="w-full flex gap-2 items-center border-b-2 mb-2 pb-2 border-white">
        <div className="w-[50px] h-[50px] relative rounded-xl overflow-hidden">
          <Image
            alt="lesson-thumbnail"
            src={lesson.thumbnail}
            className="object-cover"
            fill={true}
          />
        </div>
        <div className="flex-1 flex justify-between items-center">
          <p className="font-semibold text-gray-800">{lesson.title}</p>
          <button
            onClick={() => setDetailsOpened(!detailsOpened)}
            className="p-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-500"
          >
            Details
          </button>
        </div>
      </div>
      {detailsOpened ? (
        <div className="bg-white w-full p-2 rounded-xl overflow-hidden">
          {/* <MediaPreview
            media={{ url: lesson.thumbnail, type: "image" }}
            sourceAsUrl={true}
          /> */}
          <p className="mb-1 mt-4 px-2 text-xl font-semibold text-gray-800">
            {lesson.title}
          </p>
          <p className="text-lg text-gray-700 px-2">{lesson.description}</p>

          <div className="w-full">
            <h3 className="my-2 font-semibold text-indigo-600">
              Course content
            </h3>
            <MediaGrid
              media={[].concat(
                lesson.mediaId.videos.map((video: any) => {
                  return { ...video, type: "video" };
                }),
                lesson.mediaId.images.map((image: any) => {
                  return { ...image, type: "image" };
                })
              )}
              sourceAsUrl={true}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Lesson;
