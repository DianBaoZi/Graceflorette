import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#FDF8F4" }}
    >
      {/* Decorative flowers */}
      <div className="relative mb-8 select-none" aria-hidden="true">
        <span className="absolute -top-6 -left-8 text-5xl opacity-30 rotate-[-20deg]">🌸</span>
        <span className="absolute -top-4 -right-10 text-4xl opacity-25 rotate-[15deg]">🌷</span>
        <span className="absolute bottom-0 -left-12 text-3xl opacity-20 rotate-[-10deg]">🌿</span>
        <span className="absolute bottom-2 -right-8 text-3xl opacity-20 rotate-[12deg]">🌼</span>
        <div
          className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center mx-auto"
          style={{
            background: "linear-gradient(135deg, #F2D7D9 0%, #FDF8F4 100%)",
            border: "2px solid rgba(201,162,167,0.3)",
            boxShadow: "0 8px 32px rgba(201,162,167,0.2)",
          }}
        >
          <span className="text-5xl">🌸</span>
        </div>
      </div>

      {/* 404 */}
      <p
        className="text-7xl font-heading font-bold mb-2"
        style={{ color: "#C9A2A7", letterSpacing: "-0.02em" }}
      >
        404
      </p>

      <h1
        className="font-heading text-2xl mb-3"
        style={{ color: "#2C2826" }}
      >
        This page has wilted away
      </h1>

      <p className="text-sm max-w-xs mb-8" style={{ color: "#9B9593", lineHeight: 1.7 }}>
        The page you&apos;re looking for couldn&apos;t be found. Perhaps it was moved, or it never bloomed here at all.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg, #C9A2A7, #b5828a)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
          style={{
            background: "white",
            color: "#C9A2A7",
            border: "1.5px solid #F2D7D9",
          }}
        >
          Browse Flowers
        </Link>
      </div>
    </div>
  );
}
