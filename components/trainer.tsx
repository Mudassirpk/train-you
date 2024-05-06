import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  name: string;
  email: string;
  skills: string[];
};

function Trainer({ id, name, email, skills }: Props) {
  return (
    <Link
      href={`/trainer/public-profile?userId=${id}`}
      className="w-full flex gap-4 items-center p-4 shadow-gray-100 hover:shadow-gray-200 border-t-2 border-indigo-600 shadow-lg rounded-xl"
    >
      <div className="w-24 h-24 rounded-lg overflow-hidden relative">
        <Image
          src={"/person.jpg"}
          className="object-cover"
          alt="trainer"
          fill={true}
        />
      </div>
      <div className="flex-1">
        <p className="text-xl font-semibold text-gray-800">{name}</p>
        <p className="text-lg text-gray-700">{email}</p>
        <div className="w-full p-2 flex gap-2 flex-wrap">
          {skills.map((skill: string) => (
            <p className="bg-indigo-100 text-indigo-900 rounded-xl px-2 py-1">
              {skill}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Trainer;
