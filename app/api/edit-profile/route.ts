import connect_db from "@/db/connection";
import { User } from "@/db/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const data = await req.json();
  try {
    await connect_db();
    if (data.personalInformation) {
      await User.updateOne(
        {
          email: session?.user?.email,
        },
        {
          ...data.personalInformation,
        }
      );
    }

    const educationDataKeys = Object.keys(data.education);
    if (educationDataKeys.length > 0) {
      let educationDetails: { [key: string]: string } = {};

      // only trigger education data update if user changed the anything at the frontend
      let educationUpdateRequired = false;

      for (let key of educationDataKeys) {
        if (data.education[key].length > 0) {
          educationUpdateRequired = true;
        }
        educationDetails[`details.${key}`] = data.education[key];
      }
      console.log(educationUpdateRequired);
      if (educationUpdateRequired) {
        await User.updateOne(
          {
            email: session?.user?.email,
          },
          {
            $set: {
              ...educationDetails,
            },
          }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}
