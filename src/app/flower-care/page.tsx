import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Care Tips — Grace's Florette",
  description: "Learn how to keep your flowers fresh and beautiful for longer with our expert care tips.",
};

export default function FlowerCarePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <AnimatedSection>
            <p className="editorial-spacing text-warm-gray-light mb-3">
              Expert Advice
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl text-dark mb-4">
              Flower Care Tips
            </h1>
            <p className="text-warm-gray text-sm max-w-2xl mx-auto">
              Keep your blooms fresh and vibrant for longer with these simple care techniques.
              A little love goes a long way in extending the life of your arrangements.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Care Tips Image */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <AnimatedSection delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-lg bg-white">
              <Image
                src="/flower-care-tips.png"
                alt="Flower Care Tips - How to keep your flowers fresh and beautiful"
                width={1200}
                height={1600}
                className="w-full h-auto"
                priority
              />
            </div>
          </AnimatedSection>

          {/* Additional Text Tips */}
          <AnimatedSection delay={0.3} className="mt-12">
            <div className="bg-gradient-to-br from-cream/30 via-white to-primary/5 rounded-2xl border border-primary/15 p-8 sm:p-10">
              <h2 className="font-heading text-2xl text-dark mb-6">
                Quick Care Reminders
              </h2>

              <div className="space-y-6 text-warm-gray">
                <div>
                  <h3 className="font-heading text-lg text-dark mb-2">💧 Fresh Water Daily</h3>
                  <p className="text-sm leading-relaxed">
                    Change the water in your vase every day to prevent bacterial growth.
                    Clean water keeps stems fresh and extends bloom life.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg text-dark mb-2">✂️ Trim Stems Regularly</h3>
                  <p className="text-sm leading-relaxed">
                    Cut stems at a 45-degree angle every few days to help them absorb more water.
                    Remove any leaves below the waterline to keep water clean.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg text-dark mb-2">🌡️ Keep Cool</h3>
                  <p className="text-sm leading-relaxed">
                    Display your flowers in a cool spot away from direct sunlight, heat sources,
                    and ripening fruit. Cool temperatures slow aging and preserve vibrancy.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg text-dark mb-2">🌸 Remove Wilted Blooms</h3>
                  <p className="text-sm leading-relaxed">
                    Gently remove any wilted or damaged flowers to keep your arrangement looking
                    fresh and to prevent them from affecting healthy blooms.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary/15">
                <p className="text-sm italic text-warm-gray-light text-center">
                  With proper care, most arrangements will stay beautiful for 5-7 days or longer
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.4} className="text-center mt-12">
            <p className="text-warm-gray mb-6">
              Have questions about caring for a specific type of flower?
            </p>
            <a
              href="https://www.instagram.com/gracesflorette"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 bg-dark text-cream text-sm tracking-wider uppercase font-medium rounded-lg hover:bg-dark/90 transition-all hover:scale-105 active:scale-95"
            >
              Message Us on Instagram
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
