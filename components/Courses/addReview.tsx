import React, { useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import RattingsInput from "./rattingsInput";
import Loading from "../loading";

type Props = { courseId: string };

function AddReview({ courseId }: Props) {
  const [review, setReview] = useState({
    rattings: 0,
    message: "",
    courseId,
  });

  const { status, mutate } = useMutation({
    mutationKey: ["add-review"],
    mutationFn: async () => await axios.post("/api/course/add-review", review),
  });

  return (
    <div className="w-full my-8">
      <p className="text-gray-700 text-sm my-2">Add Review</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <label htmlFor="review-message" className="flex gap-2 flex-col w-full">
          <textarea
            onChange={(e) =>
              setReview({
                ...review,
                message: e.target.value,
              })
            }
            id="review-message"
            className="w-full border-2 border-gray-700 rounded-xl p-4"
          />
        </label>

        <p className="text-gray-700 text-sm mt-3">Add Rattings</p>
        <RattingsInput
          onChange={(rattings: number) =>
            setReview({
              ...review,
              rattings: rattings + 1,
            })
          }
        />
        <Button
          disabled={status === "pending"}
          className="float-right my-2 disabled:bg-gray-300 disabled:text-gray-900"
          type="submit"
        >
          {status === "pending" ? <Loading /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default AddReview;
