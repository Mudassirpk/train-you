"use client";
import Loading from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { MdOutlineDone } from "react-icons/md";
import Link from "next/link";

export default function StripeSuccess() {
  const courseId = useSearchParams().get("courseId");

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["single-user-course"],
    queryFn: async () => await axios.get(`/api/course/${courseId}`),
  });

  let course;

  if (isFetched) course = data?.data.course;

  return (
    <main className="w-full h-screen flex px-[10%] items-center flex-col justify-center">
      <div className="p-4 rounded-xl w-full shadow-sm shadow-gray-300">
        <h1 className="font-semibold text-2xl text-green-800 flex justify-between items-center">
          Enrollment Successfull{" "}
          <MdOutlineDone className="text-green-800 text-4xl bg-green-100 p-2 rounded-full" />
        </h1>
        <div className="w-full my-4 border-t border-gray-200"></div>
        {isFetching ? (
          <Loading message="Fetching course" />
        ) : (
          <section className="w-full">
            <h2 className="mt-4 mb-6 text-3xl font-semibold text-indigo-800">
              Course Details
            </h2>
            <div className="flex w-full sm-lg:w-full md:flex-col shadow-sm rounded-tr-lg rounded-tl-lg gap-4">
              <div className="relative w-[400px] md:h-[300px] md:w-full overflow-hidden rounded-xl">
                <Image
                  alt="product-image"
                  src={course.thumbnail}
                  style={{ objectFit: "cover" }}
                  fill={true}
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="capitalize text-2xl font-bold text-indigo-800 md:text-center">
                  {course.title}
                </h2>
                <p className="text-indigo-600 md:text-center">
                  {course.description}
                </p>
                <div className="my-8 flex justify-between items-center sm:flex-col">
                  <div>
                    <p className="font-semibold mb-2 text-gray-800 text-lg">
                      Instructor
                    </p>
                    <div className="flex gap-2 items-center">
                      <div className="w-11 h-10 relative overflow-hidden rounded-lg">
                        <Image
                          alt="trainer"
                          className="object-cover"
                          src={"/person.jpg"}
                          fill={true}
                        />
                      </div>
                      <p className="font-semibold">{course.teacherId.name}</p>
                    </div>
                  </div>

                  <p className="text-4xl font-semibold text-indigo-600 underline underline-offset-8 mt-4">
                    RS {course.price / 100}
                  </p>
                </div>
              </div>
            </div>
            <Link
              href={"/browse"}
              className="px-4 mt-4 float-right py-2 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Browse more courses
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
