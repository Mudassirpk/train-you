import connect_db from "@/db/connection";
import { Course, User } from "@/db/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Media } from "@/db/models";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  const is_public = req.nextUrl.searchParams.get("is_public");
  const session = await getServerSession();

  await connect_db();

  let courses = [];

  if (is_public) {
    courses = await Course.find({
      $or: [
        { title: { $regex: query ? query : "", $options: "i" } },
        { description: { $regex: query ? query : "", $options: "i" } },
      ],
    }).populate("reviews");

  } else {
    const teacher = await User.findOne({ email: session?.user?.email });
    courses = await Course.find({ teacherId: teacher._id })
      .populate({
        path: "mediaId",
        populate: { path: "videos images" },
      })
      .populate("reviews");
  }

  return NextResponse.json({
    success: true,
    courses,
  });
}
