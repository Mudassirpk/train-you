import connect_db from "@/db/connection";
import { Session } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { studentId: string } }
) {
  const studentId = params.studentId;

  await connect_db();
  const events = await Session.find({
    members: {
      $in: [studentId],
    },
  })
    .populate({
      path: "venue",
      select: "name",
    })
    .populate({
      path: "members",
      select: "name email",
    });

  return NextResponse.json({ events });
}
