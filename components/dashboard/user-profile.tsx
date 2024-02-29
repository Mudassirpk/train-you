"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import React, { Suspense } from "react";
import Loading from "../loading";

type Props = {};

function UserProfile({}: Props) {
  const { data, status } = useSession();
  return (
    <Suspense fallback={<Loading />}>
      <div className={"flex gap-2 cursor-pointer rounded-lg items-center"}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
        <div className={"flex p-1 flex-col items-start"}>
          <p className={"text-lg text-gray-700"}>{data?.user?.name}</p>
        </div>
      </div>
    </Suspense>
  );
}

export default UserProfile;
