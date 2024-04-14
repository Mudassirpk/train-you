import React from "react";
import { PiSpinner } from "react-icons/pi";

function Loading({
  message,
  textColor,
}: {
  message?: string;
  textColor?: string;
}) {
  return (
    <div
      className={`w-full flex items-center justify-center gap-2 text-${textColor}`}
    >
      <PiSpinner className="animate-spin" />
      {message ? <p className="text-lg font-semibold">{message}</p> : null}
    </div>
  );
}

export default Loading;
