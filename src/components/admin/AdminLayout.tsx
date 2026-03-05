"use client";

import AdminNav from "@/components/admin/AdminNav";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: "#F5EDE5" }}>
      <AdminNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Mobile menu toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-3 left-3 z-30 p-3 rounded-xl shadow-lg active:scale-95 transition-transform"
        style={{
          background: "linear-gradient(135deg, #2C2826 0%, #1E1A18 100%)",
          border: "1px solid rgba(242,215,217,0.12)"
        }}
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <main className="flex-1 overflow-x-hidden overflow-y-auto min-w-0 w-full">
        <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 min-w-0 pt-16 lg:pt-4">{children}</div>
      </main>
    </div>
  );
}
