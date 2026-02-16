"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          >
            {/* Subtle radial blush glow */}
            <div
              className="absolute w-[70vmin] h-[70vmin] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(242,215,217,0.25) 0%, rgba(253,248,244,0) 70%)",
              }}
            />

            {/* Logo with breathing animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: [0, 1, 1, 1],
                scale: [0.92, 1, 1.02, 1],
              }}
              transition={{
                duration: 2.4,
                times: [0, 0.3, 0.65, 1],
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 0.2,
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
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
