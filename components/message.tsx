import React from "react";

type Props = { message: string; size: "sm" | "md" | "lg" };

export default function Message({ message, size }: Props) {
  return (
    <p className={`px-2 text-center w-full text-${size} text-gray-700`}>
      {message}
    </p>
  );
}
