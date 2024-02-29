import React from "react";
import { PiSpinner } from "react-icons/pi";

function Loading() {
  return (
    <div className="w-full flex items-center justify-center">
      <PiSpinner className="animate-spin" />
    </div>
  );
}

export default Loading;
