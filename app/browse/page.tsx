'use client'
import SearchCourse from "@/components/home/SearchCourse";
import CoursesGrid from "@/app/browse/coursesgrid";
import Pagination from "./pagination";
import { useSearchParams } from "next/navigation";

export default function Browse() {
  // TODO: get all courses relative to the query in query params if they are there
  const params = useSearchParams()
 
  return (
    <main className={"w-full flex-1"}>
      <SearchCourse />
      <div className={"w-full h-[1px] bg-indigo-100 my-4"}></div>
      <section className={"w-full px-12 md:px-2 my-12"}>
        <h2 className={"text-2xl font-bold text-indigo-800"}>
          Recommended Courses
        </h2>
        <div className={"w-full"}>
          <CoursesGrid />
          <Pagination />
        </div>
      </section>
    </main>
  );
}
