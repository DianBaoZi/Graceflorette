"use server";

import { createServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/actions/admin-guard";
import {
  sanitizeText,
  sanitizeOptional,
  isValidSlug,
  isValidPrice,
  isValidUUID,
  isValidTag,
  parseStringArray,
} from "@/lib/validate";

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createProduct(formData: FormData) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  // ── Input extraction & sanitization ────────────────────────────────────────
  const name = sanitizeText(formData.get("name"), 200);
  const description = sanitizeOptional(formData.get("description"), 2000) || null;
  const categoryId = sanitizeOptional(formData.get("category_id"), 36) || null;
  const isAvailable = formData.get("is_available") === "true";
  const isFeatured = formData.get("is_featured") === "true";

  const rawImages = parseStringArray(formData.get("images") as string);
  const rawTags = parseStringArray(formData.get("tags") as string) ?? [];

  let slug = sanitizeOptional(formData.get("slug"), 200);

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!name) return { error: "Product name is required" };
  if (name.length > 200) return { error: "Product name is too long (max 200 characters)" };

  const priceRaw = formData.get("price");
  if (!isValidPrice(priceRaw)) return { error: "Valid price is required (between $0.01 and $99,999)" };
  const price = parseFloat(priceRaw as string);

  if (!rawImages || rawImages.length === 0) return { error: "At least one product image is required" };
  if (rawImages.length > 10) return { error: "Maximum 10 images allowed" };

  // Validate category ID if provided
  if (categoryId && !isValidUUID(categoryId)) return { error: "Invalid category" };

  // Validate tags
  const tags = rawTags.filter(isValidTag);

  // Auto-generate slug if not provided; then validate it
  if (!slug) slug = generateSlug(name);
  if (!isValidSlug(slug)) return { error: "Slug must be lowercase letters, numbers, and hyphens only" };

  const supabase = await createServerClient();

  // Check if slug already exists
  const { data: existing } = await supabase
    .from("products")
    .select("id")
    .eq("slug", slug)
    .single();

  if (existing) {
    return { error: "A product with this name already exists. Please use a different name." };
  }

  const { error } = await supabase
    .from("products")
    .insert({
      name,
      slug,
      description,
      price,
      category_id: categoryId || null,
      images: rawImages,
      is_available: isAvailable,
      is_featured: isFeatured,
      tags,
    });

  if (error) {
    console.error("Create product error:", error);
    return { error: "Failed to create product. Please try again." };
  }

  revalidatePath("/Grace-admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/Grace-admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  // ── Validate ID ─────────────────────────────────────────────────────────────
  if (!isValidUUID(id)) return { error: "Invalid product ID" };

  // ── Input extraction & sanitization ────────────────────────────────────────
  const name = sanitizeText(formData.get("name"), 200);
  const slug = sanitizeText(formData.get("slug"), 200);
  const description = sanitizeOptional(formData.get("description"), 2000) || null;
  const categoryId = sanitizeOptional(formData.get("category_id"), 36) || null;
  const isAvailable = formData.get("is_available") === "true";
  const isFeatured = formData.get("is_featured") === "true";

  const rawImages = parseStringArray(formData.get("images") as string);
  const rawTags = parseStringArray(formData.get("tags") as string) ?? [];

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!name) return { error: "Product name is required" };
  if (!slug) return { error: "Product slug is required" };
  if (!isValidSlug(slug)) return { error: "Slug must be lowercase letters, numbers, and hyphens only" };

  const priceRaw = formData.get("price");
  if (!isValidPrice(priceRaw)) return { error: "Valid price is required (between $0.01 and $99,999)" };
  const price = parseFloat(priceRaw as string);

  if (!rawImages || rawImages.length === 0) return { error: "At least one product image is required" };
  if (rawImages.length > 10) return { error: "Maximum 10 images allowed" };

  if (categoryId && !isValidUUID(categoryId)) return { error: "Invalid category" };

  const tags = rawTags.filter(isValidTag);

  const supabase = await createServerClient();

  // Check if slug is taken by another product
  const { data: existing } = await supabase
    .from("products")
    .select("id")
    .eq("slug", slug)
    .neq("id", id)
    .single();

  if (existing) {
    return { error: "A product with this name already exists. Please use a different name." };
  }

  const { error } = await supabase
    .from("products")
    .update({
      name,
      slug,
      description,
      price,
      category_id: categoryId || null,
      images: rawImages,
      is_available: isAvailable,
      is_featured: isFeatured,
      tags,
    })
    .eq("id", id);

  if (error) {
    console.error("Update product error:", error);
    return { error: "Failed to update product. Please try again." };
  }

  revalidatePath("/Grace-admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/Grace-admin/products");
}

export async function deleteProduct(id: string) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  if (!isValidUUID(id)) return { error: "Invalid product ID" };

  const supabase = await createServerClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Delete product error:", error);
    return { error: "Failed to delete product. Please try again." };
  }

  revalidatePath("/shop");
  revalidatePath("/");
  return { success: true };
}

export async function getProducts() {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get products error:", error);
    return [];
  }

  return data || [];
}

export async function getProduct(id: string) {
  if (!isValidUUID(id)) return null;

  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Get product error:", error);
    return null;
  }

  return data;
}

export async function toggleTag(id: string, tag: string, currentTags: string[]) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  if (!isValidUUID(id)) return { error: "Invalid product ID" };
  if (!isValidTag(tag)) return { error: "Invalid tag" };

  const safeCurrent = currentTags.filter(isValidTag);
  const newTags = safeCurrent.includes(tag)
    ? safeCurrent.filter((t) => t !== tag)
    : [...safeCurrent, tag];

  const supabase = await createServerClient();

  const { error } = await supabase
    .from("products")
    .update({ tags: newTags })
    .eq("id", id);

  if (error) {
    console.error("Toggle tag error:", error);
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function toggleFeatured(id: string, isFeatured: boolean) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  if (!isValidUUID(id)) return { error: "Invalid product ID" };
  if (typeof isFeatured !== "boolean") return { error: "Invalid value" };

  const supabase = await createServerClient();

  const { error } = await supabase
    .from("products")
    .update({ is_featured: isFeatured })
    .eq("id", id);

  if (error) {
    console.error("Toggle featured error:", error);
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function toggleAvailable(id: string, isAvailable: boolean) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  if (!isValidUUID(id)) return { error: "Invalid product ID" };
  if (typeof isAvailable !== "boolean") return { error: "Invalid value" };

  const supabase = await createServerClient();

  const { error } = await supabase
    .from("products")
    .update({ is_available: isAvailable })
    .eq("id", id);

  if (error) {
    console.error("Toggle available error:", error);
    return { error: error.message };
  }

  revalidatePath("/shop");
  return { success: true };
}
