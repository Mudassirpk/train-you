import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function CoursesLayout({ children }: Props) {
  return (
    <main className={`flex-1 h-screen py-4 pr-4`}>
      <section className="w-full flex flex-col h-full p-2 rounded-lg border-2 border-indigo-600">
        <h1 className="text-2xl text-indigo-600 font-semibold py-1 px-2">
          Courses
        </h1>
        <Separator className="my-2" />
        {children}
      </section>
    </main>
  );
}

export default CoursesLayout;
