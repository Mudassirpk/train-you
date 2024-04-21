import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "./ui/button";

type Props = {
  triggerTitle: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

function Modal({ title, triggerTitle, description, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500">
          {triggerTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh_-_100px)] overflow-y-scroll w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
