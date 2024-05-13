import connect_db from "@/db/connection";
import { Course, Enrollment } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { teacherId: string } },
) {
  await connect_db();

  const coursesCreated = await Course.find({
    teacherId: params.teacherId,
  }).populate("enrollments");

  const enrollments = await Enrollment.countDocuments().populate({
    path: "courseId",
    match: { teacherId: params.teacherId },
  });

  let bestSelling;

  for (let course of coursesCreated) {
    if (bestSelling) {
      if (course.enrollments.length > bestSelling.enrollments.length) {
        bestSelling = course;
      }
    } else {
      bestSelling = course;
    }
  }

  return NextResponse.json({
    states: {
      enrollments,
      coursesCreated: coursesCreated.length,
      bestSelling,
    },
  });
}
