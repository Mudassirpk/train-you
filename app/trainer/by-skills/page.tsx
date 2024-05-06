"use client";
import Loading from "@/components/loading";
import Trainer from "@/components/trainer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Trainers() {
  const query: string[] | undefined = useSearchParams()
    .get("query")
    ?.split(" ");

  const { isFetching, data } = useQuery({
    queryKey: ["trainers-by-skill"],
    queryFn: async () =>
      await axios.post("/api/trainer-by-skill", { skills: query }),
  });

  return (
    <main className="w-full h-screen px-[10%] py-10">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8">Trainers</h1>
      <div className="my-4 text-gray-700">
        <div>
          Trainers with skills
          <div className="w-full p-2 flex gap-2 flex-wrap">
            {query?.map((skill: string) => (
              <p className="bg-indigo-100 text-indigo-900 rounded-xl px-2 py-1">
                {skill}
              </p>
            ))}
          </div>{" "}
        </div>
      </div>
      {isFetching ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          {data?.data.trainers.map((trainer: any) => (
            <Trainer
              id={trainer._id}
              name={trainer.name}
              skills={trainer.details.skills}
              email={trainer.email}
              key={trainer._id}
            />
          ))}
        </div>
      )}
    </main>
  );
}
