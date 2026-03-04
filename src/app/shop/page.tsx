import { createServerClient } from "@/lib/supabase-server";
import ShopClient from "@/components/shop/ShopClient";
import type { Product } from "@/lib/types";

export const revalidate = 60; // Revalidate every 60 seconds

async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_available", true)
      .order("created_at", { ascending: false });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return <ShopClient products={products} />;
}
