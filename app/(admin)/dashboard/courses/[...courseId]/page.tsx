"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
type Props = {};

function page({}: Props) {
  return (
    <section className="w-full p-2">
      <h3 className="text-semibold text-xl text-indigo-600">Course Details</h3>
      <div className="w-full my-2">
        <div className="flex gap-4 items-center">
          <div className="relative h-32 w-32 rounded-lg overflow-hidden">
            <Image
              alt="course-image"
              style={{ objectFit: "cover" }}
              src={"/teacher.jpg"}
              fill={true}
            />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-800">
              Learn C++ to build performant applications
            </p>
            <p>
              Learn best practices and priciples for build industary standard
              and high performant cross platform apps using c++.
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Button className="bg-indigo-800 hover:bg-indigo-600">Edit</Button>
            <Button className="bg-white hover:bg-red-700 hover:text-white text-red-700 font-semibold">
              Delete
            </Button>
          </div>
        </div>
        <div className="w-1/2 my-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-indigo-800 text-lg font-semibold ">Created At</p>
            <p className="bg-indigo-100 text-indigo-800 px-4 font-semibold py-1 text-lg rounded-full">
              4 Dec, 2024
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-indigo-800 text-lg font-semibold ">
              Enrollments
            </p>
            <p className="bg-indigo-100 text-indigo-800 px-4 font-semibold py-1 text-lg rounded-full">
              45
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-indigo-800 text-lg font-semibold ">Earnings</p>
            <p className="bg-indigo-100 text-indigo-800 px-4 font-semibold py-1 text-lg rounded-full">
              55000 RS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
