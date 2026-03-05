"use server";

import { createServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import type { HomepageSection } from "@/lib/types";
import { requireAdmin } from "@/lib/actions/admin-guard";
import { sanitizeText } from "@/lib/validate";

const VALID_SECTION_IDS = ["featured", "valentine", "mothersday"] as const;
type SectionId = (typeof VALID_SECTION_IDS)[number];

function isValidSectionId(id: unknown): id is SectionId {
  return VALID_SECTION_IDS.includes(id as SectionId);
}

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
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  if (!isValidSectionId(id)) return { error: "Invalid section ID" };
  if (typeof isEnabled !== "boolean") return { error: "Invalid value" };

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

export async function updateSectionTitle(
  id: string,
  title: string,
  description: string
) {
  // ── Authorization ──────────────────────────────────────────────────────────
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  if (!isValidSectionId(id)) return { error: "Invalid section ID" };

  const safeTitle = sanitizeText(title, 100);
  const safeDescription = sanitizeText(description, 300) ?? "";

  if (!safeTitle) return { error: "Section title is required" };

  const supabase = await createServerClient();

  const { error } = await supabase
    .from("homepage_sections")
    .update({ title: safeTitle, description: safeDescription })
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
