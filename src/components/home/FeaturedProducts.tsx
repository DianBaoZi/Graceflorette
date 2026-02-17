"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useCart } from "@/context/CartContext";
import { sampleProducts } from "@/lib/sample-data";
import type { Product } from "@/lib/types";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.4, 0.25, 1],
      }}
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

          {/* Quick add button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.03 }}
            onClick={(e) => {
              e.preventDefault();
              addItem(product, product.sizes[0]);
            }}
            className="absolute bottom-4 left-4 right-4 py-2.5 bg-white/95 backdrop-blur-sm text-dark text-xs tracking-wider uppercase font-medium rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-dark hover:text-cream"
          >
            Add to Cart &mdash; ${product.sizes[0].price}
          </motion.button>

          {/* Bestseller badge - show on first item */}
          {index === 0 && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary-dark text-cream text-[10px] tracking-wider uppercase font-medium rounded-full">
              ★ Bestseller
            </div>
          )}
          {/* Popular badge - show on second item */}
          {index === 1 && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-secondary-dark text-cream text-[10px] tracking-wider uppercase font-medium rounded-full">
              Popular
            </div>
          )}
        </div>

        {/* Info */}
        <Link href={`/shop/${product.slug}`} className="block p-5">
          <h3 className="font-heading text-base text-dark group-hover:text-primary-dark transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
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

export default function FeaturedProducts() {
  const featured = sampleProducts.filter((p) => p.is_featured);

  return (
    <section className="py-20 sm:py-28 bg-white/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-14">
          <p className="editorial-spacing text-warm-gray-light mb-3">
            Curated for you
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-dark">
            Featured Arrangements
          </h2>
          <p className="text-warm-gray mt-3 max-w-md mx-auto text-sm leading-relaxed">
            Our most loved bouquets and arrangements, hand-picked for their
            beauty and charm.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-warm-gray hover:text-dark transition-colors group border-b border-warm-gray-light/30 hover:border-dark/40 pb-1"
          >
            View All Flowers
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
