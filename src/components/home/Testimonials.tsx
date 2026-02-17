"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    name: "Sarah L.",
    text: "The most beautiful bouquet I've ever received! Grace's attention to detail is incredible.",
    rating: 5,
  },
  {
    name: "Michelle T.",
    text: "Ordered for my mum's birthday and she absolutely loved it. Will definitely order again!",
    rating: 5,
  },
  {
    name: "David K.",
    text: "Fresh flowers, beautiful arrangement, and lovely packaging. Highly recommend!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-cream">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-10">
          <p className="editorial-spacing text-warm-gray-light mb-2">
            What Our Customers Say
          </p>
          <div className="flex items-center justify-center gap-1 text-amber-500 text-lg">
            ★★★★★
          </div>
          <p className="text-sm text-warm-gray mt-1">5.0 from happy customers</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection
              key={testimonial.name}
              delay={index * 0.1}
              variant="scale"
              direction="none"
            >
              <div className="bg-white rounded-xl p-6 border border-primary/10 h-full">
                <div className="flex gap-0.5 text-amber-500 text-sm mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-warm-gray text-sm leading-relaxed mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="text-xs font-medium text-dark">
                  {testimonial.name}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
