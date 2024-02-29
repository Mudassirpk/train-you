import connect_db from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/db/models";
import bcryptjs from "bcryptjs";
import { MongooseError } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connect_db();
    const user_data = await req.json();
    const hashed_password = await bcryptjs.hash(user_data.password, 10);
    const new_user = new User({
      name: user_data.name,
      email: user_data.email,
      password: hashed_password,
      role: user_data.role,
      phone:user_data.phone
    });

    const saved_user = await new_user.save();
    if (saved_user) {
      return NextResponse.json(
        {
          success: true,
          message: "Account created successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error)
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
