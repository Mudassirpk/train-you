import connect_db from "@/db/connection";
import { Session } from "@/db/models";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  connect_db();

  console.log(data);

  return NextResponse.json({ h: "i" });
}
