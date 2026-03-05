import Hero from "@/components/home/Hero";
import DynamicHomepageSections from "@/components/home/DynamicHomepageSections";
import BrandStory from "@/components/home/BrandStory";
import InstagramFeed from "@/components/home/InstagramFeed";
import { createServerClient } from "@/lib/supabase-server";
import type { Product, HomepageSection } from "@/lib/types";

export const revalidate = 60; // ISR: cache 60s, mutations call revalidatePath("/")

async function getHomepageSectionsWithProducts() {
  try {
    const supabase = await createServerClient();

    const { data: sections, error: sectionsError } = await supabase
      .from("homepage_sections")
      .select("*")
      .eq("is_enabled", true)
      .order("display_order", { ascending: true });

    if (sectionsError || !sections || sections.length === 0) {
      return [];
    }

    const sectionsWithProducts = await Promise.all(
      sections.map(async (section: HomepageSection) => {
        const { data: products } = await supabase
          .from("products")
          .select("*")
          .eq("is_available", true)
          .contains("tags", [section.id])
          .order("created_at", { ascending: false })
          .limit(4);

        return {
          section,
          products: (products || []) as Product[],
        };
      })
    );

    return sectionsWithProducts;
  } catch {
    return [];
  }
}

export default async function Home() {
  const sectionsWithProducts = await getHomepageSectionsWithProducts();

  return (
    <>
      <Hero />
      <DynamicHomepageSections sectionsWithProducts={sectionsWithProducts} />
      <BrandStory />
      <InstagramFeed />
    </>
  );
}
