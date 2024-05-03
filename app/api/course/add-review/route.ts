import { Course, Review, User } from "@/db/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sesson = await getServerSession();

  const body = await req.json();

  try {
    const byUser = await User.findOne({ email: sesson?.user?.email });

    const newReview = new Review({
      by: byUser._id,
      message: body.message,
      rattings: body.rattings,
      course: body.courseId,
    });

    const updateCourse = await Course.findOneAndUpdate(
      {
        _id: body.courseId,
      },
      {
        $push: {
          reviews: newReview._id,
        },
      },
      { new: true }
    );

    await newReview.save();

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
}
