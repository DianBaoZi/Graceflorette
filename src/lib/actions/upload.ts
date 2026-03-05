"use server";

import { createServerClient } from "@/lib/supabase-server";
import { requireAdmin } from "@/lib/actions/admin-guard";
import { isValidStoragePath } from "@/lib/validate";

/** Maps validated MIME types to safe file extensions (never trusting the filename). */
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const VALID_MIME_TYPES = Object.keys(MIME_TO_EXT);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function uploadImage(formData: FormData) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  const file = formData.get("file") as File;

  if (!file) return { error: "No file provided" };

  // ── Validate MIME type (whitelist; do NOT trust filename extension) ─────────
  if (!VALID_MIME_TYPES.includes(file.type)) {
    return { error: "Invalid file type. Please upload JPG, PNG, or WebP images." };
  }

  // ── Validate file size ─────────────────────────────────────────────────────
  if (file.size > MAX_FILE_SIZE) {
    return { error: "File too large. Maximum size is 5 MB." };
  }

  try {
    const supabase = await createServerClient();

    // Derive extension from validated MIME type — never from the user's filename
    const fileExt = MIME_TO_EXT[file.type];
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return { error: "Upload failed. Please try again." };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(data.path);

    return { url: publicUrl, path: data.path };
  } catch {
    return { error: "An unexpected error occurred during upload." };
  }
}

export async function deleteImage(path: string) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  // ── Validate path (prevent path traversal) ─────────────────────────────────
  if (!isValidStoragePath(path)) {
    return { error: "Invalid file path." };
  }

  try {
    const supabase = await createServerClient();

    const { error } = await supabase.storage
      .from("product-images")
      .remove([path]);

    if (error) {
      console.error("Delete error:", error);
      return { error: "Delete failed. Please try again." };
    }

    return { success: true };
  } catch {
    return { error: "An unexpected error occurred during deletion." };
  }
}
