import { Course, Lesson } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lessonId = body.lessonId;
    const courseId = body.courseId;

    const deletedLesson = await Lesson.deleteOne({
      _id: lessonId,
    });

    await Course.updateOne(
      {
        _id: courseId,
      },
      { $pull: { lessons: lessonId } }
    );

    return NextResponse.json({
      success: true,
      deletedLesson,
    });
  } catch (error) {
    console.log(error);
  }
}
