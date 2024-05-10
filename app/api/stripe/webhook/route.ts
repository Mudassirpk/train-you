import connect_db from "@/db/connection";
import { Course, Earning, User } from "@/db/models";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (data.type === "checkout.session.completed") {
    const metadata = data.data.object.metadata;

    // find student id
    await connect_db();
    const student = await User.findOne({
      email: metadata.user_email,
    });

    const earning = new Earning({
      course: metadata.course_id,
      amount: data.data.object.amount_total / 100,
      student: student._id,
    });

    await earning.save()

    // find and update course teacher

    const course = await Course.findOne({
      _id: metadata.course_id,
    });

    await User.updateOne(
      {
        _id: course._id,
      },
      {
        $push: {
          earning: earning._id,
        },
      }
    );
  }

  // any response sent from here will go to stripe
  return NextResponse.json({}, { status: 200 });
}
