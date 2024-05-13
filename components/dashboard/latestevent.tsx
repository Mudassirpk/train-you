import React from "react";
import { Separator } from "../ui/separator";
import { TSession } from "@/types/types";
import { formatDate } from "@/lib/utils";
import dayjs from "dayjs";
import Link from "next/link";

type Props = { event: TSession };

function LatestEvent({ event }: Props) {
  return (
    <div className="py-5 px-2 border-2 justify-between flex flex-col border-indigo-700 rounded-lg">
      <p className="font-semibold text-xl text-indigo-600">Latest Event</p>
      <Separator className="my-2" />
      <div className="flex flex-col flex-1 justify-center items-center">
        <p className="text-lg text-indigo-800 font-semibold">{event.title}</p>
        <p className="text-sm text-indigo-700">
          {formatDate(dayjs(event.timestamp.from).toString())}
        </p>
        <p className="text-sm text-indigo-700">
          {event.type === "physical" ? event.venue.name : event.type}
        </p>
      </div>
      <Link href={"/dashboard/events"} className="w-full">
        <button className="px-2 w-full py-2 mt-3 rounded-lg bg-indigo-800 hover:bg-indigo-600 text-white">
          Event Details
        </button>
      </Link>
    </div>
  );
}

export default LatestEvent;
