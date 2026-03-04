"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

// Grace can easily update this section for seasonal promotions
const SEASONAL_CONFIG = {
  title: "Popular This Month",
  description: "Handpicked arrangements our customers love",
  accentText: "Trending Now",
  ctaText: "Shop Collection",
  ctaLink: "/shop",
  theme: "rose", // Options: "rose", "spring", "summer", "autumn", "winter", "valentine", "mothersday"
};

const themeColors = {
  rose: {
    bg: "from-primary/5 via-cream/50 to-primary-dark/5",
    accent: "bg-primary-dark/10 text-primary-dark",
    border: "border-primary/20",
  },
  spring: {
    bg: "from-green-50 via-yellow-50/50 to-pink-50",
    accent: "bg-green-600/10 text-green-700",
    border: "border-green-200",
  },
  valentine: {
    bg: "from-red-50 via-pink-50 to-rose-50",
    accent: "bg-red-500/10 text-red-600",
    border: "border-red-200",
  },
  mothersday: {
    bg: "from-pink-50 via-purple-50/50 to-primary/5",
    accent: "bg-purple-500/10 text-purple-600",
    border: "border-purple-200",
  },
  summer: {
    bg: "from-yellow-50 via-orange-50/50 to-amber-50",
    accent: "bg-orange-500/10 text-orange-600",
    border: "border-orange-200",
  },
  autumn: {
    bg: "from-amber-50 via-orange-100/50 to-red-50",
    accent: "bg-amber-600/10 text-amber-700",
    border: "border-amber-200",
  },
  winter: {
    bg: "from-blue-50 via-slate-50 to-gray-50",
    accent: "bg-blue-500/10 text-blue-600",
    border: "border-blue-200",
  },
};

export default function SeasonalBanner() {
  const theme = themeColors[SEASONAL_CONFIG.theme as keyof typeof themeColors];

  return (
    <section className={`relative py-12 bg-gradient-to-br ${theme.bg} overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-dark blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-primary-dark blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`inline-block px-4 py-1.5 rounded-full ${theme.accent} text-xs tracking-widest uppercase font-medium mb-4`}
          >
            {SEASONAL_CONFIG.accentText}
          </motion.div>

          <h2 className="font-heading text-3xl sm:text-4xl text-dark mb-3">
            {SEASONAL_CONFIG.title}
          </h2>
          <p className="text-warm-gray max-w-xl mx-auto mb-8">
            {SEASONAL_CONFIG.description}
          </p>

          <Link
            href={SEASONAL_CONFIG.ctaLink}
            className={`inline-block px-8 py-3 border-2 ${theme.border} text-dark text-sm tracking-wider uppercase font-medium rounded-lg hover:bg-dark hover:text-cream hover:border-dark transition-all hover:scale-105 active:scale-95`}
          >
            {SEASONAL_CONFIG.ctaText}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
