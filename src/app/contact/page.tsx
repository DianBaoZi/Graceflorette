import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Grace's Florette",
  description: "Get in touch with Grace's Florette for floral arrangements in Singapore.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="pt-12 pb-28 sm:pt-20 sm:pb-36">
        <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
          <AnimatedSection>
            <p className="editorial-spacing text-warm-gray-light mb-3">
              Get in Touch
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl text-dark mb-4">
              Contact Us
            </h1>
            <p className="text-warm-gray text-sm max-w-md mx-auto mb-12">
              Have a question, a special request, or just want to say hello?
              We&apos;d love to hear from you.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="bg-white rounded-2xl border border-primary/20 p-8 sm:p-12 space-y-8">
              {/* Email */}
              <div>
                <p className="editorial-spacing text-warm-gray-light mb-2">Email</p>
                <a
                  href="mailto:hello@gracesflorette.com"
                  className="font-heading text-xl sm:text-2xl text-dark hover:text-primary-dark transition-colors"
                >
                  hello@gracesflorette.com
                </a>
              </div>

              <div className="w-16 h-[1px] bg-primary-dark/20 mx-auto" />

              {/* Instagram */}
              <div>
                <p className="editorial-spacing text-warm-gray-light mb-2">Instagram</p>
                <a
                  href="https://www.instagram.com/gracesflorette"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-heading text-xl sm:text-2xl text-dark hover:text-primary-dark transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                  @gracesflorette
                </a>
              </div>

              <div className="w-16 h-[1px] bg-primary-dark/20 mx-auto" />

              {/* Location */}
              <div>
                <p className="editorial-spacing text-warm-gray-light mb-2">Location</p>
                <p className="font-heading text-xl text-dark">Singapore</p>
                <p className="text-sm text-warm-gray-light mt-1">
                  Delivery available island-wide
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="mt-10 text-sm italic font-heading text-warm-gray-light">
              &ldquo;Flowers are for everyone&rdquo;
            </p>
            <p className="text-xs text-warm-gray-light mt-1">Love, Grace</p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
