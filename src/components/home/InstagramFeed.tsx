"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const instagramPosts = [
  { id: 1, gradient: "from-primary/30 to-[#E8B4B8]/20" },
  { id: 2, gradient: "from-accent/20 to-primary/15" },
  { id: 3, gradient: "from-secondary/25 to-secondary/10" },
  { id: 4, gradient: "from-[#D4B5C7]/25 to-primary/15" },
  { id: 5, gradient: "from-primary/20 to-accent/15" },
  { id: 6, gradient: "from-[#E8D5B7]/25 to-accent/10" },
];

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
        <AnimatedSection className="text-center mb-12">
          <p className="editorial-spacing text-warm-gray-light mb-3">
            Follow along
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-dark mb-3">
            @gracesflorette
          </h2>
          <p className="text-warm-gray text-sm">
            Behind the blooms on Instagram
          </p>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/gracesflorette"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ scale: 1.04 }}
              className={`group relative aspect-square rounded-xl bg-gradient-to-br ${post.gradient} overflow-hidden cursor-pointer`}
            >
              {/* Decorative flower */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 60 60"
                  fill="none"
                  className="w-8 h-8 text-dark/[0.05]"
                >
                  <circle cx="30" cy="30" r="5" stroke="currentColor" strokeWidth="0.8" />
                  {[0, 60, 120, 180, 240, 300].map((a) => (
                    <ellipse
                      key={a}
                      cx="30"
                      cy="21"
                      rx="5"
                      ry="9"
                      stroke="currentColor"
                      strokeWidth="0.6"
                      transform={`rotate(${a} 30 30)`}
                    />
                  ))}
                </svg>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <InstagramIcon />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center mt-10">
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
