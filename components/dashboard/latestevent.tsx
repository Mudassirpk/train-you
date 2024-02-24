import React from "react";
import { Separator } from "../ui/separator";

type Props = {};

function LatestEvent({}: Props) {
  return (
    <div className="py-5 px-2 border-2 flex flex-col border-indigo-700 rounded-lg">
      <p className="font-semibold text-xl text-indigo-600">Latest Event</p>
      <Separator className="my-2" />
      <div className="flex flex-col flex-1 justify-center items-center">
        <p className="text-lg text-indigo-800 font-semibold">
          Student Teacher meetup
        </p>
        <p className="text-sm text-indigo-700">2nd March, 2024</p>
        <p className="text-sm text-indigo-700">VU Campus, Lahore</p>
      </div>
    </div>
  );
}

export default LatestEvent;
