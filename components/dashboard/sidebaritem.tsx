import Link from "next/link";
import React from "react";

type Props = {
  itemName: string;
  icon: React.ReactNode;
  collapsed?: boolean;
  to:string
};

function SidebarItem({ itemName, icon, collapsed,to }: Props) {
  return (
    <Link href={to}
      className={`p-2 flex gap-2 items-center hover:bg-indigo-600 hover:text-white cursor-pointer rounded-lg border-2 border-indigo-200 ${
        collapsed ? "w-auto" : "w-full"
      }`}
    >
      {icon} {collapsed && collapsed === true ? null : itemName}
    </Link>
  );
}

export default SidebarItem;
