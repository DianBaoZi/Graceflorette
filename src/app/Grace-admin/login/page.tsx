"use client";

import { login } from "@/lib/actions/auth";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        router.push("/Grace-admin");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    fontSize: "0.875rem",
    background: "white",
    border: "1.5px solid #F2D7D9",
    borderRadius: "0.75rem",
    color: "#2C2826",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Brand Panel */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #2C2826 0%, #1A1714 100%)" }}
      >
        {/* Subtle decorative circle */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5"
          style={{ background: "#F2D7D9" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-5"
          style={{ background: "#C9A2A7" }}
        />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative w-9 h-9 rounded-full overflow-hidden" style={{ border: "1px solid rgba(242,215,217,0.2)" }}>
            <Image src="/logo.png" alt="Grace's Florette" fill className="object-contain" />
          </div>
          <span className="font-heading text-base" style={{ color: "#FDF8F4", letterSpacing: "0.02em" }}>
            Grace's Florette
          </span>
        </div>

        {/* Tagline */}
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: "rgba(201,162,167,0.5)" }}>
            Admin Panel
          </p>
          <blockquote
            className="font-heading leading-snug mb-4"
            style={{ color: "#F2D7D9", fontSize: "2.4rem" }}
          >
            "Every flower<br />tells a story."
          </blockquote>
          <p className="text-sm" style={{ color: "rgba(253,248,244,0.3)" }}>
            Manage your florette with care.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs" style={{ color: "rgba(253,248,244,0.2)" }}>
          © {new Date().getFullYear()} Grace's Florette
        </div>
      </div>

      {/* Right — Form Panel */}
      <div
        className="flex-1 flex items-center justify-center p-8"
        style={{ background: "#FDF8F4" }}
      >
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="relative w-14 h-14 mx-auto mb-3">
              <Image src="/logo.png" alt="Grace's Florette" fill className="object-contain" />
            </div>
            <h1 className="font-heading text-xl" style={{ color: "#2C2826" }}>
              Grace's Florette
            </h1>
          </div>

          <div className="mb-9">
            <h2 className="font-heading text-3xl" style={{ color: "#2C2826" }}>
              Welcome back
            </h2>
            <p className="mt-1.5 text-sm" style={{ color: "#9B9593" }}>
              Sign in to manage your florette
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                className="px-4 py-3 rounded-xl text-sm"
                style={{
                  background: "#FEF2F2",
                  color: "#B91C1C",
                  border: "1px solid #FECACA",
                }}
              >
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "#9B9593" }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={loading}
                placeholder="admin@gracesflorette.com"
                style={inputBase}
                onFocus={(e) => {
                  e.target.style.borderColor = "#C9A2A7";
                  e.target.style.boxShadow = "0 0 0 3px rgba(201,162,167,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#F2D7D9";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "#9B9593" }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                disabled={loading}
                placeholder="••••••••"
                style={inputBase}
                onFocus={(e) => {
                  e.target.style.borderColor = "#C9A2A7";
                  e.target.style.boxShadow = "0 0 0 3px rgba(201,162,167,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#F2D7D9";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60 mt-2"
              style={{
                background: "linear-gradient(135deg, #C9A2A7 0%, #b5828a 100%)",
                letterSpacing: "0.02em",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
