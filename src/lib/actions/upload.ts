"use server";

import { createServerClient } from "@/lib/supabase-server";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file provided" };
  }

  // Validate file type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return { error: "Invalid file type. Please upload JPG, PNG, or WebP images." };
  }

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return { error: "File too large. Maximum size is 5MB." };
  }

  try {
    const supabase = await createServerClient();

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return { error: `Upload failed: ${error.message}` };
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(data.path);

    return { url: publicUrl, path: data.path };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "An unexpected error occurred during upload" };
  }
}

export async function deleteImage(path: string) {
  try {
    const supabase = await createServerClient();

    const { error } = await supabase.storage
      .from("product-images")
      .remove([path]);

    if (error) {
      console.error("Delete error:", error);
      return { error: `Delete failed: ${error.message}` };
    }

    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { error: "An unexpected error occurred during deletion" };
  }
}
