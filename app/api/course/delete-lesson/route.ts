import { Lesson } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const lessonId = (await req.json()).lessonId;

    const deletedLesson = await Lesson.deleteOne({
      _id: lessonId,
    });

    return NextResponse.json({
      success: true,
      deletedLesson,
    });
  } catch (error) {
    console.log(error);
  }
}
