"use server";

import { createServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("image_url") as string;
  const displayOrder = parseInt(formData.get("display_order") as string) || 0;

  let slug = formData.get("slug") as string;

  // Auto-generate slug if not provided
  if (!slug || slug.trim() === "") {
    slug = generateSlug(name);
  }

  if (!name) {
    return { error: "Category name is required" };
  }

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

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name,
      slug,
      description: description || null,
      image_url: imageUrl || null,
      display_order: displayOrder,
    })
    .select()
    .single();

  if (error) {
    console.error("Create category error:", error);
    return { error: error.message };
  }

  revalidatePath("/Grace-admin/categories");
  revalidatePath("/shop");
  redirect("/Grace-admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("image_url") as string;
  const displayOrder = parseInt(formData.get("display_order") as string) || 0;

  if (!name) {
    return { error: "Category name is required" };
  }

  if (!slug) {
    return { error: "Category slug is required" };
  }

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

  const { data, error } = await supabase
    .from("categories")
    .update({
      name,
      slug,
      description: description || null,
      image_url: imageUrl || null,
      display_order: displayOrder,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update category error:", error);
    return { error: error.message };
  }

  revalidatePath("/Grace-admin/categories");
  revalidatePath("/shop");
  redirect("/Grace-admin/categories");
}

export async function deleteCategory(id: string) {
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
    return { error: error.message };
  }

  revalidatePath("/Grace-admin/categories");
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
