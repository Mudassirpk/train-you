import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

type Props = {
  triggerTitle: string;
  options: string[];
  label?: string;
  onSelect: (option: string) => void;
};

export default function Dropdown({
  options,
  triggerTitle,
  label,
  onSelect,
}: Props) {
  const [currentItem, setCurrentItem] = useState<string | undefined>();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="shadow-sm border-t border-t-gray-300 shadow-gray-200 rounded-lg w-full p-3">
        {currentItem ? currentItem : triggerTitle}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {label ? (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        ) : null}
        {options.map((option) => {
          return (
            <DropdownMenuItem
              onClick={() => {
                setCurrentItem(option);
                onSelect(option);
              }}
              key={option}
            >
              {option}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
