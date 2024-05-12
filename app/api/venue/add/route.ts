import connect_db from "@/db/connection";
import { ImageModal, Media, User, Venue, Video } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const userId = req.nextUrl.searchParams.get("userId");

  try {
    connect_db();

    const venueMedia = new Media({});
    await venueMedia.save();

    console.log("media: ", data.media);
    if (data.media.length > 0) {
      const media = data.media;
      const images = [];
      const videos = [];

      for (let medium of media) {
        if (medium.type === "image") {
          let image = new ImageModal({
            url: medium.fileUrl,
            mediaId: venueMedia._id,
            key: medium.filekey,
          });
          images.push(image._id);
          await image.save();
        } else if (medium.type === "video") {
          let video = new Video({
            url: medium.fileUrl,
            mediaId: venueMedia._id,
            key: medium.filekey,
          });
          videos.push(video._id);
          await video.save();
        }
      }

      await Media.updateOne(
        {
          _id: venueMedia._id,
        },
        {
          images,
          videos,
        }
      );
    }

    const duplicateVenue = await Venue.findOne({
      name: data.name,
    });

    if (duplicateVenue) {
      return NextResponse.json({
        success: false,
        message: `Venue with name ${data.name} already exists`,
      });
    } else {
      const newVenue = new Venue({
        name: data.name,
        description: data.description,
        location: data.location,
        media: venueMedia._id,
        userId: userId,
      });

      newVenue.save();

      await User.updateOne(
        {
          _id: userId,
        },
        {
          $push: { venues: newVenue._id },
        }
      );

      return NextResponse.json({ success: true, venue: newVenue });
    }
  } catch (error) {
    console.log(error);
  }
}
