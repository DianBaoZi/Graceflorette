"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Product, HomepageSection } from "@/lib/types";

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link href={`/shop/${product.slug}`}>
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
          </div>

          {/* Info */}
          <div className="p-5">
            <h3 className="font-heading text-base text-dark group-hover:text-primary-dark transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-warm-gray mt-2">
              <span className="font-medium text-dark">${product.price.toFixed(2)}</span>
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

interface SectionWithProducts {
  section: HomepageSection;
  products: Product[];
}

interface DynamicHomepageSectionsProps {
  sectionsWithProducts: SectionWithProducts[];
}

export default function DynamicHomepageSections({
  sectionsWithProducts,
}: DynamicHomepageSectionsProps) {
  if (sectionsWithProducts.length === 0) {
    return null;
  }

  return (
    <>
      {sectionsWithProducts.map((item, sectionIndex) => {
        const { section, products } = item;

        if (products.length === 0) {
          return null;
        }

        return (
          <section
            key={section.id}
            className="relative py-20 bg-gradient-to-br from-cream/30 via-white to-primary/5 overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-[0.015]">
              <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary-dark blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
              <AnimatedSection className="text-center mb-12">
                <h2 className="font-heading text-3xl sm:text-4xl text-dark mb-3">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-warm-gray max-w-xl mx-auto">
                    {section.description}
                  </p>
                )}
              </AnimatedSection>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {products.slice(0, 4).map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              {sectionIndex === sectionsWithProducts.length - 1 && (
                <AnimatedSection className="text-center mt-12">
                  <Link
                    href="/shop"
                    className="inline-block px-8 py-3.5 bg-dark text-cream text-sm tracking-wider uppercase font-medium rounded-lg hover:bg-dark/90 transition-all hover:scale-105 active:scale-95"
                  >
                    View All Flowers
                  </Link>
                </AnimatedSection>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
