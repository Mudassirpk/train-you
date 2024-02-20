import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type Props = {};

function UserProfile({}: Props) {
  return (
    <div className={"flex gap-2 cursor-pointer rounded-lg items-center"}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
      <div className={"flex p-1 flex-col items-start"}>
        <p className={"text-lg text-gray-700"}>MSKHAN</p>
      </div>
    </div>
  );
}

export default UserProfile;
