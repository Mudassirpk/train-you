import connect_db from "@/db/connection";
import { Course, User } from "@/db/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  await connect_db();

  const user = await User.findOne({ _id: userId }).populate("courses");

  if (user) {
    const courses = await Course.find({
      teacherId: userId,
    }).populate("reviews");

    let totalRattings = 0;
    let sumOfRattings = 0;

    for (let course of courses) {
      for (let review of course.reviews) {
        totalRattings += 1;
        sumOfRattings += parseInt(review.rattings);
      }
    }

    const averageRattings = sumOfRattings / totalRattings;

    user.password = null;
    user.details.averageRattings = averageRattings;

    return NextResponse.json({
      success: true,
      user,
    });
  }

  return NextResponse.json({
    success: false,
    message: "user not found",
  });
}
