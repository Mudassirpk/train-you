"use client";
import Loading from "@/components/loading";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Edit } from "lucide-react";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: async () => axios.get("/api/auth/get-user"),
  });

  let user;
  if (isFetched && data && data.data.success) {
    user = data.data.user;
  
  }

  return (
    <main className={`flex-1 h-screen py-4 pr-4`}>
      <section className="w-full flex flex-col h-full p-2 rounded-lg border-2 border-indigo-600">
        <h1 className="text-2xl text-indigo-600 font-semibold py-1 px-2">
          Profile
        </h1>
        <Separator className="my-2" />

        {isFetching ? (
          <Loading message="Fetching user details" />
        ) : (
          <div className="w-full">
            <div className="w-full flex gap-4 p-2 items-center">
              <div className="w-[180px] h-[150px] relative rounded xl overflow-hidden">
                <Image
                  alt="user-image"
                  src={"/teacher.jpg"}
                  fill={true}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">
                  {user.name}
                </p>
                <p className="text-lg text-gray-700">{user.email}</p>
                <p className="text-lg text-gray-700">{user.phone}</p>
                <Link
                  href={"edit-profile"}
                  className="flex gap-2 items-center underline underline-offset-8 my-2 text-indigo-600 text-sm"
                >
                  <Edit /> Edit Profile
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-between p-4">
              <p className="font-semibold text-xl text-indigo-600">Skills</p>
              <div className="flex gap-2 items-center flex-wrap">
                {user.details.skills
                  ? user.details.skills.map((skill: string) => {
                      return (
                        <p className="px-3 py-1 rounded-xl bg-indigo-100 text-indigo-900">
                          {skill}
                        </p>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="w-full p-4">
              <p className="mb-2 text-2xl font-semibold text-indigo-600">
                Education
              </p>
              <div className="w-full p-4 bg-white border border-gray-400 rounded-xl text-gray-700">
                <div className="w-full flex justify-between items-center">
                  <p className="text-lg font-semibold">Degree</p>
                  <p className="text-lg">{user.details.degree}</p>
                </div>
                <div className="w-full flex justify-between items-center">
                  <p className="text-lg font-semibold">Major</p>
                  <p className="text-lg">{user.details.major}</p>
                </div>
                <div className="w-full flex justify-between items-center">
                  <p className="text-lg font-semibold">Institute</p>
                  <p className="text-lg">{user.details.institute}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
