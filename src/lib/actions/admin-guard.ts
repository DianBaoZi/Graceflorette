"use server";

import { createServerClient } from "@/lib/supabase-server";

/**
 * Verifies the current request is from an authenticated admin user.
 *
 * Returns the Supabase user object if the caller is a verified admin,
 * or null if unauthenticated / not in the admin_users table.
 *
 * Call this at the top of every mutating server action:
 *
 *   const admin = await requireAdmin();
 *   if (!admin) return { error: "Unauthorized" };
 */
export async function requireAdmin() {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .single();

    return adminUser ? user : null;
  } catch {
    return null;
  }
}
