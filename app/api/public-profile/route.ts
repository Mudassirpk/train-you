import connect_db from "@/db/connection";
import { User } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const userId = req.nextUrl.searchParams.get('userId')

  await connect_db();

  const user = await User.findOne({ _id: userId }).populate('courses');

  if (user) {
    user.password = null;
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
