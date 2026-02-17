"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-cream">
      {/* Subtle radial blush glow behind logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[70vmin] h-[70vmin] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(242,215,217,0.25) 0%, rgba(234,234,226,0) 70%)",
          }}
        />
      </motion.div>

      {/* Logo with pulse animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="relative"
      >
        <Image
          src="/logo.png"
          alt=""
          width={800}
          height={800}
          priority
          className="w-[50vmin] h-[50vmin] object-contain select-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
