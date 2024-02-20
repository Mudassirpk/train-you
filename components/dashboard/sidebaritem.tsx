import React from "react";

type Props = {
  itemName: string;
};

function SidebarItem({ itemName }: Props) {
  return (
    <div className="p-2 hover:bg-indigo-600 hover:text-white cursor-pointer rounded-lg border-2 border-indigo-200 w-full">
      {itemName}
    </div>
  );
}

export default SidebarItem;
