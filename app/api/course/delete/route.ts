import { Course, Lesson, Media } from "@/db/models";
import { User } from "@/db/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get('courseId')

  const email = (await getServerSession())?.user?.email

  // delete all the lessons related to course and its corresponding media

  const course = await Course.findOne({
    _id: courseId
  })


  const lessonsToDelete = course.lessons

  const lessons = await Lesson.find({
    _id: {
      $in: lessonsToDelete
    }
  }).populate({
    path: "mediaId",
    populate: { path: "videos images" },
  });

  for (let lesson of lessons) {
    const utapi = new UTApi()
    const media = await Media.findOne({
      lesson: lesson._id
    })

    const urls = [lesson.thumbnail]

    for (let video of lesson.mediaId.videos) {
      urls.push(video.url)
    }

    for (let image of lesson.mediaId.images) {
      urls.push(image.url)
    }

    const files = urls.map((url: string) =>
      url.substring(url.lastIndexOf("/") + 1)
    );

    await utapi.deleteFiles(files)
  }

  await Lesson.deleteMany({
    lessons: {
      $in: lessonsToDelete
    }
  })

  await Course.deleteOne({
    _id: courseId
  })

  await User.findOneAndUpdate({
    email: email
  }, {
    $pull: { courses: courseId }
  })

  return NextResponse.json({
    success: true
  })
}
