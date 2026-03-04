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

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = formData.get("category_id") as string;
  const images = JSON.parse(formData.get("images") as string || "[]");
  const isAvailable = formData.get("is_available") === "true";
  const isFeatured = formData.get("is_featured") === "true";
  const tags = JSON.parse(formData.get("tags") as string || "[]");

  let slug = formData.get("slug") as string;

  // Auto-generate slug if not provided
  if (!slug || slug.trim() === "") {
    slug = generateSlug(name);
  }

  if (!name) {
    return { error: "Product name is required" };
  }

  if (!price || price <= 0) {
    return { error: "Valid price is required" };
  }

  if (!images || images.length === 0) {
    return { error: "At least one product image is required" };
  }

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

  const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      slug,
      description: description || null,
      price,
      category_id: categoryId || null,
      images,
      is_available: isAvailable,
      is_featured: isFeatured,
      tags,
    })
    .select()
    .single();

  if (error) {
    console.error("Create product error:", error);
    return { error: error.message };
  }

  revalidatePath("/Grace-admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/Grace-admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = formData.get("category_id") as string;
  const images = JSON.parse(formData.get("images") as string || "[]");
  const isAvailable = formData.get("is_available") === "true";
  const isFeatured = formData.get("is_featured") === "true";
  const tags = JSON.parse(formData.get("tags") as string || "[]");

  if (!name) {
    return { error: "Product name is required" };
  }

  if (!slug) {
    return { error: "Product slug is required" };
  }

  if (!price || price <= 0) {
    return { error: "Valid price is required" };
  }

  if (!images || images.length === 0) {
    return { error: "At least one product image is required" };
  }

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

  const { data, error } = await supabase
    .from("products")
    .update({
      name,
      slug,
      description: description || null,
      price,
      category_id: categoryId || null,
      images,
      is_available: isAvailable,
      is_featured: isFeatured,
      tags,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update product error:", error);
    return { error: error.message };
  }

  revalidatePath("/Grace-admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/Grace-admin/products");
}

export async function deleteProduct(id: string) {
  const supabase = await createServerClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Delete product error:", error);
    return { error: error.message };
  }

  revalidatePath("/Grace-admin/products");
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
  const newTags = currentTags.includes(tag)
    ? currentTags.filter((t) => t !== tag)
    : [...currentTags, tag];

  const supabase = await createServerClient();

  const { error } = await supabase
    .from("products")
    .update({ tags: newTags })
    .eq("id", id);

  if (error) {
    console.error("Toggle tag error:", error);
    return { error: error.message };
  }

  revalidatePath("/Grace-admin/products");
  revalidatePath("/");
  return { success: true };
}

export async function toggleFeatured(id: string, isFeatured: boolean) {
  const supabase = await createServerClient();

  const { error } = await supabase
    .from("products")
    .update({ is_featured: isFeatured })
    .eq("id", id);

  if (error) {
    console.error("Toggle featured error:", error);
    return { error: error.message };
  }

  revalidatePath("/Grace-admin/products");
  revalidatePath("/");
  return { success: true };
}

export async function toggleAvailable(id: string, isAvailable: boolean) {
  const supabase = await createServerClient();

  const { error } = await supabase
    .from("products")
    .update({ is_available: isAvailable })
    .eq("id", id);

  if (error) {
    console.error("Toggle available error:", error);
    return { error: error.message };
  }

  revalidatePath("/Grace-admin/products");
  revalidatePath("/shop");
  return { success: true };
}
