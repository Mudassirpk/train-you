"use client";
import { Separator } from "../ui/separator";
import SidebarItem from "./sidebaritem";
import UserProfile from "./user-profile";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { SiCoursera } from "react-icons/si";
import { PiStudent } from "react-icons/pi";
import { MdEvent } from "react-icons/md";
import { LuLandmark } from "react-icons/lu";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { MdAdd } from "react-icons/md";

export default function SideBar() {
  const { data, status } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  return (
    <section className={`h-screen p-4 ${collapsed ? "w-auto" : "w-[300px]"}`}>
      <div
        className={`border-2 h-full ${
          collapsed ? "px-0 py-2" : "p-2"
        } flex flex-col rounded-lg border-indigo-600`}
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "w-full justify-between"
          }`}
        >
          {!collapsed ? <UserProfile /> : null}
          <TbLayoutSidebarLeftCollapse
            onClick={() => setCollapsed(!collapsed)}
            className="text-3xl text-gray-700 cursor-pointer hover:text-gray-800"
          />
        </div>
        <Separator className="my-2" />
        <div className="w-full flex flex-col items-center gap-2 py-2 flex-1">
          <SidebarItem
            to="/dashboard"
            icon={<MdDashboard className="text-2xl" />}
            itemName="Dashboard"
            collapsed={collapsed}
          />
          {(data?.user as any).role === "teacher" ? (
            <SidebarItem
              to="/dashboard/create-course"
              icon={<MdAdd className="text-2xl" />}
              itemName="Add new course"
              collapsed={collapsed}
            />
          ) : null}
          <SidebarItem
            to="/dashboard/courses"
            icon={<SiCoursera className="text-2xl" />}
            itemName="Courses"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/students"
            icon={<PiStudent className="text-2xl" />}
            itemName="Students"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/events"
            icon={<MdEvent className="text-2xl" />}
            itemName="Events"
            collapsed={collapsed}
          />
          <SidebarItem
            to="venues"
            icon={<LuLandmark className="text-2xl" />}
            itemName="Venues"
            collapsed={collapsed}
          />
        </div>{" "}
        <Button
          onClick={() => {
            signOut({ callbackUrl: "http://localhost:3000/login" });
          }}
          className="self-end hover:bg-indigo-600 hover:text-white font-semibold text-center bg-indigo-200 text-indigo-600 w-full p-2 rounded-lg"
        >
          Logout
        </Button>
      </div>
    </section>
  );
}
