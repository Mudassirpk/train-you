"use client";
import { Images } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

export default function MediaCarousal({
  media,
}: {
  media: { url: string; type: "image" | "video" }[];
}) {
  return (
    <Carousel className="w-full h-full flex items-center p-4">
      <CarouselContent>
        <CarouselItem className="w-full">
          <div className="w-full gap-2 flex">
            {media.map((media) => {
              return media.type.includes("image") ? (
                <div className="p-2 h-28 aspect-square rounded-lg relative">
                  <Image alt="media image" src={media.url} fill={true} />
                </div>
              ) : (
                <div className="p-2 h-28 aspect-square rounded-lg relative">
                  <video controls={true} className="h-full w-full">
                    <source src={media.url} type={media.type} />
                  </video>
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
