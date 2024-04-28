"use client";
import React, { useState } from "react";
import Image from "next/image";
import MediaPreview from "@/components/media-preview";
import MediaGrid from "@/components/media-grid";
import ConfirmDelete from "@/components/confirmDelete";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/providers/queryprovider";
type Props = { lesson: any };

function Lesson({ lesson }: Props) {
  const [detailsOpened, setDetailsOpened] = useState(false);
  const { toast } = useToast();

  const { mutate: deleteMedia, status: deleteMediaStatus } = useMutation({
    mutationKey: ["delete-media"],
    mutationFn: async ({ urls }: { urls: string[] }) =>
      await axios.delete("/api/uploadthing", { data: { urls } }),
    onSuccess(data) {
      if (data?.data.success) {
        toast({
          title: "Delete Lesson",
          description: "Lesson deleted successfully",
        });
        client.invalidateQueries({ queryKey: ["get-lessons"] });
      }
    },
  });

  const {
    mutate: deleteLesson,
    status,
    reset,
  } = useMutation({
    mutationKey: ["delete-lesson"],
    mutationFn: async () =>
      await axios.post("/api/course/delete-lesson", { lessonId: lesson._id }),
    onSuccess(data) {
      if (data?.data.success) {
        reset();
        deleteLessonMedia();
      }
    },
  });

  function deleteLessonMedia() {
    const urls = [lesson.thumbnail];

    for (let video of lesson.mediaId.videos) {
      urls.push(video.url);
    }
    for (let image of lesson.mediaId.images) {
      urls.push(image.url);
    }

    deleteMedia({ urls });
  }

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
          <div className="flex-1 flex justify-end items-center gap-2">
            <ConfirmDelete
              onConfirm={deleteLesson}
              status={status === "idle" ? deleteMediaStatus : status}
              item={lesson.title}
            />
            <button
              onClick={() => setDetailsOpened(!detailsOpened)}
              className="p-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-500"
            >
              Details
            </button>
          </div>
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
