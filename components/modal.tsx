import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  triggerTitle: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  triggerStyles?: string;
  no_scroll?: boolean;
  close?: boolean;
};

function Modal({
  title,
  triggerTitle,
  description,
  triggerStyles,
  no_scroll,
  close,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState<undefined | boolean>();

  useEffect(() => {
    if (close) {
      setIsOpen(false);
    }
  }, [close]);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <Button
          onClick={() => {
            setIsOpen(undefined);
          }}
          className={
            triggerStyles
              ? triggerStyles
              : `p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500`
          }
        >
          {triggerTitle}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`
          ${
            !no_scroll ? "overflow-y-scroll" : ""
          } max-h-[calc(100vh_-_100px)] w-full`}
      >
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
