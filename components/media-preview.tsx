"use client";
import Image from "next/image";

export default function MediaPreview({
  media,
  sourceAsUrl,
}: {
  media: any;
  sourceAsUrl?: boolean;
}) {
  return (
    <section className="w-full h-[300px] overflow-hidden relative rounded-lg border-gray-300 border-2">
      {media.type.startsWith("image/") || media.type.startsWith('image') ? (
        <Image
          className="object-contain"
          src={sourceAsUrl ? media.url : URL.createObjectURL(media)}
          alt="media-preview"
          fill={true}
        />
      ) : media.type.startsWith("video/") || media.type.startsWith('video') ? (
        <video controls={true} className="h-full w-full">
          <source
            src={sourceAsUrl ? media.url : URL.createObjectURL(media)}
            type={media.type}
          />
        </video>
      ) : (
        <p>Ivalid file type</p>
      )}
    </section>
  );
}
