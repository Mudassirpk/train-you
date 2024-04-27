import connect_db from "@/db/connection";
import { Course, Lesson } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  console.log("------------ getting lessons --------------------");
  const { courseId } = params;

  try {
    await connect_db();

    const course = await Course.findOne({ _id: courseId });

    const lessonIds = course.lessons;
    console.log(
      "lids: ",
      lessonIds.map((oi: any) => oi.toString())
    );
    const lessons = await Lesson.find({
      _id: {
        $in: lessonIds.map((oi: any) => oi.toString()),
      },
    }).populate({
      path: "mediaId",
      populate: { path: "videos images" },
    });

    console.log("lessons: ", lessons);

    return NextResponse.json({
      success: true,
      lessons,
    });
  } catch (error) {
    console.log(error);
  }
}
