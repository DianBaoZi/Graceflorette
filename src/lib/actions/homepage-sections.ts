"use server";

import { createServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import type { HomepageSection } from "@/lib/types";

export async function getHomepageSections(): Promise<HomepageSection[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("homepage_sections")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching homepage sections:", error);
    return [];
  }

  return data || [];
}

export async function toggleSectionEnabled(id: string, isEnabled: boolean) {
  const supabase = await createServerClient();

  const { error } = await supabase
    .from("homepage_sections")
    .update({ is_enabled: isEnabled })
    .eq("id", id);

  if (error) {
    console.error("Error updating section:", error);
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/Grace-admin/homepage");
  return { success: true };
}

export async function updateSectionTitle(id: string, title: string, description: string) {
  const supabase = await createServerClient();

  const { error } = await supabase
    .from("homepage_sections")
    .update({ title, description })
    .eq("id", id);

  if (error) {
    console.error("Error updating section:", error);
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/Grace-admin/homepage");
  revalidatePath("/Grace-admin/products");
  return { success: true };
}
