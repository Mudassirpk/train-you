import React, { useState } from "react";
import Modal from "../modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { MdCancel } from "react-icons/md";
import Loading from "../loading";
import { toast } from "../ui/use-toast";

type Props = { skills: string[] };

function EditSkills({ skills }: Props) {
  const [newSkills, setNewSkills] = useState<string[]>(skills);
  const [skillsString, setSkillsString] = useState<string>("");

  const { mutate, status } = useMutation({
    mutationKey: ["add-skills"],
    mutationFn: async () =>
      await axios.post(`/api/auth/add-skills`, { skills: newSkills }),
    onSuccess(data) {
      if (data?.data.success) {
        toast({
          title: "Profile Setup",
          description: "Your profile has been setup successfully",
        });
      }
    },
  });
  return (
    <div className="w-full">
      <p className="text-xl w-full flex justify-between items-center mt-2 font-semibold text-gray-700">
        Skills
        <Modal
          no_scroll={true}
          title="Add Skill"
          triggerTitle="Add Skill"
          triggerStyles="bg-transparent underline underline-offset-8 text-gray-700 hover:bg-transparent hover:scale"
        >
          <form onSubmit={(e) => e.preventDefault()}>
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
                      skillsExtracted = skillsExtracted.filter(
                        (se) => se !== s
                      );
                    }
                    setNewSkills([...newSkills, ...skillsExtracted]);
                    setSkillsString("");
                  }
                }}
              >
                Add
              </Button>
            </div>

            <div className="w-full flex gap-4 items-center flex-wrap my-4">
              {newSkills.map((skill) => (
                <p className="px-4 py-1 rounded-xl bg-indigo-100 text-indigo-900 relative">
                  <MdCancel
                    onClick={() => {
                      setNewSkills(newSkills.filter((s) => s !== skill));
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
              className="bg-indigo-600 w-full hover:bg-indigo-500 disabled:bg-gray-400"
            >
              {status === "pending" ? <Loading /> : "Save information"}
            </Button>
          </form>
        </Modal>
      </p>
      <div className="flex mt-2 gap-2 items-center flex-wrap">
        {newSkills.map((skill: string) => {
          return (
            <p
              key={skill}
              className="px-3 py-1 rounded-xl bg-indigo-100 text-indigo-900"
            >
              {skill}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default EditSkills;
