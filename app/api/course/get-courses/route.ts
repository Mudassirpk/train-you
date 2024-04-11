import connect_db from "@/db/connection";
import { Course, User } from "@/db/models";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  await connect_db();
  const teacher = await User.findOne({ email: session?.user?.email });
  const courses = await Course.find({ teacherId: teacher._id });
  return NextResponse.json({
    success: true,
    courses,
  });
}
