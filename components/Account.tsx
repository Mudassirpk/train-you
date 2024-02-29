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
import Link from "next/link";

export default function Account() {
  const { data: session, status } = useSession();
  return status === "authenticated" ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={"flex gap-2 cursor-pointer rounded-lg items-center"}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          <div className={"flex p-1 flex-col items-start"}>
            <p className={"text-lg text-white"}>{session?.user?.name}</p>
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
            <Link href={"/dashboard"}>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={"cursor-pointer"}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link
      href={"/login"}
      className="bg-white rounded-lg px-2 py-2 text-indigo-600 hover:bg-indigo-600 border border-transparent hover:border-white hover:text-white"
    >
      Account
    </Link>
  );
}
