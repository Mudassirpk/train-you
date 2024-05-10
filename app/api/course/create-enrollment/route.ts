import connect_db from "@/db/connection";
import { Enrollment, Lesson, User } from "@/db/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    const student = await User.findOne({
      email: session?.user?.email,
    });

    const data = await req.json();

    await connect_db();

    const atLesson = await Lesson.findOne(
      {
        courseId: data.courseId,
      },
      {},
      { sort: { _id: 1 } }
    );


    const newEnrollment = new Enrollment({
      courseId: data.courseId,
      atLesson: atLesson?._id,
      completed: false,
      userId: student._id,
    });

    await newEnrollment.save()

    await User.updateOne(
      {
        _id: student._id,
      },
      {
        $push: {
          enrollments: newEnrollment._id,
        
        },
      }
    );

    const studentPresentForTeacher = await User.findOne({
      _id: data.instructorId,
      students: student._id,
    });
    if (!studentPresentForTeacher) {
      await User.updateOne(
        {
          _id: data.instructorId,
        },
        {
          $push: {
            students: student._id,
          },
        }
      );
    }

    return NextResponse.json({
      success: true,
      enrollment: newEnrollment,
    });
  } catch (error) {
    console.log(error);
  }
}
