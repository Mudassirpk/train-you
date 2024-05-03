import React from "react";
import { IoStar } from "react-icons/io5";
type Props = {
  rattings: number;
};

function Ratting({ rattings }: Props) {
  return (
    <div className="w-full flex items-center gap-2 px-2">
      {new Array(5).fill(0).map((_, index: number) => {
        return (
          <IoStar
            className={`text-2xl my-2 ${
              index + 1 <= rattings ? "text-yellow-600" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}

export default Ratting;
