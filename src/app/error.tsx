"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#FDF8F4" }}
    >
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
          <span className="text-5xl">🥀</span>
        </div>
      </div>

      <h1 className="font-heading text-2xl mb-3" style={{ color: "#2C2826" }}>
        Something went wrong
      </h1>

      <p
        className="text-sm max-w-xs mb-8"
        style={{ color: "#9B9593", lineHeight: 1.7 }}
      >
        We hit an unexpected hiccup. Please try again — if the problem
        persists, come back in a few minutes.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg, #C9A2A7, #b5828a)" }}
        >
          Try Again
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
          style={{
            background: "white",
            color: "#C9A2A7",
            border: "1.5px solid #F2D7D9",
          }}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
