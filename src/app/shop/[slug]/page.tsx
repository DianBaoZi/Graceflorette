"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { sampleProducts } from "@/lib/sample-data";
import type { ProductSize } from "@/lib/types";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = sampleProducts.find((p) => p.slug === slug);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product?.sizes[0] ?? null
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl text-dark mb-2">
            Product not found
          </h1>
          <Link
            href="/shop"
            className="text-sm text-warm-gray hover:text-dark transition-colors underline"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem(product, selectedSize, quantity);
      setQuantity(1);
    }
  };

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
          {/* Image */}
          <AnimatedSection direction="left">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
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

              {/* Size selector */}
              <div className="mb-6">
                <p className="text-xs tracking-wider uppercase text-warm-gray-light mb-3">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-lg text-sm transition-all duration-300 border ${
                        selectedSize?.name === size.name
                          ? "border-dark bg-dark text-cream"
                          : "border-primary/30 text-warm-gray hover:border-primary-dark/50 hover:bg-primary/10"
                      }`}
                    >
                      <span className="block font-medium">{size.name}</span>
                      <span className="block text-xs mt-0.5 opacity-70">
                        ${size.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-xs tracking-wider uppercase text-warm-gray-light mb-3">
                  Quantity
                </p>
                <div className="inline-flex items-center border border-primary/30 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-warm-gray hover:text-dark transition-colors"
                  >
                    &minus;
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center text-sm font-medium text-dark border-x border-primary/30">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-warm-gray hover:text-dark transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price + Add to cart */}
              <div className="flex items-center gap-6 mb-6">
                <p className="text-2xl font-heading text-dark">
                  ${selectedSize ? (selectedSize.price * quantity).toFixed(2) : product.price.toFixed(2)}
                </p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="flex-1 max-w-xs py-3.5 bg-dark text-cream text-sm tracking-wider uppercase font-medium rounded-lg hover:bg-dark/90 transition-colors"
                >
                  Add to Cart
                </motion.button>
              </div>

              {/* Occasions */}
              {product.occasions.length > 0 && (
                <div className="pt-6 border-t border-primary/15">
                  <p className="text-xs text-warm-gray-light mb-2">
                    Perfect for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.occasions.map((occ) => (
                      <span
                        key={occ}
                        className="px-3 py-1 bg-primary/10 text-xs text-warm-gray rounded-full capitalize"
                      >
                        {occ.replace("-", " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
