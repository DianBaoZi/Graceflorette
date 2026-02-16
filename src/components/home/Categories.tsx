"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { sampleCategories } from "@/lib/sample-data";

const categoryIcons: Record<string, React.ReactNode> = {
  bouquets: (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <path d="M32 58V32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M32 38C26 35 20 38 18 42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M32 34C38 31 44 34 46 38" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="32" cy="22" r="4" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="32" cy="13" rx="5" ry="8" stroke="currentColor" strokeWidth="0.8" />
      <ellipse cx="32" cy="13" rx="5" ry="8" stroke="currentColor" strokeWidth="0.8" transform="rotate(72 32 22)" />
      <ellipse cx="32" cy="13" rx="5" ry="8" stroke="currentColor" strokeWidth="0.8" transform="rotate(144 32 22)" />
      <ellipse cx="32" cy="13" rx="5" ry="8" stroke="currentColor" strokeWidth="0.8" transform="rotate(216 32 22)" />
      <ellipse cx="32" cy="13" rx="5" ry="8" stroke="currentColor" strokeWidth="0.8" transform="rotate(288 32 22)" />
      {/* Wrapping paper lines */}
      <path d="M22 42L32 48L42 42" stroke="currentColor" strokeWidth="0.8" />
      <path d="M24 44L32 49L40 44" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
    </svg>
  ),
  "vase-arrangements": (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      {/* Vase */}
      <path
        d="M22 38C22 38 20 42 20 48C20 52 24 56 32 56C40 56 44 52 44 48C44 42 42 38 42 38"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M22 38H42" stroke="currentColor" strokeWidth="1.2" />
      {/* Flowers */}
      <circle cx="26" cy="22" r="3" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="32" cy="18" r="3.5" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="38" cy="22" r="3" stroke="currentColor" strokeWidth="0.8" />
      {/* Stems */}
      <path d="M26 25V38" stroke="currentColor" strokeWidth="0.7" />
      <path d="M32 21.5V38" stroke="currentColor" strokeWidth="0.7" />
      <path d="M38 25V38" stroke="currentColor" strokeWidth="0.7" />
      {/* Leaves */}
      <path d="M29 30C27 28 24 29 23 31" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M35 28C37 26 40 27 41 29" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  ),
  roses: (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <path d="M32 58V28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M32 40C27 37 22 40 21 44" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M32 34C37 31 42 34 43 38" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* Rose head - spiral */}
      <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="0.8" />
      <path
        d="M32 12C35 14 36 17 34 20C31 17 30 14 32 12Z"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <path
        d="M38 16C36 19 33 20 30 18C33 16 36 15 38 16Z"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <path
        d="M36 24C33 22 30 22 28 24C31 25 34 25 36 24Z"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <path
        d="M26 20C28 17 31 16 34 18C31 20 28 21 26 20Z"
        stroke="currentColor"
        strokeWidth="0.6"
      />
    </svg>
  ),
};

export default function Categories() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-14">
          <p className="editorial-spacing text-warm-gray-light mb-3">
            Browse by
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-dark">
            Our Collections
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {sampleCategories.map((cat, index) => (
            <AnimatedSection key={cat.id} delay={index * 0.1}>
              <Link href={`/shop?category=${cat.slug}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative bg-white rounded-2xl p-8 sm:p-10 text-center border border-primary/20 hover:border-primary-dark/30 hover:shadow-[0_12px_40px_-12px_rgba(201,162,167,0.25)] transition-all duration-500 cursor-pointer"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/15 text-primary-dark mb-5 group-hover:bg-primary/25 transition-colors duration-500">
                    {categoryIcons[cat.slug] || categoryIcons.bouquets}
                  </div>

                  <h3 className="font-heading text-xl text-dark mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-warm-gray-light group-hover:text-primary-dark transition-colors">
                    Explore
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-3 h-3 transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Corner ornament */}
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-primary/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-primary/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
