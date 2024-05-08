import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <section
      className={
        "w-full justify-center px-6 my-8 sm-lg:flex-col flex items-center"
      }
    >
      <div className={"w-[50%] sm-lg:w-full pl-12 sm-lg:pl-0"}>
        <h2
          className={
            "text-5xl sm:text-3xl sm-lg:text-center font-bold text-indigo-600"
          }
        >
          A new way of learning and understanding.
        </h2>
        <p className={"text-indigo-400 sm-lg:text-center my-2"}>
          Learn anything from anyone, from anywhere. world class education at
          you finger tips.
        </p>
        <div
          className={
            "flex gap-4 items-center my-4 sm-lg:w-full sm-lg:justify-center"
          }
        >
          <Link
            href={"/browse"}
            className={
              "px-4 py-2 bg-gradient-to-r from-indigo-800 rounded-xl text-xl to-indigo-600 hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 text-white font-semibold"
            }
          >
            Enroll Now
          </Link>
          <Link
            href={"/about"}
            className={
              "text-indigo-600 bg-transparent hover:bg-transparent hover:text-lg text-xl underline underline-offset-8"
            }
          >
            Learn more
          </Link>
        </div>
      </div>
      <div className={"w-[50%] sm-lg:w-full h-[400px] relative"}>
        <Image
          src={"/hero.jpg"}
          style={{ objectFit: "contain" }}
          alt={"hero-banner"}
          fill={true}
        />
      </div>
    </section>
  );
}
