"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

export default function MediaCarousal() {
  return (
    <Carousel className="w-full h-full flex items-center p-4">
      <CarouselContent>
        <CarouselItem className="w-full">
          <div className="w-full gap-2 flex">
            {Array.from({ length: 5 }).map((i) => {
              return (
                <div className="p-2 h-28 aspect-square rounded-lg relative">
                  <Image alt="media image" src={"/hero.jpg"} fill={true} />
                </div>
              );
            })}
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
