import { Course, User } from "@/db/models";
import { getServerSession } from "next-auth";
import Email from "next-auth/providers/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    const course_data = await request.json();
    const teacher = await User.findOne({ email: session?.user?.email });
    const new_course = new Course({ ...course_data, teacherId: teacher._id });
    const courseCreated = await new_course.save();
    if (courseCreated) {
      return NextResponse.json(
        {
          success: true,
          message: "Course created successfully",
        },
        { status: 201 }
      );
    }
  } catch (err) {
    console.log(err);
  }
}
