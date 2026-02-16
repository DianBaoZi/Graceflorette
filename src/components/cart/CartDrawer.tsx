"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CartItemComponent from "./CartItem";

export default function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice, clearCart } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-dark/25 backdrop-blur-[2px]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-cream shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary/20">
              <div>
                <h2 className="font-heading text-xl text-dark">Your Cart</h2>
                <p className="text-xs text-warm-gray-light mt-0.5">
                  {totalItems === 0
                    ? "Your cart is empty"
                    : `${totalItems} item${totalItems > 1 ? "s" : ""}`}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="text-warm-gray hover:text-dark transition-colors p-1"
                aria-label="Close cart"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-20"
                  >
                    <svg
                      viewBox="0 0 64 64"
                      fill="none"
                      className="w-16 h-16 text-primary-dark/30 mb-4"
                    >
                      <circle cx="32" cy="24" r="5" stroke="currentColor" strokeWidth="1.2" />
                      <ellipse cx="32" cy="14" rx="5" ry="8" stroke="currentColor" strokeWidth="1" />
                      <ellipse cx="32" cy="14" rx="5" ry="8" stroke="currentColor" strokeWidth="1" transform="rotate(60 32 24)" />
                      <ellipse cx="32" cy="14" rx="5" ry="8" stroke="currentColor" strokeWidth="1" transform="rotate(120 32 24)" />
                      <ellipse cx="32" cy="14" rx="5" ry="8" stroke="currentColor" strokeWidth="1" transform="rotate(180 32 24)" />
                      <ellipse cx="32" cy="14" rx="5" ry="8" stroke="currentColor" strokeWidth="1" transform="rotate(240 32 24)" />
                      <ellipse cx="32" cy="14" rx="5" ry="8" stroke="currentColor" strokeWidth="1" transform="rotate(300 32 24)" />
                      <path d="M32 32V54" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M32 42C28 40 24 42 23 45" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      <path d="M32 38C36 36 40 38 41 41" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <p className="font-heading text-dark text-lg mb-1">
                      No blooms yet
                    </p>
                    <p className="text-sm text-warm-gray-light">
                      Add some flowers to brighten your day
                    </p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <CartItemComponent
                      key={`${item.product.id}-${item.selectedSize.name}`}
                      item={item}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Summary */}
            {items.length > 0 && (
              <div className="border-t border-primary/20 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-warm-gray">Subtotal</span>
                  <span className="text-lg font-heading text-dark">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-warm-gray-light">
                  Shipping calculated at checkout
                </p>
                <button className="w-full py-3.5 bg-dark text-cream text-sm tracking-wider uppercase font-medium rounded-lg hover:bg-dark/90 transition-colors">
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-xs text-warm-gray-light hover:text-primary-dark transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
