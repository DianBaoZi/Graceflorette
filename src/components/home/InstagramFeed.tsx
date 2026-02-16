"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export default function InstagramFeed() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center">
          <p className="editorial-spacing text-warm-gray-light mb-3">
            Follow along
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-dark mb-3">
            @gracesflorette
          </h2>
          <p className="text-warm-gray text-sm mb-8">
            Behind the blooms on Instagram
          </p>
          <a
            href="https://www.instagram.com/gracesflorette"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 border border-primary-dark/25 rounded-full text-sm tracking-wide text-warm-gray hover:text-dark hover:border-primary-dark/50 hover:bg-primary/10 transition-all duration-300"
          >
            <InstagramIcon />
            Follow @gracesflorette
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
