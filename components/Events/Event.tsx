import { TSession } from "@/types/types";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils";
import dayjs from "dayjs";

type Props = { event: TSession };

function Event({ event }: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <div className="w-full">
      <div
        key={event._id}
        className="w-full flex items-center gap-4 shadow-sm shadow-gray-200 py-2 px-4 border-t border-t-indigo-600 rounded-xl"
      >
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{event.title}</p>
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
          <>
            <p className="w-full font-semibold text-indigo-600">Event Type</p>
            <p className="px-3 py-1 flex justify-between items-center rounded-xl bg-indigo-50 text-indigo-900 my-1">
              {event.type}
            </p>
          </>
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
              <p className="w-full font-semibold text-indigo-600">Venue</p>
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
          <>
            <p className="w-full font-semibold text-indigo-600">Dates</p>
            <p className="px-3 py-1 flex justify-between items-center rounded-xl bg-indigo-50 text-indigo-900 my-1">
              <span>From - {formatDate(event.timestamp.from)}</span>
              <span>To - {formatDate(event.timestamp.to)}</span>
            </p>
          </>
        </div>
      ) : null}
    </div>
  );
}

export default Event;
