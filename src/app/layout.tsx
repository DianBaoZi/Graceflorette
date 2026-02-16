import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grace's Florette — Flowers are for everyone",
  description:
    "Hand-crafted floral arrangements by Grace in Singapore. Bouquets, vase arrangements, and roses for every occasion. Flowers are for everyone.",
  keywords: [
    "florist",
    "Singapore",
    "bouquet",
    "flowers",
    "roses",
    "vase arrangement",
    "Grace's Florette",
  ],
  openGraph: {
    title: "Grace's Florette — Flowers are for everyone",
    description:
      "Hand-crafted floral arrangements by Grace in Singapore. Bouquets, vase arrangements, and roses for every occasion.",
    type: "website",
    locale: "en_SG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
