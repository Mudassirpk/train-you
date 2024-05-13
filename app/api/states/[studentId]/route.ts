import connect_db from "@/db/connection";
import { Enrollment, Session, User } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { studentId: string } }
) {
  await connect_db();
  const coursesEnrolled = await Enrollment.countDocuments({
    userId: params.studentId,
  });

  const latestEvent = await Session.findOne({
    members: {
      $in: [params.studentId],
    },
  })
    .sort({
      createdAt: -1,
    })
    .populate({
      path: "venue",
      select: "name",
    })
    .populate({
      path: "members",
      select: "name email",
    });

  console.log(coursesEnrolled);

  return NextResponse.json({ states: { coursesEnrolled, latestEvent } });
}
