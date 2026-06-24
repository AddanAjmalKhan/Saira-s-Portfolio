import { NextRequest, NextResponse } from "next/server";
import { ensureAuth, unauthorized, badRequest, serverError } from "@/lib/api";
import { isCloudinaryConfigured, uploadImage } from "@/lib/cloudinary";

export const runtime = "nodejs";

// POST /api/upload  (multipart form-data, field "file") -> { url }
export async function POST(req: NextRequest) {
  if (!(await ensureAuth())) return unauthorized();
  if (!isCloudinaryConfigured()) {
    return badRequest(
      "Image uploads are not configured. Set CLOUDINARY_* env vars, or paste an image URL instead.",
    );
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof File)) return badRequest("No file provided.");
    if (file.size > 10 * 1024 * 1024) return badRequest("File too large (max 10 MB).");

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadImage(buffer);
    return NextResponse.json({ url });
  } catch (e) {
    console.error(e);
    return serverError("Upload failed.");
  }
}
