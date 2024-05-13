"use client";
import AddEvent from "@/components/Events/AddEvent";
import Loading from "@/components/loading";
import { TSession } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import Event from "@/components/Events/Event";

type Props = {};

function Page({}: Props) {
  const session = useSession();

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["get-events"],
    queryFn: async () =>
      await axios.get(
        `/api/event${
          session.data?.user.role === "teacher"
            ? `?userId=${session.data?.user._id}`
            : `/${session.data?.user._id}`
        }`
      ),
  });

  let events: TSession[] = [];
  if (isFetched && data) events = data.data.events;

  return (
    <section className="w-full p-4 h-screen overflow-y-scroll flex flex-col">
      <div className="w-full border-2 flex flex-col rounded-xl border-indigo-600 h-full">
        <div className="w-full flex px-4 py-2 border-b border-b-gray-300 justify-between items-center">
          <h2 className="text-2xl font-semibold text-indigo-600">Events</h2>
          {session.data?.user.role === "teacher" ? <AddEvent /> : null}
        </div>
        <div className="flex-1 overflow-y-scroll w-full space-y-4 p-2">
          {isFetching ? (
            <Loading />
          ) : (
            events.map((event: TSession) => {
              return <Event event={event} />;
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Page;
