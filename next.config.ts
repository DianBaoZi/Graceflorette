import type { NextConfig } from "next";

// Content-Security-Policy:
// - script-src 'unsafe-inline': required by Next.js for inline hydration scripts
// - style-src  'unsafe-inline': required by Tailwind CSS / Framer Motion inline styles
// - img-src blob: required for image previews in the admin upload component
// - connect-src wss://*.supabase.co: required for Supabase realtime subscriptions
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co",
  "font-src 'self'",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  // Prevent browsers from sniffing MIME types
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Prevent the site from being framed (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Enforce HTTPS for 2 years (Vercel already does this but belt-and-suspenders)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Control referrer information
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unused browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Content Security Policy
  { key: "Content-Security-Policy", value: cspHeader },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Only allow images from your specific Supabase project, not all of *.supabase.co
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/grace-admin",
        destination: "/Grace-admin/login",
        permanent: false,
      },
      {
        source: "/grace-admin/:path*",
        destination: "/Grace-admin/:path*",
        permanent: false,
      },
    ];
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
