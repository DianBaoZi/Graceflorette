"use server";

import { createServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/actions/admin-guard";
import {
  sanitizeText,
  sanitizeOptional,
  isValidSlug,
  isValidUUID,
  isValidDisplayOrder,
} from "@/lib/validate";

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createCategory(formData: FormData) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  // ── Input extraction & sanitization ────────────────────────────────────────
  const name = sanitizeText(formData.get("name"), 100);
  const description = sanitizeOptional(formData.get("description"), 500) || null;
  const imageUrl = sanitizeOptional(formData.get("image_url"), 500) || null;
  const rawOrder = formData.get("display_order");

  let slug = sanitizeOptional(formData.get("slug"), 200);

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!name) return { error: "Category name is required" };

  if (!isValidDisplayOrder(rawOrder)) {
    return { error: "Display order must be a number between 0 and 9999" };
  }
  const displayOrder = parseInt(rawOrder as string, 10);

  // Auto-generate slug if not provided; validate it
  if (!slug) slug = generateSlug(name);
  if (!isValidSlug(slug)) return { error: "Slug must be lowercase letters, numbers, and hyphens only" };

  // Validate imageUrl is a relative or Supabase URL if provided
  if (imageUrl && imageUrl.length > 500) return { error: "Image URL is too long" };

  const supabase = await createServerClient();

  // Check if slug already exists
  const { data: existing } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .single();

  if (existing) {
    return { error: "A category with this name already exists. Please use a different name." };
  }

  const { error } = await supabase
    .from("categories")
    .insert({
      name,
      slug,
      description,
      image_url: imageUrl,
      display_order: displayOrder,
    });

  if (error) {
    console.error("Create category error:", error);
    return { error: "Failed to create category. Please try again." };
  }

  revalidatePath("/grace-admin/categories");
  revalidatePath("/shop");
  redirect("/grace-admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  // ── Validate ID ─────────────────────────────────────────────────────────────
  if (!isValidUUID(id)) return { error: "Invalid category ID" };

  // ── Input extraction & sanitization ────────────────────────────────────────
  const name = sanitizeText(formData.get("name"), 100);
  const slug = sanitizeText(formData.get("slug"), 200);
  const description = sanitizeOptional(formData.get("description"), 500) || null;
  const imageUrl = sanitizeOptional(formData.get("image_url"), 500) || null;
  const rawOrder = formData.get("display_order");

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!name) return { error: "Category name is required" };
  if (!slug) return { error: "Category slug is required" };
  if (!isValidSlug(slug)) return { error: "Slug must be lowercase letters, numbers, and hyphens only" };

  if (!isValidDisplayOrder(rawOrder)) {
    return { error: "Display order must be a number between 0 and 9999" };
  }
  const displayOrder = parseInt(rawOrder as string, 10);

  const supabase = await createServerClient();

  // Check if slug is taken by another category
  const { data: existing } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .neq("id", id)
    .single();

  if (existing) {
    return { error: "A category with this name already exists. Please use a different name." };
  }

  const { error } = await supabase
    .from("categories")
    .update({
      name,
      slug,
      description,
      image_url: imageUrl,
      display_order: displayOrder,
    })
    .eq("id", id);

  if (error) {
    console.error("Update category error:", error);
    return { error: "Failed to update category. Please try again." };
  }

  revalidatePath("/grace-admin/categories");
  revalidatePath("/shop");
  redirect("/grace-admin/categories");
}

export async function deleteCategory(id: string) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  if (!isValidUUID(id)) return { error: "Invalid category ID" };

  const supabase = await createServerClient();

  // Check if category has products
  const { data: products } = await supabase
    .from("products")
    .select("id")
    .eq("category_id", id)
    .limit(1);

  if (products && products.length > 0) {
    return { error: "Cannot delete category with existing products" };
  }

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    console.error("Delete category error:", error);
    return { error: "Failed to delete category. Please try again." };
  }

  revalidatePath("/grace-admin/categories");
  revalidatePath("/shop");
  return { success: true };
}

export async function getCategories() {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.error("Get categories error:", error);
    return [];
  }

  return data || [];
}

export async function getCategory(id: string) {
  if (!isValidUUID(id)) return null;

  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Get category error:", error);
    return null;
  }

  return data;
}
