import { DANGEROUS__uploadFiles } from "uploadthing/client";

type TFileUploadResponse = { fileKey: string; fileUrl: string } | void;

export async function uploadFile(file: File): Promise<TFileUploadResponse> {
  const response = await DANGEROUS__uploadFiles({
    endpoint: "imageUploader",
    files: [file],
  });
  if (response) {
    return {
      fileKey: response[0].fileKey,
      fileUrl: response[0].fileUrl,
    };
  }
}

export async function uploadFiles(
  files: File[]
): Promise<TFileUploadResponse[] | void> {
  const responses = [];
  for (let file of files) {
    responses.push(await uploadFile(file));
  }
  return responses;
}
