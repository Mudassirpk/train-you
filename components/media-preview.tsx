"use client";
import Image from "next/image";

export default function MediaPreview({ media }: { media: File }) {
  return (
    <section className="w-full h-[300px] relative rounded-lg border-gray-300 border-2">
      {media.type.startsWith("image/") ? (
        <Image
          className="object-contain"
          src={URL.createObjectURL(media)}
          alt="media-preview"
          fill={true}
        />
      ) : media.type.startsWith("video/") ? (
        <video controls={true} className="h-full w-full">
          <source src={URL.createObjectURL(media)} type={media.type} />
        </video>
      ) : (
        <p>Ivalid file type</p>
      )}
    </section>
  );
}
