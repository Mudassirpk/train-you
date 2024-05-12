import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { TImage, TMedia, TVenue, TVideo } from "@/types/types";
import Message from "../message";

type Props = {
  venue: TVenue;
};

function Venue({ venue }: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  console.log((venue.media as TMedia).images);
  return (
    <div className="w-full px-4 py-2 rounded-xl shadow-sm shadow-gray-200 border-t border-indigo-600">
      <div className="w-full flex items-center gap-4">
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800">{venue.name}</p>
          <p className="text-lg text-gray-700">{venue.description}</p>
        </div>
        <Button
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="bg-indigo-600 hover:bg-indigo-500 px-2 py-1 rounded-lg text-white"
        >
          Details
        </Button>
      </div>
      {detailsOpen ? (
        <div className="w-full">
          {typeof venue.media !== "string" &&
          (venue.media.videos.length > 0 || venue.media.images.length > 0) ? (
            <div className="w-full mt-4">
              {venue.media.images.map((image: TImage) => {
                return (
                  <div className="w-full rounded-lg overflow-hidden h-[250px] relative">
                    <Image
                      className="object-cover"
                      fill
                      alt="image"
                      src={image.url}
                    />
                  </div>
                );
              })}
              {venue.media.videos.map((video: TVideo) => {
                return (
                  <div className="w-full rounded-lg overflow-hidden h-[250px] relative">
                    <video controls={true} className="h-full w-full">
                      <source src={video.url} />
                    </video>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full mt-4">
              <Message
                type="normal"
                size="md"
                message="Venue has no media associated with it"
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Venue;
