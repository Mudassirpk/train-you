"use client";
import Loading from "@/components/loading";
import { TUser } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();
  const { data, isFetching } = useQuery({
    queryKey: ["get-trainer-students"],
    queryFn: async () =>
      await axios.get(`/api/trainer-students?userId=${session.data?.user._id}`),
  });

  return (
    <section className="w-full p-4 h-screen overflow-y-scroll flex flex-col">
      <div className="w-full border-2 flex flex-col rounded-xl border-indigo-600 h-full">
        <div className="w-full flex px-4 py-2 border-b border-b-gray-300 justify-between items-center">
          <h2 className="text-2xl font-semibold text-indigo-600">Students</h2>
        </div>
        <div className="w-full space-y-4 p-4">
          {isFetching ? (
            <Loading />
          ) : (
            data?.data.students.map((student: TUser) => {
              return (
                <div
                  key={student._id}
                  className="w-full shadow-sm shadow-gray-200 border-t border-t-indigo-600 px-3 py-2 flex justify-between items-center rounded-xl"
                >
                  <p className="font-semibold text-gray-800">{student.name}</p>
                  <p className="text-gray-800">{student.email}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
