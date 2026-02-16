"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

function HeroFloral({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Large peony-like bloom */}
      <circle cx="100" cy="100" r="12" stroke="currentColor" strokeWidth="0.6" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="76"
          rx="14"
          ry="22"
          stroke="currentColor"
          strokeWidth="0.5"
          transform={`rotate(${angle} 100 100)`}
          opacity={0.6 + (angle % 60 === 0 ? 0.2 : 0)}
        />
      ))}
      {/* Inner petals */}
      {[15, 75, 135, 195, 255, 315].map((angle) => (
        <ellipse
          key={`inner-${angle}`}
          cx="100"
          cy="84"
          rx="10"
          ry="15"
          stroke="currentColor"
          strokeWidth="0.4"
          transform={`rotate(${angle} 100 100)`}
          opacity={0.4}
        />
      ))}
    </svg>
  );
}

function SmallBud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" fill="none" className={className}>
      <path
        d="M20 55V25"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <ellipse cx="20" cy="18" rx="6" ry="10" stroke="currentColor" strokeWidth="0.5" />
      <ellipse
        cx="20"
        cy="18"
        rx="6"
        ry="10"
        stroke="currentColor"
        strokeWidth="0.5"
        transform="rotate(45 20 18)"
      />
      <ellipse
        cx="20"
        cy="18"
        rx="6"
        ry="10"
        stroke="currentColor"
        strokeWidth="0.5"
        transform="rotate(-45 20 18)"
      />
      <path
        d="M20 38C16 36 12 38 11 41"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-primary/20 to-secondary/15" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />

      {/* Decorative botanicals */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <HeroFloral className="absolute top-8 right-[8%] w-44 h-44 text-primary-dark/[0.08] rotate-12" />
        <HeroFloral className="absolute bottom-16 left-[5%] w-56 h-56 text-secondary/[0.08] -rotate-20" />
        <SmallBud className="absolute top-[20%] left-[15%] w-10 h-16 text-primary-dark/[0.12] rotate-[-15deg]" />
        <SmallBud className="absolute bottom-[25%] right-[12%] w-8 h-12 text-accent/[0.12] rotate-[20deg]" />
        <SmallBud className="absolute top-[60%] left-[8%] w-6 h-10 text-secondary-dark/[0.1] rotate-[30deg]" />
      </motion.div>

      {/* Thin decorative border frame */}
      <div className="absolute inset-6 sm:inset-10 border border-primary-dark/[0.08] rounded-2xl pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="editorial-spacing text-warm-gray-light mb-6 tracking-[0.2em]"
        >
          Singapore&apos;s Artisan Florist
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl text-dark leading-[1.1] tracking-tight"
        >
          Flowers are
          <br />
          <span className="italic text-primary-dark">for everyone</span>
        </motion.h1>

        {/* Ornamental divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-16 h-[1px] bg-primary-dark/40 mx-auto my-6"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-warm-gray text-base sm:text-lg leading-relaxed max-w-lg mx-auto"
        >
          Hand-crafted bouquets and arrangements made with love.
          <br className="hidden sm:block" />
          Every stem chosen, every bloom placed with care.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/shop"
            className="group relative inline-flex items-center gap-2 bg-dark text-cream px-8 py-3.5 text-sm tracking-wider uppercase font-medium rounded-full hover:bg-dark/90 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Shop Now</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>

          <Link
            href="/contact"
            className="text-sm text-warm-gray hover:text-dark tracking-wide transition-colors border-b border-warm-gray-light/30 hover:border-dark/40 pb-0.5"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-14 text-xs text-warm-gray-light/60 italic font-heading"
        >
          Love, Grace
        </motion.p>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
