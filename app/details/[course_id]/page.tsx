"use client";
import MediaCarousal from "@/components/Courses/MediaCarousal";
import Ratting from "@/components/Courses/Ratting";
import AddReview from "@/components/Courses/addReview";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Details() {
  const { course_id } = useParams();

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["single-user-course"],
    queryFn: async () => await axios.get(`/api/course/${course_id}`),
  });

  let course;
  if (isFetched && data?.data.success) course = data?.data.course;

  return (
    <main className="px-12 w-full mx-auto h-auto min-h-screen">
      {isFetching ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loading message="Fetching course details" />
        </div>
      ) : (
        <>
          <section className="w-full mt-6 bg-gray-50 px-4 rounded-tr-lg rounded-tl-lg">
            <h2 className="mt-4 mb-6 text-3xl font-semibold pt-4 text-indigo-800">
              Course Details
            </h2>
            <div className="flex w-full sm-lg:w-full md:flex-col shadow-sm rounded-tr-lg rounded-tl-lg gap-4">
              <div className="relative w-[400px] md:h-[300px] md:w-full">
                <Image
                  alt="product-image"
                  src={course.thumbnail}
                  style={{ objectFit: "cover" }}
                  fill={true}
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-indigo-800 md:text-center">
                  {course.title}
                </h2>
                <p className="text-indigo-600 md:text-center">
                  {course.description}
                </p>
                <div className="my-8 flex justify-between items-center">
                  <div>
                    <p className="font-semibold mb-2 text-gray-800 text-lg">
                      Instructor
                    </p>
                    <div className="flex gap-2 items-center">
                      <div className="w-11 h-10 relative overflow-hidden rounded-lg">
                        <Image
                          alt="trainer"
                          style={{ objectFit: "cover" }}
                          src={"/person.jpg"}
                          fill={true}
                        />
                      </div>
                      <p className="font-semibold">{course.teacherId.name}</p>
                    </div>
                  </div>

                  <p className="text-4xl font-semibold text-indigo-400 underline underline-offset-8 mt-4">
                    RS {course.price}
                  </p>
                </div>
                <Button className="bg-gradient-to-r px-4 py-2 rounded-lg from-indigo-800 to-indigo-600 hover:from-indigo-600 hover:to-indigo-800 text-white">
                  Enroll Now
                </Button>
              </div>
            </div>
          </section>

          <div className="w-full bg-gradient-to-b from-gray-50 to-white p-4 rounded-bl-lg rounded-br-lg">
            <p className="text-xl font-semibold text-indigo-800">
              Course Highlights
            </p>
            <div className="w-full px-12">
              <MediaCarousal
                media={[].concat(
                  course.mediaId.images.map((image: any) => {
                    return { url: image.url, type: "image" };
                  }),
                  course.mediaId.videos.map((video: any) => {
                    return { url: video.url, type: "video" };
                  })
                )}
              />
            </div>
          </div>
          <section className="w-full my-6">
            <h3 className="font-semibold text-xl text-indigo-800 my-4">
              Reviews
            </h3>
            <AddReview courseId={course_id as string} />
            <div className="w-full my-6">
              <div className="flex w-full my-4 justify-between">
                <div className="flex gap-2 items-start">
                  <div className="relative w-16 h-14 overflow-hidden rounded-lg">
                    <Image
                      alt="commentor"
                      style={{ objectFit: "cover" }}
                      src={"/person.jpg"}
                      fill={true}
                    />
                  </div>
                  <div>
                    <p className="text-xl text-gray-800 font-semibold">
                      Aloe Smit
                    </p>
                    <p className="text-gray-700">Member since Feb, 2024</p>
                  </div>
                </div>
                <div>
                  <p className="mb-2">2 Months ago</p>
                  <Ratting />
                </div>
              </div>
              <div className="bg-gradient-to-b from-white to-gray-50 shadow-sm rounded-lg p-2">
                <p className="">
                  Life changing course. Everything explained clearly.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
