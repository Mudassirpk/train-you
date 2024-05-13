"use client";
import AddEvent from "@/components/Events/AddEvent";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { TSession } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type Props = {};

function Page({}: Props) {
  const session = useSession();
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["get-events"],
    queryFn: async () =>
      await axios.get(`/api/event?userId=${session.data?.user._id}`),
  });

  let events: TSession[] = [];
  if (isFetched && data) events = data.data.events;

  return (
    <section className="w-full p-4 h-screen overflow-y-scroll flex flex-col">
      <div className="w-full border-2 flex flex-col rounded-xl border-indigo-600 h-full">
        <div className="w-full flex px-4 py-2 border-b border-b-gray-300 justify-between items-center">
          <h2 className="text-2xl font-semibold text-indigo-600">Events</h2>
          <AddEvent />
        </div>
        <div className="flex-1 overflow-y-scroll w-full space-y-4 p-2">
          {isFetching ? (
            <Loading />
          ) : (
            events.map((event: TSession) => {
              return (
                <div className="w-full">
                  <div
                    key={event._id}
                    className="w-full flex items-center gap-4 shadow-sm shadow-gray-200 py-2 px-4 border-t border-t-indigo-600 rounded-xl"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {event.title}
                      </p>
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                    <Button
                      onClick={() => setDetailsOpen(!detailsOpen)}
                      className="bg-indigo-600 hover:bg-indigo-500 px-2 py-1 rounded-lg text-white"
                    >
                      Details
                    </Button>
                  </div>
                  {detailsOpen ? (
                    <div className="w-full border-b border-b-indigo-600 shadow-md shadow-gray-200 p-2 rounded-xl my-4">
                      <p className="w-full font-semibold text-indigo-600">
                        Members Invited
                      </p>
                      {event.members.map((member) => {
                        return (
                          <p
                            key={member._id}
                            className="px-3 py-1 flex justify-between items-center rounded-xl bg-indigo-50 text-indigo-900 my-1"
                          >
                            <span className="font-semibold">{member.name}</span>
                            <span>{member.email}</span>
                          </p>
                        );
                      })}
                      {event.type === "physical" ? (
                        <>
                          <p className="w-full font-semibold text-indigo-600">
                            Venue
                          </p>
                          <p className="px-3 py-1 flex justify-between items-center rounded-xl bg-indigo-50 text-indigo-900 my-1">
                            {event.venue.name}
                          </p>
                        </>
                      ) : (
                        event.links.map((link) => {
                          return (
                            <>
                              <p className="w-full font-semibold text-indigo-600">
                                Meeting Links
                              </p>
                              <a href={link}>
                                <p className="px-3 hover:underline py-1 flex justify-between items-center rounded-xl bg-indigo-50 text-indigo-900 my-1">
                                  {link}
                                </p>
                              </a>
                            </>
                          );
                        })
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Page;
