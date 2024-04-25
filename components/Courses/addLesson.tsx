import React, { useState } from "react";
import Modal from "../modal";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLesson, lessonSchema } from "@/zod/schema";
import { register } from "module";
import MediaPreview from "../media-preview";
import MediaGrid from "../media-grid";
import { uploadFile, uploadFiles } from "@/app/services/media/uploadFiles";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

type Props = {};

function AddLesson({}: Props) {
  const {courseId} = useParams()
  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [media, setMedia] = useState<File[]>([]);

  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<TLesson>({ resolver: zodResolver(lessonSchema) });

  const {} = useMutation({
    mutationKey:['create-lesson'],
    mutationFn:async ()=> await axios.post(`/api/course/add-lesson/${}`)
  })

  async function createLesson(data: TLesson) {
    if (thumbnail && media.length > 0) {
      const thumbnailUploaded = await uploadFile(data.thumbnail);
      const mediaUploaded = await uploadFiles(data.media);

      const newLesson = {
        ...data,
        thumbnail: thumbnailUploaded,
        media: mediaUploaded,
      };
    }
    console.log(data);
  }

  return (
    <Modal
      title="Add new lesson"
      triggerTitle="Add Lesson"
      description="Add new lesson"
    >
      <form
        onSubmit={handleSubmit(createLesson)}
        className="flex flex-col gap-4"
      >
        <Label className="w-full flex gap-2 flex-col">
          <span>Title</span>
          <Input
            {...register("title")}
            type="text"
            placeholder="e.g. Lesson x - New ways"
          />
        </Label>
        <Label className="w-full flex gap-2 flex-col">
          <span>Description</span>
          <Textarea
            {...register("description")}
            placeholder="e.g. You will learn many new things."
          />
        </Label>
        <Label className="w-full flex gap-2 flex-col">
          <span>Thumbnail</span>
          <Input
            accept="image/jpeg, image/png, image/gif, video/mp4"
            type="File"
            multiple={false}
            onChange={(e) => {
              if (e.target.files) {
                setValue("thumbnail", e.target.files[0]);
                setThumbnail(e.target.files[0]);
              }
            }}
            placeholder="e.g. Lesson x - New ways"
          />
          {thumbnail ? <MediaPreview media={thumbnail} /> : null}
        </Label>
        <Label className="w-full flex gap-2 flex-col">
          <span>
            Media{" "}
            <span className="text-gray-700">
              (Videos/Images for the lesson)
            </span>
          </span>
          <Input
            className="cursor-pointer"
            onChange={(e) => {
              if (e.target.files) {
                if (getValues("media")) {
                  setValue("media", [
                    ...getValues("media").concat(Array.from(e.target.files)),
                  ]);
                } else {
                  setValue("media", Array.from(e.target.files));
                }
                setMedia([...media, ...Array.from(e.target.files)]);
              }
            }}
            multiple={true}
            type="File"
            placeholder="e.g. Lesson x - New ways"
          />
          <MediaGrid media={media} />
        </Label>
        <Button className="w-full py-2 rounded-xl text-white font-semibold bg-indigo-600 hover:bg-indigo-500">
          Add Lesson
        </Button>
      </form>
    </Modal>
  );
}

export default AddLesson;
