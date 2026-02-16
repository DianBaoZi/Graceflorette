"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

const stories = [
  {
    number: "01",
    title: "The Meaning",
    quote: "Florette",
    body: `"Florette" means a small flower — delicate, yet with the potential to grow. It represents our belief that beauty starts small and blossoms into something extraordinary.`,
    image: "/brand/the-meaning.png",
  },
  {
    number: "02",
    title: "The Seed",
    quote: "The Beginning",
    body: `Grace's Florette started with an idea from my husband — to turn my love for flowers into learning and arranging them. What began as a spark of inspiration grew into a passion I carry with me every day.`,
    image: "/brand/the-seed.png",
  },
  {
    number: "03",
    title: "The Blooms",
    quote: "Every Bouquet Tells a Story",
    body: `It never ceases to amaze me how each person is unique and every bouquet made will never be the same. I hope to celebrate life's special moments with you — one bloom at a time.`,
    image: "/brand/the-bloom.png",
  },
];

export default function BrandStory() {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Decorative botanical SVG — top right */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute -top-10 -right-10 w-56 h-56 text-primary/15 pointer-events-none"
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <ellipse cx="100" cy="60" rx="25" ry="40" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(0 100 100)" />
        <ellipse cx="100" cy="60" rx="25" ry="40" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(72 100 100)" />
        <ellipse cx="100" cy="60" rx="25" ry="40" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(144 100 100)" />
        <ellipse cx="100" cy="60" rx="25" ry="40" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(216 100 100)" />
        <ellipse cx="100" cy="60" rx="25" ry="40" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(288 100 100)" />
        <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.3" />
      </motion.svg>

      {/* Decorative botanical SVG — bottom left */}
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute -bottom-6 -left-6 w-40 h-40 text-secondary/15 pointer-events-none"
        initial={{ opacity: 0, rotate: 20 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <path d="M60 10 Q80 40 60 60 Q40 40 60 10Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M60 10 Q80 40 60 60 Q40 40 60 10Z" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(120 60 60)" />
        <path d="M60 10 Q80 40 60 60 Q40 40 60 10Z" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(240 60 60)" />
        <line x1="60" y1="60" x2="60" y2="110" stroke="currentColor" strokeWidth="0.5" />
      </motion.svg>

      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-16 sm:mb-20">
            <p className="editorial-spacing text-warm-gray-light mb-3">
              Our Story
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-dark mb-4">
              How It All Began
            </h2>
            <div className="w-16 h-[1px] bg-primary-dark/40 mx-auto" />
          </div>
        </AnimatedSection>

        {/* Story cards */}
        <div className="space-y-16 sm:space-y-20">
          {stories.map((story, i) => (
            <AnimatedSection
              key={story.number}
              delay={i * 0.15}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <div
                className={`flex flex-col ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                } items-center gap-8 sm:gap-12`}
              >
                {/* Story image */}
                <div className="shrink-0 w-40 h-40 sm:w-52 sm:h-52 rounded-2xl overflow-hidden relative border border-primary/15 shadow-sm">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 208px"
                  />
                  <div className="absolute bottom-2 left-2 bg-white/85 backdrop-blur-sm rounded-full px-2.5 py-0.5">
                    <span className="text-[10px] font-medium text-warm-gray tracking-wider uppercase">
                      {story.number}
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div className="text-center sm:text-left flex-1">
                  <p className="font-heading text-xl sm:text-2xl text-dark mb-3 italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <p className="text-warm-gray text-sm sm:text-base leading-relaxed max-w-lg">
                    {story.body}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Sign-off */}
        <AnimatedSection delay={0.4}>
          <div className="text-center mt-16 sm:mt-20">
            <div className="w-16 h-[1px] bg-primary-dark/20 mx-auto mb-6" />
            <p className="font-heading text-lg italic text-warm-gray-light">
              &ldquo;Flowers are for everyone&rdquo;
            </p>
            <p className="text-sm text-warm-gray-light mt-2">
              Love, Grace
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
