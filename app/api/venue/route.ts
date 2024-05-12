import connect_db from "@/db/connection";
import { Venue } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  await connect_db();
  const venues = await Venue.find({
    userId,
  })
    .populate({
      path: "media",
      populate: { path: "images videos" },
    })
    .sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    venues,
  });
}
