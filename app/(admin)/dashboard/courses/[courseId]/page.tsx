"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/loading";
import dayjs from "dayjs";
import MediaGrid from "@/components/media-grid";
import AddLesson from "@/components/Courses/addLesson";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import ConfirmDelete from "@/components/confirmDelete";

type Props = {};

function page({}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { courseId } = useParams();
  const { data, isFetching } = useQuery({
    queryKey: ["single-user-course"],
    queryFn: async () => await axios.get(`/api/course/${courseId}`),
  });

  const { status: deleteCourseMediaStatus, mutate: deleteMedia } = useMutation({
    mutationKey: ["delete-course-media"],
    mutationFn: async ({ urls }: { urls: string[] }) =>
      await axios.delete("/api/uploadthing", {
        data: { urls },
      }),
    onSuccess(data) {
      if (data?.data.success) {
        toast({
          title: "Delete course",
          description: "Course deleted successfully",
        });
        router.push("/dashboard/courses");
      }
    },
  });

  function deleteCourseMedia() {
    const course = data?.data.course;
    const urls = [course.thumbnail];

    for (let video of course.mediaId.videos) {
      urls.push(video.url);
    }
    for (let image of course.mediaId.images) {
      urls.push(image.url);
    }

    deleteMedia({ urls });
  }

  const { status, mutate, reset } = useMutation({
    mutationKey: ["delete-course"],
    mutationFn: async () =>
      await axios.delete(`/api/course/delete?courseId=${courseId}`),
    onSuccess(data) {
      if (data?.data.success) {
        reset();
        deleteCourseMedia();
      }
    },
  });

  return (
    <section className="w-full p-2 h-screen overflow-y-scroll flex flex-col">
      <h3 className="text-semibold text-xl text-indigo-600">Course Details</h3>
      {isFetching ? (
        <Loading />
      ) : (
        <div className="w-full my-2 overflow-y-scroll flex-1">
          <div className="flex gap-4 items-center">
            <div className="relative h-32 w-32 rounded-lg overflow-hidden">
              <Image
                alt="course-image"
                style={{ objectFit: "cover" }}
                src={data?.data.course.thumbnail}
                fill={true}
              />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800">
                {data?.data.course.title}
              </p>
              <p>{data?.data.course.description}</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button className="bg-indigo-800 hover:bg-indigo-600">
                Edit
              </Button>
              <ConfirmDelete
                item={data?.data.course.title}
                status={status === "pending" ? status : deleteCourseMediaStatus}
                onConfirm={mutate}
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center px-2">
            <div className="w-1/2 my-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-indigo-800 text-lg font-semibold ">
                  Created At
                </p>
                <p className="bg-indigo-100 text-indigo-800 px-4 font-semibold py-1 text-lg rounded-full">
                  {dayjs(data?.data.course.createdAt).format("DD/MM/YYYY")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-indigo-800 text-lg font-semibold ">
                  Enrollments
                </p>
                <p className="bg-indigo-100 text-indigo-800 px-4 font-semibold py-1 text-lg rounded-full">
                  {data?.data.course.enrollments.length}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-indigo-800 text-lg font-semibold ">
                  Earnings
                </p>
                <p className="bg-indigo-100 text-indigo-800 px-4 font-semibold py-1 text-lg rounded-full">
                  55000 RS
                </p>
              </div>
            </div>
            <div className="flex justify-between gap-2 items-center">
              <Link
                href={`/dashboard/courses/lessons?courseId=${courseId}`}
                className="bg-indigo-600 py-2 px-4 text-white  rounded-xl hover:bg-indigo-500"
              >
                Lessons
              </Link>
              <AddLesson />
            </div>
          </div>
          <div className="full">
            <MediaGrid
              sourceAsUrl={true}
              media={[].concat(
                data?.data.course.mediaId.videos.map((video: any) => {
                  return { ...video, type: "video" };
                }),
                data?.data.course.mediaId.images.map((image: any) => {
                  return { ...image, type: "image" };
                })
              )}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default page;
