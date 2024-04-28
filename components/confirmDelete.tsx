import React from "react";
import Modal from "./modal";
import { DialogClose } from "./ui/dialog";
import { MutationState, MutationStatus } from "@tanstack/react-query";
import Loading from "./loading";

type Props = {
  item: string;
  onConfirm: Function;
  status?: MutationStatus;
};

function ConfirmDelete({ item, onConfirm, status }: Props) {
  return (
    <Modal
      no_scroll={true}
      triggerStyles="bg-red-700 text-white rounded-xl"
      triggerTitle="delete"
      title={`Delete ${item}`}
    >
      <p className="w-full text-center text-lg text-red-700 font-semibold">
        Do you really want to delete {item}
      </p>
      <div className="w-full flex justify-end gap-4 items-center my-2">
        <DialogClose>
          <button className="text-lg text-gray-700">Cancel</button>
        </DialogClose>
        <button
          disabled={status === "pending"}
          onClick={() => onConfirm()}
          className="text-white disabled:bg-gray-300 disabled:text-gray-900 px-3 py-1 rounded-xl text-lg bg-red-700"
        >
          {status === "pending" ? <Loading /> : "Confirm"}
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDelete;
