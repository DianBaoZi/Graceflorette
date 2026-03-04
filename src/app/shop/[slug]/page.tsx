import Link from "next/link";
import { createServerClient } from "@/lib/supabase-server";
import ProductDetailClient from "@/components/shop/ProductDetailClient";
import type { Product } from "@/lib/types";

export const revalidate = 300; // Revalidate every 5 minutes

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_available", true)
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl text-dark mb-2">
            Product not found
          </h1>
          <Link
            href="/shop"
            className="text-sm text-warm-gray hover:text-dark transition-colors underline"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
