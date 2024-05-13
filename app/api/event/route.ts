import connect_db from "@/db/connection";
import { Session } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  await connect_db()

  const events = await Session.find({
    author: userId,
  })
    .populate({
      path: "venue",
      select: "name",
    })
    .populate({
      path: "members",
      select: "name email",
    });

  return NextResponse.json({
    success: true,
    events,
  });
}
