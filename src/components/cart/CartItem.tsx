"use client";

import { motion } from "framer-motion";
import type { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, selectedSize, quantity } = item;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 py-4 border-b border-primary/20"
    >
      {/* Product image placeholder */}
      <div className="w-18 h-18 rounded-lg bg-primary/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 text-primary-dark/40">
          <circle cx="20" cy="15" r="3" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="20" cy="9" rx="3" ry="5" stroke="currentColor" strokeWidth="0.8" />
          <ellipse cx="20" cy="9" rx="3" ry="5" stroke="currentColor" strokeWidth="0.8" transform="rotate(72 20 15)" />
          <ellipse cx="20" cy="9" rx="3" ry="5" stroke="currentColor" strokeWidth="0.8" transform="rotate(144 20 15)" />
          <ellipse cx="20" cy="9" rx="3" ry="5" stroke="currentColor" strokeWidth="0.8" transform="rotate(216 20 15)" />
          <ellipse cx="20" cy="9" rx="3" ry="5" stroke="currentColor" strokeWidth="0.8" transform="rotate(288 20 15)" />
          <path d="M20 20V34" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-heading text-sm text-dark truncate">
          {product.name}
        </h4>
        <p className="text-xs text-warm-gray-light mt-0.5">
          {selectedSize.name}
        </p>

        <div className="flex items-center justify-between mt-2.5">
          {/* Quantity controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                updateQuantity(product.id, selectedSize.name, quantity - 1)
              }
              className="w-6 h-6 rounded-full border border-primary-dark/30 text-warm-gray hover:bg-primary/30 transition-colors flex items-center justify-center text-xs"
              aria-label="Decrease quantity"
            >
              &minus;
            </button>
            <span className="text-sm text-dark w-5 text-center font-medium">
              {quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(product.id, selectedSize.name, quantity + 1)
              }
              className="w-6 h-6 rounded-full border border-primary-dark/30 text-warm-gray hover:bg-primary/30 transition-colors flex items-center justify-center text-xs"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Price */}
          <p className="text-sm font-medium text-dark">
            ${(selectedSize.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(product.id, selectedSize.name)}
        className="self-start text-warm-gray-light hover:text-primary-dark transition-colors mt-0.5"
        aria-label="Remove item"
      >
        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </motion.div>
  );
}
