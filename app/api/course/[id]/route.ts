import connect_db from "@/db/connection";
import { Course } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";
import { Media } from "@/db/models";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connect_db();
    const course = await Course.findOne({ _id: id }).populate({
      path: "mediaId",
      populate: { path: "images videos" },
    });

    return NextResponse.json({
      success: true,
      course,
    });
  } catch (error) {
    console.log(error);
  }
}
