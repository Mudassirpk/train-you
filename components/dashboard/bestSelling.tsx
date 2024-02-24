import Image from "next/image";
import { Separator } from "../ui/separator";

export default function BestSelling() {
  return (
    <div className="col-span-2 border-2 border-indigo-600 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-indigo-600">Best Selling</p>
        <p className="text-lg font-semibold text-indigo-700 px-4 py-1 rounded-lg bg-indigo-100">
          29 Items sold for July
        </p>
      </div>
      <Separator className="my-2" />
      <div className="flex gap-2 items-center">
        <div className="relative min-w-24 h-24">
          <Image
            alt="course-image"
            src={"/hero.jpg"}
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div>
          <p className="text-xl font-bold text-indigo-600">
            Learn become a successfull person in life
          </p>
          <p className="text-indigo-500">
            Tips to excel in you career. Learn from experienced. Learn time
            management, preasure handling and many more.
          </p>
        </div>
      </div>
    </div>
  );
}
