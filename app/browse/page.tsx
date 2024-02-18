import SearchCourse from "@/components/home/SearchCourse";
import CoursesGrid from "@/app/browse/coursesgrid";

export default function Browse() {
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
        </div>
      </section>
    </main>
  );
}
