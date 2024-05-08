import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BecomeATeacher() {
  return (
    <section
      className={"w-full px-12 md:px-2 md:flex-col my-12 flex items-center"}
    >
      <div className={"md:flex md:flex-col md:items-center"}>
        <h3 className={"text-indigo-800 font-bold md:text-center text-3xl"}>
          Become an Instructor
        </h3>
        <p className={"text-indigo-400 md:text-center mb-4"}>
          Make use of your skills teach others on the platform. Get rewards for
          your teaching skills.
        </p>
        <Link
          href={`/signup?role=teacher`}
          className={
            "text-white bg-gradient-to-r px-4 py-2 rounded-lg from-indigo-800 to-indigo-600 hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 text-lg my-4"
          }
        >
          Get you trainer account
        </Link>
      </div>
      <div className={"w-[50%] relative h-[400px] md:w-full"}>
        <Image
          style={{ objectFit: "contain" }}
          src={"/teacher.jpg"}
          alt={"a teacher teaching on a laptop"}
          fill={true}
        />
      </div>
    </section>
  );
}
