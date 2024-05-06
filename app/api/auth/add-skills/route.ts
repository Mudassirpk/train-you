import connect_db from "@/db/connection";
import { User } from "@/db/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const session = await getServerSession();
  const findBase = req.nextUrl.searchParams.get("userId")
    ? { _id: req.nextUrl.searchParams.get("userId") }
    : { email: session?.user?.email };

  await connect_db();
  const updatedUser = await User.updateOne(
    findBase,
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
