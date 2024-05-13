import connect_db from "@/db/connection";
import { Course, Earning, Enrollment, Session } from "@/db/models";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { teacherId: string } }
) {
  await connect_db();

  const coursesCreated = await Course.find({
    teacherId: params.teacherId,
  }).populate("enrollments");

  const enrollments = await Enrollment.countDocuments().populate({
    path: "courseId",
    match: { teacherId: params.teacherId },
  });

  let bestSelling;

  for (let course of coursesCreated) {
    if (bestSelling) {
      if (course.enrollments.length > bestSelling.enrollments.length) {
        bestSelling = course;
      }
    } else {
      bestSelling = course;
    }
  }

  const latestEvent = await Session.findOne({
    author: params.teacherId,
  })
    .sort({
      createdAt: -1,
    })
    .populate({
      path: "venue",
      select: "name",
    })
    .populate({
      path: "members",
      select: "name email",
    });

  const earnings = await Earning.find().populate({
    path: "course",
    match: { teacherId: params.teacherId },
  });

  const earningsPerCurrentMonth = earnings
    .filter((earning: any) => {
      return dayjs(earning.createdAt).format("MMMM") === dayjs().format("MMMM");
    })
    .map((e) => {
      return {
        amount: e.amount,
        month: dayjs().format("MMMM"),
      };
    });


  let ePM = 0;

  for (let earning of earningsPerCurrentMonth) {
    ePM += earning.amount;
  }

  return NextResponse.json({
    states: {
      enrollments,
      coursesCreated: coursesCreated.length,
      bestSelling,
      latestEvent,
      earnings: { amount: ePM, month: dayjs().format("MMMM") },
    },
  });
}
