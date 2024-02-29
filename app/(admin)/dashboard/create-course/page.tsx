'use client'
import MediaPreview from "@/components/media-preview";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function AddNewCourse() {
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  return (
    <main className="flex-1 h-screen py-4 pr-4">
      <section className="w-full h-full p-2 rounded-lg border-2 border-indigo-600">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-indigo-600 font-semibold py-1 px-2">
            Create new course
          </h1>
        </div>
        <Separator className="my-2" />{" "}
        <div className="w-full p-4 border-2 border-indigo-600 rounded-lg">
          <h2 className="font-semibold text-xl text-indigo-600 mb-4">
            Create Course
          </h2>
          <form className="w-full flex flex-col gap-4">
            <Label className="space-y-2">
              <span>Title</span>
              <Input type="text" placeholder="e.g. Swimming 101" />
            </Label>
            <Label className="space-y-2">
              <span>Description</span>
              <Textarea placeholder="e.g. Swimming 101" />
            </Label>
            <Label className="space-y-2">
              <span>Thumbnail</span>
              <Input
                accept="image/jpeg, image/png, image/gif, video/mp4"
                type="File"
                placeholder="e.g. Swimming 101"
                onChange={(e) => {
                  if (e.target.files) {
                    setThumbnail(e.target.files[0]);
                  }
                }}
              />
              {thumbnail ? <MediaPreview media={thumbnail} /> : null}
            </Label>
            <Label className="space-y-2">
              <span>Media (contains course images and videos)</span>
              <Input
                multiple={true}
                type="File"
                placeholder="e.g. Swimming 101"
              />
            </Label>
          </form>
        </div>
      </section>
    </main>
  );
}
