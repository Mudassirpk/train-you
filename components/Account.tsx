"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Account() {
  const { data: session, status } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={"flex gap-2 cursor-pointer rounded-lg items-center"}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          <div className={"flex p-1 flex-col items-start"}>
            <p className={"text-lg text-white"}>
              {status === "authenticated" ? "MSKHAN" : "Account"}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-[150px] mt-3"}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className={"cursor-pointer"}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className={"cursor-pointer"}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem className={"cursor-pointer"}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
