"use client";
import { Separator } from "../ui/separator";
import SidebarItem from "./sidebaritem";
import UserProfile from "./user-profile";

export default function SideBar() {
  return (
    <section className="h-full p-4 w-[300px]">
      <div className="border-2 h-full p-2 flex flex-col rounded-lg border-indigo-600">
        <UserProfile />
        <Separator className="my-2" />
        <div className="w-full flex flex-col items-center gap-2 py-2 flex-1">
          <SidebarItem itemName="Dashboard" />
          <SidebarItem itemName="Courses" />
          <SidebarItem itemName="Students" />
          <SidebarItem itemName="Events" />
          <SidebarItem itemName="Venues" />
        </div>{" "}
        <div className="self-end hover:bg-indigo-600 hover:text-white font-semibold text-center bg-indigo-200 text-indigo-600 w-full p-2 rounded-lg">
          Logout
        </div>
      </div>
    </section>
  );
}
