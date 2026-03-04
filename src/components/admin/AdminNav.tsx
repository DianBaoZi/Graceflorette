"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import Image from "next/image";

const navItems = [
  {
    name: "Homepage",
    href: "/Grace-admin/homepage",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "Products",
    href: "/Grace-admin/products",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    name: "Categories",
    href: "/Grace-admin/categories",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  return (
    <>
      <aside
        className="w-52 flex flex-col h-screen sticky top-0 shrink-0"
        style={{
          background: "linear-gradient(180deg, #2C2826 0%, #1E1A18 100%)",
          borderRight: "1px solid rgba(242,215,217,0.07)",
        }}
      >
        {/* Logo */}
        <div
          className="px-4 py-5 flex flex-col items-center gap-2"
          style={{ borderBottom: "1px solid rgba(242,215,217,0.08)" }}
        >
          <Link href="/Grace-admin" className="flex flex-col items-center gap-3">
            <div
              className="relative w-12 h-12 rounded-full overflow-hidden"
              style={{ border: "1.5px solid rgba(242,215,217,0.18)" }}
            >
              <Image
                src="/logo.png"
                alt="Grace's Florette"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <h1
                className="font-heading text-sm leading-tight"
                style={{ color: "#FDF8F4", letterSpacing: "0.03em" }}
              >
                Grace's Florette
              </h1>
              <p
                className="text-xs mt-0.5 uppercase tracking-widest"
                style={{ color: "rgba(201,162,167,0.55)", fontSize: "0.6rem" }}
              >
                Admin
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          <p
            className="text-xs px-3 mb-3 uppercase tracking-widest"
            style={{ color: "rgba(155,149,147,0.4)", fontSize: "0.6rem" }}
          >
            Menu
          </p>
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group"
                style={
                  isActive
                    ? { background: "rgba(242,215,217,0.1)", color: "#FDF8F4" }
                    : { color: "rgba(253,248,244,0.42)" }
                }
              >
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                    style={{ background: "#C9A2A7" }}
                  />
                )}
                <span
                  style={{
                    color: isActive
                      ? "#C9A2A7"
                      : "rgba(253,248,244,0.3)",
                    transition: "color 0.2s",
                  }}
                >
                  {item.icon}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ letterSpacing: "0.01em" }}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div
          className="px-3 pb-5 pt-4"
          style={{ borderTop: "1px solid rgba(242,215,217,0.07)" }}
        >
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left"
            style={{ color: "rgba(253,248,244,0.3)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.07)";
              e.currentTarget.style.color = "rgba(252,165,165,0.75)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(253,248,244,0.3)";
            }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(44,40,38,0.55)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-sm w-full"
            style={{
              boxShadow: "0 24px 64px rgba(44,40,38,0.15)",
              border: "1px solid rgba(242,215,217,0.35)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "#FEF2F2" }}
            >
              <svg className="w-5 h-5" style={{ color: "#F87171" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2
              className="font-heading text-xl text-center mb-2"
              style={{ color: "#2C2826" }}
            >
              Sign Out?
            </h2>
            <p
              className="text-sm text-center mb-7"
              style={{ color: "#9B9593" }}
            >
              You'll need to sign in again to access the admin panel.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                style={{
                  border: "1.5px solid #F2D7D9",
                  color: "#6B6462",
                  background: "white",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
              >
                {isLoggingOut ? "Signing out…" : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
