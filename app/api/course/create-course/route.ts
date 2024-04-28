import { Course, Media, User, Video } from "@/db/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ImageModal } from "@/db/models";
import connect_db from "@/db/connection";

export async function POST(request: NextRequest) {
  try {
    await connect_db();
    const session = await getServerSession();
    const course_data = await request.json();
    const media = course_data.media;
    const teacher = await User.findOne({ email: session?.user?.email });

    const courseMedia = new Media({});
    await courseMedia.save();

    const images = [];
    const videos = [];

    for (let medium of media) {
      if (medium.type === "image") {
        let image = new ImageModal({
          url: medium.fileUrl,
          mediaId: courseMedia._id,
          key: medium.filekey,
        });
        images.push(image._id);
        await image.save();
      } else if (medium.type === "video") {
        let video = new Video({
          url: medium.fileUrl,
          mediaId: courseMedia._id,
          key: medium.filekey,
        });
        videos.push(video._id);
        await video.save();
      }
    }

    const new_course = new Course({
      ...course_data,
      thumbnail: course_data.thumbnail.fileUrl,
      teacherId: teacher._id,
      mediaId: courseMedia._id,
    });

    await Media.findOneAndUpdate(
      { _id: courseMedia._id },
      {
        videos,
        images,
        course: new_course._id,
      }
    );

    const courseCreated = await new_course.save();

    if (courseCreated) {
      return NextResponse.json(
        {
          success: true,
          message: "Course created successfully",
        },
        { status: 201 }
      );
    }

  } catch (err) {
    console.log(err);
  }
}
