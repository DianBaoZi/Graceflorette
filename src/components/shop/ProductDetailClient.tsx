"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // WhatsApp message pre-fill
  const whatsappNumber = "6591234567"; // Replace with Grace's actual WhatsApp number (with country code, no + or spaces)
  const message = `Hi Grace! I'm interested in the ${product.name} ($${product.price.toFixed(2)}).`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-xs text-warm-gray-light">
          <Link href="/" className="hover:text-dark transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-dark transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-dark">{product.name}</span>
        </nav>
      </div>

      {/* Product detail */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <AnimatedSection direction="left">
            <div className="flex gap-4">
              {/* Thumbnails - Show only if multiple images */}
              {product.images.length > 1 && (
                <div className="flex flex-col gap-3 w-20 sm:w-24">
                  {product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden bg-cream border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-primary-dark shadow-md"
                          : "border-primary/20 hover:border-primary/40"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="flex-1 relative aspect-square rounded-2xl overflow-hidden bg-cream">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>

                {/* Image counter */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-dark/70 backdrop-blur-sm rounded-full text-cream text-xs">
                    {selectedImageIndex + 1} / {product.images.length}
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection direction="right" className="flex flex-col justify-center">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl text-dark mb-4">
                {product.name}
              </h1>

              <p className="text-warm-gray leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <p className="text-3xl font-heading text-dark">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* WhatsApp order button */}
              <div className="flex flex-col gap-4">
                <motion.a
                  whileTap={{ scale: 0.97 }}
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 py-3.5 bg-[#25D366] text-white text-sm tracking-wider uppercase font-medium rounded-lg hover:bg-[#20BA5A] transition-all shadow-md hover:shadow-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {/* WhatsApp Icon */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Order via WhatsApp
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </motion.a>

                <Link
                  href="/shop"
                  className="inline-block text-center py-3.5 border-2 border-primary/30 text-warm-gray text-sm tracking-wider uppercase font-medium rounded-lg hover:border-primary-dark/50 hover:bg-primary/10 transition-all"
                >
                  Back to Shop
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
