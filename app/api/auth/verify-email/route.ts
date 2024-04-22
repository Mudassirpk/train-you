import { User } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("verify email triggered");
  try {
    const { token, email } = await req.json();
    console.log("token: ", token);
    console.log("email: ", email);
    const userVerified = await User.findOne({
      email: email,
    });
    console.log('user: ',userVerified)
    if (userVerified && userVerified.details.verificationCode === token) {
      await User.findOneAndUpdate(
        {
          email: userVerified.email,
        },
        {
          details: {
            verified: true,
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
