import CourseCard from "@/components/Courses/CourseCard";

export default function CoursesGrid() {
  return (
    <div
      className={
        "w-full my-6 gap-2 grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
      }
    >
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </div>
  );
}
