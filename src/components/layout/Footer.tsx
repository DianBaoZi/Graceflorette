import Link from "next/link";

function FooterFloral() {
  return (
    <svg
      viewBox="0 0 120 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-28 h-7 opacity-30"
    >
      <path
        d="M10 15C15 8 25 8 30 15C25 22 15 22 10 15Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M30 15H90"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="2 3"
      />
      <path
        d="M90 15C95 8 105 8 110 15C105 22 95 22 90 15Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="20" cy="15" r="2" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="15" r="2" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

const shopLinks = [
  { href: "/shop", label: "All Flowers" },
];

const companyLinks = [
  { href: "/contact", label: "Contact" },
  { href: "https://www.instagram.com/gracesflorette", label: "Instagram", external: true },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/shipping-policy", label: "Shipping Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-cream/70">
      {/* Top ornament */}
      <div className="flex justify-center pt-12 pb-8 text-cream/30">
        <FooterFloral />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-xl text-cream mb-3">
              Grace&apos;s Florette
            </h3>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">
              Hand-crafted floral arrangements made with love in Singapore.
              Every bouquet tells a story.
            </p>
            <p className="text-sm italic font-heading text-primary-dark">
              &ldquo;Flowers are for everyone&rdquo;
            </p>
            <p className="text-xs mt-1 text-cream/40">Love, Grace</p>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="editorial-spacing text-cream/50 mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="editorial-spacing text-cream/50 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  {"external" in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-primary transition-colors duration-300 inline-flex items-center gap-1"
                    >
                      {link.label}
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                        <path
                          d="M3.5 2.5h6v6M9.5 2.5L2.5 9.5"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="editorial-spacing text-cream/50 mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/30">
            &copy; {new Date().getFullYear()} Grace&apos;s Florette. All rights
            reserved.
          </p>
          <p className="text-xs text-cream/30">
            Made with care in Singapore
          </p>
        </div>
      </div>
    </footer>
  );
}
