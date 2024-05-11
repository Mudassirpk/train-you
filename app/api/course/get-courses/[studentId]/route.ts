import { Enrollment } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { studentId: string } }
) {
  const studentId = params.studentId;

  const courses = (
    await Enrollment.find({
      userId: studentId,
    }).populate("courseId")
  ).map((enrollment: any) => enrollment.courseId);

  return NextResponse.json({ success: true, courses });
}
