import React from "react";

type Props = {
  message: string;
  size: "sm" | "md" | "lg";
  type?: "normal" | "success" | "error";
};

export default function Message({ message, size, type }: Props) {
  const colors = {
    normal: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-900",
    error: "bg-red-100 text-red-900",
  };

  return (
    <p
      className={`px-2 text-center w-full text-${size} text-gray-700 ${
        type ? `${colors[type]} p-2 rounded-xl` : ""
      }`}
    >
      {message}
    </p>
  );
}
