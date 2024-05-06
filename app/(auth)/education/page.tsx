"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { MdArrowRight } from "react-icons/md";

type Props = {};

function CompleteProfile({}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [education, setEducation] = useState({
    major: "",
    degree: "",
    institute: "",
  });

  const { mutate, status } = useMutation({
    mutationKey: ["save-uds"],
    mutationFn: async () =>
      await axios.post(
        `/api/auth/save-uds?userId=${searchParams.get("userId")}`,
        education
      ),
    onSuccess(data) {
      if (data.data.success) {
        router.push(`/skills?userId=${searchParams.get("userId")}`);
      }
    },
  });

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
        className="w-[400px]"
      >
        <p className="text-xl font-semibold text-gray-700">Education</p>
        <div className="w-full my-2">
          <Label className="flex flex-col gap-2">
            <span>Degree</span>
            <Input
              placeholder="e.g. BS"
              value={education.degree}
              onChange={(e) =>
                setEducation({
                  ...education,
                  degree: e.target.value,
                })
              }
              type="text"
              required
            />
          </Label>
        </div>{" "}
        <div className="w-full my-2">
          <Label className="flex flex-col gap-2">
            <span>Major</span>
            <Input
              placeholder="e.g. Computer Science"
              value={education.major}
              onChange={(e) =>
                setEducation({
                  ...education,
                  major: e.target.value,
                })
              }
              required
              type="text"
            />
          </Label>
        </div>
        <div className="w-full my-2">
          <Label className="flex flex-col gap-2">
            <span>Institute</span>
            <Input
              required
              placeholder="e.g. NUST Islamabad"
              value={education.institute}
              onChange={(e) =>
                setEducation({
                  ...education,
                  institute: e.target.value,
                })
              }
              type="text"
            />
          </Label>
        </div>
        <Button
          disabled={status === "pending"}
          type="submit"
          className="my-2 flex gap-2 items-center w-full bg-indigo-600 hover:bg-indigo-500"
        >
          {status === "pending" ? (
            <Loading />
          ) : (
            <>
              <span className="flex-1">Next</span>{" "}
              <MdArrowRight className="text-xl text-white" />
            </>
          )}
        </Button>
      </form>
    </main>
  );
}

export default CompleteProfile;
