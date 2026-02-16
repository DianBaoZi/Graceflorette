"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useCart } from "@/context/CartContext";
import { sampleProducts } from "@/lib/sample-data";
import type { Product } from "@/lib/types";

const occasions = [
  { value: "all", label: "All Occasions" },
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "romantic", label: "Romantic" },
  { value: "valentine", label: "Valentine's" },
  { value: "wedding", label: "Wedding" },
  { value: "congratulations", label: "Congratulations" },
  { value: "graduation", label: "Graduation" },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group bg-white rounded-2xl overflow-hidden border border-primary/15 hover:border-primary-dark/25 hover:shadow-[0_16px_48px_-16px_rgba(201,162,167,0.22)] transition-all duration-500"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          <motion.button
            onClick={(e) => {
              e.preventDefault();
              addItem(product, product.sizes[0]);
            }}
            className="absolute bottom-4 left-4 right-4 py-2.5 bg-white/95 backdrop-blur-sm text-dark text-xs tracking-wider uppercase font-medium rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-dark hover:text-cream"
          >
            Add to Cart &mdash; ${product.sizes[0].price}
          </motion.button>

          {product.is_featured && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-cream/90 backdrop-blur-sm text-[10px] tracking-wider uppercase text-warm-gray rounded-full">
              Featured
            </div>
          )}
        </div>

        <Link href={`/shop/${product.slug}`} className="block p-5">
          <h3 className="font-heading text-base text-dark group-hover:text-primary-dark transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-warm-gray-light mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm text-warm-gray">
              From{" "}
              <span className="font-medium text-dark">
                ${product.sizes[0].price}
              </span>
            </p>
            {product.sizes.length > 1 && (
              <p className="text-[11px] text-warm-gray-light">
                {product.sizes.length} sizes
              </p>
            )}
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function ShopPage() {
  const [selectedOccasion, setSelectedOccasion] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filtered = useMemo(() => {
    let results = [...sampleProducts];

    if (selectedOccasion !== "all") {
      results = results.filter((p) =>
        p.occasions.includes(selectedOccasion)
      );
    }

    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "featured":
        results.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        break;
      case "newest":
        results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return results;
  }, [selectedOccasion, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center">
            <p className="editorial-spacing text-warm-gray-light mb-3">
              Browse
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl text-dark">
              Shop Flowers
            </h1>
            <p className="text-warm-gray mt-3 max-w-md mx-auto text-sm">
              Every bouquet hand-crafted with love in Singapore
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-primary/15 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Occasion select */}
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="bg-transparent text-xs text-warm-gray border border-primary/25 rounded-full px-4 py-1.5 focus:outline-none focus:border-primary-dark/50"
            >
              {occasions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-auto bg-transparent text-xs text-warm-gray border border-primary/25 rounded-full px-4 py-1.5 focus:outline-none focus:border-primary-dark/50"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-heading text-xl text-dark mb-2">
                No flowers found
              </p>
              <p className="text-sm text-warm-gray-light">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs text-warm-gray-light mb-6">
                {filtered.length} arrangement{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filtered.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
