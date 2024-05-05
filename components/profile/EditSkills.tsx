import React, { useState } from "react";
import Modal from "../modal";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = { skills: string[] };

function EditSkills({ skills }: Props) {
  const [newSkills, setNewSkills] = useState<Array<string>>([]);

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
            <Label className="w-full flex gap-2 flex-col">
              <span>Skill (add multiple skills separated by space)</span>
              <Input
                onChange={(e) => {
                  const skillsExtracted = e.target.value.split(" ");
                  setNewSkills([...newSkills, ...skillsExtracted]);
                }}
                type="text"
                className="border border-gray-400"
                placeholder="e.g. html css php"
              />
            </Label>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 mt-2">
              Add
            </Button>
          </form>
        </Modal>
      </p>
      <div className="flex mt-2 gap-2 items-center flex-wrap">
        {skills.map((skill: string) => {
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
