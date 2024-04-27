"use client";
import MediaPreview from "@/components/media-preview";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createCourseSchema, TCreateCourseType } from "@/zod/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import MediaGrid from "@/components/media-grid";
import { uploadFile, uploadFiles } from "@/app/services/media/uploadFiles";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/loading";
import { useToast } from "@/components/ui/use-toast";

export default function AddNewCourse() {
  const { toast } = useToast();
  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [media, setMedia] = useState<File[]>([]);
  const [filesUploadInProgress, setFilesUploadInProgress] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TCreateCourseType>({
    resolver: zodResolver(createCourseSchema),
  });

  const { mutate, status } = useMutation({
    mutationKey: ["create-course"],
    mutationFn: async (course: any) =>
      await axios.post("/api/course/create-course", course),
    onSuccess(data) {
      if (data?.data.success) {
        reset();
        setMedia([]);
        setThumbnail(undefined);
        toast({
          title: "Create Course",
          description: data?.data.message,
        });
      }
    },
  });

  async function createCourse(course: TCreateCourseType) {
    setFilesUploadInProgress(true);
    const thumbnailUploaded = await uploadFile(course.thumbnail);
    const mediaUploaded = await uploadFiles(course.media);

    if (thumbnailUploaded && mediaUploaded) {
      setFilesUploadInProgress(false);

      const newCourse = {
        ...course,
        thumbnail: thumbnailUploaded,
        media: mediaUploaded,
      };

      mutate(newCourse);
    } else {
      setFilesUploadInProgress(false);
      console.log("could not upload files");
    }
  }

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
            onSubmit={handleSubmit(async (course: TCreateCourseType) => {
              await createCourse(course);
            })}
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
                accept="image/jpeg, image/png, image/gif, video/mp4"
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
              disabled={status === "pending" || filesUploadInProgress}
              type="submit"
              className="w-full bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-gray-200"
            >
              {status === "pending" || filesUploadInProgress ? (
                <Loading
                  textColor="gray-800"
                  message={
                    filesUploadInProgress
                      ? "Uploading course media"
                      : "Saving course information"
                  }
                />
              ) : (
                "Create Course"
              )}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
