"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import HighlightText from "../searchComponent";

export default function CourseCard({
  title,
  description,
  thumbnail,
}: {
  title: string;
  description: string;
  thumbnail: string;
}) {
  const searchParams = useSearchParams();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {searchParams.get("query") ? (
            <HighlightText
              text={title}
              query={searchParams.get("query") as string}
            />
          ) : (
            title
          )}
        </CardTitle>
        <CardDescription>
          {searchParams.get("query") ? (
            <HighlightText
              text={description}
              query={searchParams.get("query") as string}
            />
          ) : (
            description
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={"w-full h-[250px] relative rounded-xl overflow-hidden"}>
          <Image
            src={thumbnail}
            style={{ objectFit: "cover" }}
            alt={"a picture of course"}
            fill={true}
          />
        </div>
      </CardContent>
      <CardFooter className={"flex justify-between items-center"}>
        <div>5 star ratings</div>
        <Link
          href={`/details/3`}
          className={
            "bg-gradient-to-r px-4 py-2 rounded-lg from-indigo-800 to-indigo-600 hover:from-indigo-600 hover:to-indigo-800 text-white"
          }
        >
          Enroll
        </Link>
      </CardFooter>
    </Card>
  );
}
