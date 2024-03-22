"use client";
import React from "react";
import MediaPreview from "./media-preview";
import Message from "./message";

type Props = { media: File[] };

function MediaGrid({ media }: Props) {
  return (
    <div className="w-full p-2 rounded-lg border-2 border-gray-300 flex flex-wrap gap-1">
      {media.length > 0 ? (
        media.map((medium: File) => (
          <MediaPreview media={medium} key={medium.name} />
        ))
      ) : (
        <Message size='sm' message="No media chosen yet" />
      )}
    </div>
  );
}

export default MediaGrid;
