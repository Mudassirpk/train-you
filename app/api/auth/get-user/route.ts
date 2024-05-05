import connect_db from "@/db/connection";
import { User } from "@/db/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  await connect_db();
  const user = await User.findOne({
    email: session?.user?.email,
  });

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
