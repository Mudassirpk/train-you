import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB" },
    video: { maxFileSize: "1GB" },
  }).onUploadComplete(async ({ file }: any) => {
    console.log("file url", file.url);
    return { success: true };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
