"use client";
import MediaPreview from "@/components/media-preview";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createCourseSchema, createCourseType } from "@/zod/schema";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import MediaGrid from "@/components/media-grid";

export default function AddNewCourse() {
  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [media, setMedia] = useState<File[]>([]);
  const { register, getValues, setValue } = useForm<createCourseType>({
    resolver: zodResolver(createCourseSchema),
  });

  return (
    <main className="flex-1 h-screen py-4 pr-4">
      <section className="w-full h-full p-2 flex flex-col  rounded-lg border-2 border-indigo-600">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-indigo-600 font-semibold py-1 px-2">
            Create new course
          </h1>
        </div>
        <Separator className="my-2" />{" "}
        <div className="w-full flex-1 p-4 overflow-y-scroll">
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              console.log(getValues("thumbnail"));
            }}
            className="w-full flex flex-col gap-4"
          >
            <Label className="space-y-2">
              <span>Title</span>
              <Input
                {...register("title")}
                type="text"
                placeholder="e.g. Swimming 101"
              />
            </Label>
            <Label className="space-y-2">
              <span>Description</span>
              <Textarea
                {...register("description")}
                placeholder="e.g. Swimming 101"
              />
            </Label>
            <Label className="space-y-2 cursor-pointer">
              <span>Thumbnail</span>
              <Input
                accept="image/jpeg, image/png, image/gif, video/mp4"
                type="File"
                multiple={false}
                className="cursor-pointer"
                placeholder="e.g. Swimming 101"
                onChange={(e) => {
                  if (e.target.files) {
                    setValue("thumbnail", e.target.files[0]);
                    setThumbnail(e.target.files[0]);
                  }
                }}
              />
              {thumbnail ? <MediaPreview media={thumbnail} /> : null}
            </Label>
            <Label className="space-y-2 cursor-pointer">
              <span>Media (contains course images and videos)</span>
              <Input
                className="cursor-pointer"
                onChange={(e) => {
                  if (e.target.files) {
                    if (getValues("media")) {
                      setValue("media", [
                        ...getValues("media").concat(
                          Array.from(e.target.files)
                        ),
                      ]);
                    } else {
                      setValue("media", Array.from(e.target.files));
                    }
                    setMedia([...media, ...Array.from(e.target.files)]);
                  }
                }}
                multiple={true}
                type="File"
                placeholder="e.g. Swimming 101"
              />
            </Label>
            <MediaGrid media={media} />
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white hover:bg-indigo-500"
            >
              Create course
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
