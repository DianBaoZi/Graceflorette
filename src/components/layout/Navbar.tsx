"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

function FloralLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
    >
      {/* Stem */}
      <path
        d="M24 44C24 44 24 28 24 24"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d="M24 34C20 32 16 34 15 37C18 36 22 35 24 34Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Right leaf */}
      <path
        d="M24 30C28 28 32 30 33 33C30 32 26 31 24 30Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Center */}
      <circle cx="24" cy="16" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Petals */}
      <ellipse cx="24" cy="9" rx="3.5" ry="5" stroke="currentColor" strokeWidth="1" fill="none" />
      <ellipse
        cx="24"
        cy="9"
        rx="3.5"
        ry="5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        transform="rotate(60 24 16)"
      />
      <ellipse
        cx="24"
        cy="9"
        rx="3.5"
        ry="5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        transform="rotate(120 24 16)"
      />
      <ellipse
        cx="24"
        cy="9"
        rx="3.5"
        ry="5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        transform="rotate(180 24 16)"
      />
      <ellipse
        cx="24"
        cy="9"
        rx="3.5"
        ry="5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        transform="rotate(240 24 16)"
      />
      <ellipse
        cx="24"
        cy="9"
        rx="3.5"
        ry="5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        transform="rotate(300 24 16)"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path
        d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 6H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 overflow-hidden transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(201,162,167,0.15)]"
            : "bg-cream"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="relative flex items-center justify-between h-18 sm:h-24 lg:h-32">
            {/* Logo */}
            <Link
              href="/"
              className="block hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <Image
                src="/logo.png"
                alt="Grace's Florette"
                width={320}
                height={320}
                className="h-14 sm:h-20 lg:h-28 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav links - absolutely centered */}
            <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link, index) => (
                <div key={link.href} className="flex items-center">
                  <motion.div whileHover="hover" initial="initial">
                    <Link
                      href={link.href}
                      className="relative px-5 py-2 text-xs uppercase tracking-[0.2em] text-warm-gray hover:text-dark transition-colors duration-300 block outline-none focus:outline-none"
                    >
                      <motion.span
                        className="relative z-10 block"
                        variants={{
                          initial: { y: 0 },
                          hover: { y: -2 },
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {link.label}
                      </motion.span>
                      <motion.span
                        className="absolute inset-x-3 bottom-1 h-[1px] bg-primary-dark/70"
                        variants={{
                          initial: { scaleX: 0, opacity: 0 },
                          hover: { scaleX: 1, opacity: 1 },
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ originX: 0.5 }}
                      />
                    </Link>
                  </motion.div>
                  {index < navLinks.length - 1 && (
                    <span className="text-primary/30 text-sm select-none mx-1">·</span>
                  )}
                </div>
              ))}
            </div>

            {/* Right side: cart + mobile menu */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                onClick={toggleCart}
                className="relative text-warm-gray hover:text-dark transition-colors p-1"
                aria-label="Open cart"
              >
                <CartIcon />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-primary-dark text-white text-[10px] font-medium w-4.5 h-4.5 rounded-full flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-warm-gray hover:text-dark transition-colors p-1"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-dark/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-cream shadow-2xl flex flex-col"
            >
              <div className="h-18 flex items-center justify-end px-6">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-warm-gray hover:text-dark transition-colors p-1"
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>

              <nav className="flex flex-col px-8 pt-8 gap-0">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center gap-4 py-4 border-b border-primary/20 outline-none focus:outline-none"
                    >
                      <span className="text-xs text-primary-dark/50 font-light">0{i + 1}</span>
                      <span className="text-sm uppercase tracking-[0.15em] text-dark group-hover:text-primary-dark transition-colors duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto px-8 pb-10">
                <p className="text-sm text-warm-gray-light italic font-heading">
                  &ldquo;Flowers are for everyone&rdquo;
                </p>
                <p className="text-xs text-warm-gray-light mt-1">
                  Love, Grace
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-18 sm:h-24 lg:h-32" />
    </>
  );
}
