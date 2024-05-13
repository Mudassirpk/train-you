import { User } from "@/db/models";
import { TUser } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const teacherId = req.nextUrl.searchParams.get("userId");

  const instructor = await User.findOne({
    _id: teacherId,
  }).populate("students");

  console.log('i: ',instructor)
  const students = instructor.students.map((student: TUser) => {
    student.password = null;
    return student
  });

  return NextResponse.json({ students });
}
