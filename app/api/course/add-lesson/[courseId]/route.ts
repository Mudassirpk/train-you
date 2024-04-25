import connect_db from "@/db/connection";
import { Course, ImageModal, Lesson, Media, Video } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const lessonData = await request.json();
  const { courseId } = params;

  try {
    await connect_db();

    const lessonMedia = lessonData.media;

    const media = new Media({});

    const images = [];
    const videos = [];

    for (let medium of lessonMedia) {
      if (medium.type === "image") {
        let image = new ImageModal({
          url: medium.fileUrl,
          mediaId: media._id,
          key: medium.filekey,
        });
        images.push(image._id);
        await image.save();
      } else if (medium.type === "video") {
        let video = new Video({
          url: medium.fileUrl,
          mediaId: media._id,
          key: medium.filekey,
        });
        videos.push(video._id);
        await video.save();
      }
    }

    const newLesson = new Lesson({
      title: lessonData.title,
      description: lessonData.description,
      thumbnail: lessonData.thumbnail,
      mediaId:media._id
    });

    await newLesson.save()

    const updatedCourse = await Course.findOneAndUpdate(
      {
        _id: courseId,
      },
      {
        lessons: {
          $push: newLesson._id,
        },
      }
    );

    if (updatedCourse)
      return NextResponse.json({
        success: true,
        data: updatedCourse,
      });

  } catch (error) {
    console.log(error);
  }
}
