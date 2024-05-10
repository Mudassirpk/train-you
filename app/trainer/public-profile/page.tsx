"use client";

import Ratting from "@/components/Courses/ratting";
import Loading from "@/components/loading";
import Message from "@/components/message";
import Course from "@/components/public/Course";
import Trainer from "@/components/trainer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function PubliProfile() {
  const userId = useSearchParams().get("userId");

  const { data, isFetched, isFetching } = useQuery({
    queryKey: ["get-public-profile"],
    queryFn: async () => axios.get(`/api/public-profile?userId=${userId}`),
  });

  let user;

  if (isFetched) user = data?.data.user;

  return (
    <main className="h-screen w-full">
      {isFetching ? (
        <Loading message="Fetching trainer details" />
      ) : (
        <div className="w-full px-[10%] py-8">
          <div className="flex w-full gap-4 items-center">
            <div className="w-[200px] h-[200px] rounded-xl relative overflow-hidden">
              <Image
                src={"/person.jpg"}
                alt="trainer"
                fill={true}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-2xl text-gray-800 font-semibold capitalize">
                {user.name}
              </p>
              <p className="text-xl text-gray-700">{user.email}</p>
              <p className="text-xl text-gray-700">{user.phone}</p>
              <div className="w-full flex gap-2 items-center my-2">
                {user.details.skills?.map((skill: string) => (
                  <p className="px-2 py-1 text-indigo-900 bg-indigo-100 rounded-xl">
                    {skill}
                  </p>
                ))}
              </div>
              <div className="flex gap-4 items-center">
                Rattings{" "}
                <span>
                  <Ratting rattings={parseInt(user.details.averageRattings)} />
                </span>
              </div>
            </div>
          </div>
          <div className="w-full my-6">
            <h2 className="text-2xl font-semibold text-indigo-600">Courses</h2>
            <div className="w-full my-4 space-y-4">
              {user.courses.length === 0 ? (
                <Message
                  size="md"
                  message="Trainer hasn't added any courses yet"
                />
              ) : (
                user.courses.map((course: any) => {
                  return (
                    <Course
                      key={course._id}
                      id={course._id}
                      title={course.title}
                      description={course.description}
                      thumbnail={course.thumbnail}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
