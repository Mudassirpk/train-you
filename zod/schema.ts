import z from "zod";

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title should be atleast 5 characters long." }),
  description: z
    .string()
    .min(20, { message: "Description should be atleast 20 characters long." }),
  thumbnail: z
    .instanceof(File)
    .refine((file: File) => file === null || file === undefined, {
      message: "Please choose course thumbnail",
    }),
  media: z
    .array(z.instanceof(File))
    .refine((files: File[]) => files.length === 0, {
      message: "Please select atleast on media(Image/Video) for your course.",
    }),
});

export type createCourseType = z.infer<typeof createCourseSchema>;
