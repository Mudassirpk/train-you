"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { client } from "@/providers/queryprovider";

export default function SearchCourse() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <section className={"w-full flex flex-col items-center gap-4 my-6"}>
      <h1 className={"w-full text-center text-3xl font-bold text-indigo-600"}>
        Search Courses
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`browse?query=${query}`);
          client.refetchQueries({ queryKey: ["get-public-courses"] });
        }}
        className={"flex gap-2 items-center w-[800px] sm-lg:w-full sm-lg:px-4"}
      >
        <Input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type={"text"}
          placeholder={"stereochemistry"}
          className={"flex-1"}
        />
        <Link
          href={`browse?query=${query}`}
          className={
            "px-2 py-2 rounded-lg bg-indigo-800 hover:bg-indigo-600 text-white"
          }
        >
          Search
        </Link>
      </form>
    </section>
  );
}
