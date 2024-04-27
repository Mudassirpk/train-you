import connect_db from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/db/models";
import nodeMailer from "nodemailer";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateRandomString } from "@/lib/utils";

async function sendMail(to: string, code: string) {
  const transporter = nodeMailer.createTransport({
    secure: true,
    service: "gmail",
    port: 465,
    auth: {
      user: process.env.HOST_GMAIL,
      pass: process.env.LESS_SECURE_PASSWORD,
    },
  });

  const reciever = {
    from: process.env.HOST_GMAIL,
    to,
    subject: "Train-You: Veriy your email",
    text: "Please verify your email",
    html: `<a class="padding:5px; background-color:purple;color:white;" href="${process.env.HOST_URL}/verify-email/${code}">Verify Your Email</a>`,
  };

  const res = await transporter.sendMail(reciever);
  return res;
}

export async function POST(req: NextRequest) {
  try {
    await connect_db();
    const user_data = await req.json();
    const hashed_password = await bcryptjs.hash(user_data.password, 10);

    const verificationCode = generateRandomString(6);
    const verificationToken = jwt.sign(
      { email: user_data.email, code: verificationCode },
      process.env.EMAIL_VERIFICATION_TOKEN!
    );

    const new_user = new User({
      name: user_data.name,
      email: user_data.email,
      password: hashed_password,
      role: user_data.role,
      phone: user_data.phone,
      details: {
        verificationCode,
        verified: false,
      },
    });

    const saved_user = await new_user.save();
    if (saved_user) {
      const response = await sendMail(new_user.email, verificationToken);
      if (response) {
        return NextResponse.json(
          {
            success: true,
            message:
              "Account created successfully. Verification code has been sent to your email: " +
              response.accepted[0],
          },
          { status: 201 }
        );
      }
    }
  } catch (error) {
    console.log(error);
    if ((error as any).code && (error as any).code === 11000) {
      return NextResponse.json({
        success: false,
        message: `User with the same ${
          Object.keys((error as any).keyValue)[0]
        } already exist`,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}
