"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import CourseList from "./courselist";
type Props = {};

function Courses({}: Props) {
  return (
    <>
      <h2 className="text-xl font-semibold text-indigo-600 pt-2 px-2">
        Search Courses
      </h2>
      <form className="flex gap-2 py-2 px-2">
        <Input type="text" placeholder="e.g. Learn c++" />
        <Button className="bg-indigo-800 hover:bg-indigo-600">Search</Button>
      </form>

      <h2 className="text-xl font-semibold text-indigo-600 pt-2 px-2">
        Your Courses
      </h2>
      <CourseList />
    </>
  );
}

export default Courses;
