import connect_db from "@/db/connection";
import { Course, User } from "@/db/models";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Media } from "@/db/models";

export async function GET() {
  const session = await getServerSession();
  await connect_db();
  const teacher = await User.findOne({ email: session?.user?.email });
  const courses = await Course.find({ teacherId: teacher._id }).populate({
    path: "mediaId",
    populate: { path: "videos images" },
  });
  // for (let course of courses) {
  //   const courseMedia = await Media.findOne({ _id: course.mediaId });
  //   course.media = courseMedia;
  // }
  return NextResponse.json({
    success: true,
    courses,
  });
}
