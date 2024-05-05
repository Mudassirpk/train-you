import connect_db from "@/db/connection";
import { User } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const userId = req.nextUrl.searchParams.get("userId");

  await connect_db();
  const updatedUser = await User.updateOne(
    {
      _id: userId,
    },
    {
      $set: {
        "details.skills": data.skills,
      },
    },
    { new: true }
  );

  if (updatedUser) {
    return NextResponse.json({ success: true });
  }
}
