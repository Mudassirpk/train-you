import AddEvent from "@/components/Events/AddEvent";
import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <section className="w-full p-4 h-screen overflow-y-scroll flex flex-col">
      <div className="w-full border-2 flex flex-col rounded-xl border-indigo-600 h-full">
        <div className="w-full flex px-4 py-2 border-b border-b-gray-300 justify-between items-center">
          <h2 className="text-2xl font-semibold text-indigo-600">Events</h2>
          <AddEvent />
        </div>
      </div>
    </section>
  );
}

export default Page;
