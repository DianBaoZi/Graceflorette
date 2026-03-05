"use client";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: "#FDF8F4" }}>
      <div className="text-center max-w-sm">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "#FEF2F2" }}
        >
          <svg className="w-7 h-7" style={{ color: "#EF4444" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        <h1 className="font-heading text-xl mb-2" style={{ color: "#2C2826" }}>
          Something went wrong
        </h1>
        <p className="text-sm mb-6" style={{ color: "#9B9593" }}>
          An unexpected error occurred. Please try again.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #C9A2A7, #b5828a)" }}
          >
            Try Again
          </button>
          <a
            href="/grace-admin/products"
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{ border: "1.5px solid #F2D7D9", color: "#6B6462", background: "white" }}
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
