import connect_db from "@/db/connection";
import { Session, User } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const userId = req.nextUrl.searchParams.get("userId");

  connect_db();

  const members = (
    await User.find({
      email: {
        $in: data.members,
      },
    }).select("_id")
  ).map((user: any) => user._id);

  let event;
  if (data.type === "online") {
    event = new Session({
      author: userId,
      title: data.title,
      description: data.description,
      timestamp: data.timestamps,
      venues: data.venues,
      members: members,
      links: data.links,
      type: data.type,
    });
  } else {
    event = new Session({
      author: userId,
      title: data.title,
      description: data.description,
      timestamp: data.timestamps,
      venues: data.venues,
      members: members,
      venue: data.venue,
      type: data.type,
    });
  }

  await event.save();

  return NextResponse.json({ success: true, event });
}
