import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdminAuthorizationValid } from "@/lib/admin-auth";
import { isAdminUploadTokenValid } from "@/lib/admin-upload-token";

const ADMIN_UPLOAD_HEADER = "x-lignorae-admin-upload-token";
const MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody;

    if (
      body.type === "blob.generate-client-token" &&
      !isAdminAuthorizationValid(request.headers.get("authorization")) &&
      !isAdminUploadTokenValid(request.headers.get(ADMIN_UPLOAD_HEADER))
    ) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("pieces/")) {
          throw new Error("Invalid upload pathname.");
        }

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
          ],
          maximumSizeInBytes: MAX_IMAGE_SIZE_BYTES,
          tokenPayload: JSON.stringify({ pathname }),
        };
      },
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Blob upload failed.",
      },
      { status: 400 }
    );
  }
}
