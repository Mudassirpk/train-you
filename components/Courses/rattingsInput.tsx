import React, { useState } from "react";
import { CiStar } from "react-icons/ci";

type Props = { onChange: (rattings: number) => void };

function RattingsInput({ onChange }: Props) {
  const [colorTill, setColorTill] = useState(-1);
  const [confirmedTill, setConfirmedTill] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-2">
      {new Array(5).fill(0).map((_, index: number) => {
        return (
          <CiStar
            onMouseLeave={() => setColorTill(-1)}
            onMouseOver={() => {
              setColorTill(index);
            }}
            onClick={() => {
              setConfirmedTill(index);
              onChange(index);
            }}
            className={`text-2xl text-gray-300 ${
              index <= colorTill || (confirmedTill && index <= confirmedTill)
                ? "text-yellow-500"
                : ""
            }`}
          />
        );
      })}
    </div>
  );
}

export default RattingsInput;
