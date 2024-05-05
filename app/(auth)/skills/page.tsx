"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

export default function Skills() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const [skills, setSkills] = useState<string[]>([]);
  const [skillsString, setSkillsString] = useState<string>("");

  const { mutate, status } = useMutation({
    mutationKey: ["add-skills"],
    mutationFn: async () =>
      await axios.post(
        `/api/auth/add-skills?userId=${searchParams.get("userId")}`,
        { skills }
      ),
    onSuccess(data) {
      if (data?.data.success) {
        toast({
          title: "Profile Setup",
          description: "Your profile has been setup successfully",
        });
        router.push("/login");
      }
    },
  });

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[400px] py-4 flex flex-col gap-2">
        <h1 className="text-2xl mb-2 text-indigo-600 font-bold">
          Add skills to your profile
        </h1>
        <div className="w-full flex items-start gap-2">
          <div className="w-full flex-1">
            <Input
              className="mb-2"
              type="text"
              placeholder="e.g. html css js"
              value={skillsString}
              onChange={(e) => setSkillsString(e.target.value)}
            />
            <span>(Add multiple skills separated by space)</span>
          </div>
          <Button
            disabled={skillsString.length === 0}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-400"
            onClick={() => {
              if (skillsString.length > 0) {
                let skillsExtracted = skillsString.split(" ");
                for (let s of skills) {
                  skillsExtracted = skillsExtracted.filter((se) => se !== s);
                }
                setSkills([...skills, ...skillsExtracted]);
                setSkillsString("");
              }
            }}
          >
            Add
          </Button>
        </div>

        <div className="w-full flex gap-4 items-center flex-wrap my-4">
          {skills.map((skill) => (
            <p className="px-4 py-1 rounded-xl bg-indigo-100 text-indigo-900 relative">
              <MdCancel
                onClick={() => {
                  setSkills(skills.filter((s) => s !== skill));
                }}
                className="text-red-500 absolute -top-2 -right-2 cursor-pointer text-xl"
              />
              {skill}
            </p>
          ))}
        </div>
        <Button
          onClick={() => {
            mutate();
          }}
          disabled={skills.length === 0 || status === "pending"}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-400"
        >
          {status === "pending" ? <Loading /> : "Save information"}
        </Button>
      </div>
    </main>
  );
}
