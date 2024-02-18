import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CourseCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>A guide to being a successful person</CardTitle>
        <CardDescription>
          learn important tips and tricks to excel in your career.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={"w-full h-[250px] relative"}>
          <Image
            src={"/teacher.jpg"}
            objectFit={"contain"}
            alt={"a picture of course"}
            fill={true}
          />
        </div>
      </CardContent>
      <CardFooter className={"flex justify-between items-center"}>
        <div>5 star ratings</div>
        <Button
          className={
            "bg-gradient-to-r px-4 from-indigo-800 to-indigo-600 hover:from-indigo-600 hover:to-indigo-800 text-white"
          }
        >
          Enroll
        </Button>
      </CardFooter>
    </Card>
  );
}
