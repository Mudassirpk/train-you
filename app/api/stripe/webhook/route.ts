import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  // any response sent from here will go to stripe
  return NextResponse.json({}, { status: 200 });
}
