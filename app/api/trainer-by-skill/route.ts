import connect_db from "@/db/connection";
import { User } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const data = await req.json();

  await connect_db();

  const regexPattern = data.skills.map(
    (skill: string) => new RegExp(skill, "i")
  );

  const trainers = (await User.find({
    role: "teacher",
    "details.skills": {
      $in: regexPattern,
    },
  })).map((trainer: any) => {
    trainer.password = null;
    return trainer;
  });

  return NextResponse.json({ trainers });
}
