import { Enrollment, User } from "@/db/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  const course_id = req.nextUrl.searchParams.get("courseId");

  const student = await User.findOne({
    email: session?.user?.email,
  });

  console.log(course_id, " : ", student);

  const enrollment = await Enrollment.findOne({
    courseId: course_id,
    userId: student._id,
  });

  if (enrollment) {
    return NextResponse.json({
      enrolled: true,
    });
  } else {
    return NextResponse.json({
      enrolled: false,
    });
  }
}
