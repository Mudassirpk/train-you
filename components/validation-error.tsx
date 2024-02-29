import React from "react";

type Props = {message: React.ReactNode };

function ValidationError({ message }: Props) {
  return (
    <div className="w-full text-red-700 text-lg font-semibold my-2">
      {message}
    </div>
  );
}

export default ValidationError;
