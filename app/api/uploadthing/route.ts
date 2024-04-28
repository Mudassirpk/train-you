import { createNextRouteHandler } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

import { ourFileRouter } from "./core";
import { NextRequest, NextResponse } from "next/server";

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(request: NextRequest) {
  const urls: string[] = (await request.json()).urls;
  const files = urls.map((url: string) =>
    url.substring(url.lastIndexOf("/") + 1)
  );

  const utapi = new UTApi();

  await utapi.deleteFiles(files);

  return NextResponse.json({
    success: true,
  });
}
