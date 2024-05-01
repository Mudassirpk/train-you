import z, { TypeOf } from "zod";
import { TFileUploadResponse } from "@/app/services/media/uploadFiles";
import { TbFileUpload } from "react-icons/tb";
export const createCourseSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title should be at least 5 characters long." }),
  description: z
    .string()
    .min(20, { message: "Description should be at least 20 characters long." }),
  thumbnail: z.instanceof(File).refine(
    (file: File) => {
      return file !== null || file !== undefined;
    },
    {
      message: "Please choose course thumbnail",
    }
  ),
  media: z
    .array(z.instanceof(File))
    .refine((files: File[]) => files.length !== 0, {
      message: "Please select at least one media(Image/Video) for your course.",
    }),
  price: z
    .number()
    .min(1, { message: "Price should be greater than zero (0)" }),
});

export type TCreateCourseType = z.infer<typeof createCourseSchema>;

export const lessonSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.instanceof(File).refine(
    (file: File) => {
      return file !== null || file !== undefined;
    },
    {
      message: "Please choose course thumbnail",
    }
  ),
  media: z
    .array(z.instanceof(File))
    .refine((files: File[]) => files.length !== 0, {
      message: "Please select at least one media(Image/Video) for your course.",
    }),
});

export type TLesson = z.infer<typeof lessonSchema>;
