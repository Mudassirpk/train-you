import { User } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token, email } = await req.json();
    const userVerified = await User.findOne({
      email: email,
    });

    if (userVerified && userVerified.details.verificationCode === token) {
      await User.updateOne(
        {
          email: userVerified.email,
        },
        {
          $set: {
            "details.verified": true,
          },
        }
      );
      return NextResponse.json({
        success: true,
        message: "email verified successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (err) {
    console.log(err);
  }
}
