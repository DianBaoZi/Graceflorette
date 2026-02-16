import LegalPage from "@/components/layout/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy — Grace's Florette",
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping Policy" lastUpdated="16 February 2026">
      <p>
        Grace&apos;s Florette offers delivery services across Singapore. We handle
        every arrangement with care to ensure your flowers arrive fresh and
        beautiful.
      </p>

      <h2>Delivery Areas</h2>
      <p>
        We currently deliver island-wide across Singapore, including residential
        addresses, offices, hospitals, and hotels.
      </p>

      <h2>Delivery Schedule</h2>
      <ul>
        <li><strong>Standard Delivery:</strong> Monday to Saturday, 9am – 7pm</li>
        <li><strong>Sunday Delivery:</strong> 10am – 5pm</li>
        <li>Specific time-slot requests are subject to availability</li>
        <li>Orders placed after 2pm may be scheduled for the next available delivery day</li>
      </ul>

      <h2>Delivery Fees</h2>
      <ul>
        <li><strong>Standard Delivery:</strong> $8 – $15 depending on location</li>
        <li><strong>Express/Same-Day Delivery:</strong> Additional surcharge applies</li>
        <li>Free delivery for orders above $100</li>
      </ul>

      <h2>Order Lead Times</h2>
      <ul>
        <li><strong>Standard arrangements:</strong> 1–2 business days</li>
        <li><strong>Custom/bespoke arrangements:</strong> Minimum 2 business days</li>
        <li><strong>Peak periods</strong> (Valentine&apos;s Day, Mother&apos;s Day, etc.): We recommend ordering at least 1 week in advance</li>
      </ul>

      <h2>Delivery Instructions</h2>
      <p>
        Please provide accurate and complete delivery details including:
      </p>
      <ul>
        <li>Full address with unit/floor number</li>
        <li>Recipient&apos;s name and contact number</li>
        <li>Any special delivery instructions (e.g., leave at reception, call upon arrival)</li>
      </ul>

      <h2>Failed Deliveries</h2>
      <p>
        If the recipient is unavailable and no alternative arrangements can be
        made, we will attempt to leave the arrangement at a safe location or with
        building reception. A re-delivery fee may apply for subsequent attempts.
      </p>

      <h2>Freshness Guarantee</h2>
      <p>
        All arrangements are prepared fresh on the day of delivery. We include
        care instructions with every order to help your flowers last as long as
        possible.
      </p>

      <h2>Contact Us</h2>
      <p>
        For delivery enquiries, please reach out through our{" "}
        <a href="/contact">contact page</a> or message us on{" "}
        <a
          href="https://www.instagram.com/gracesflorette"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        .
      </p>
    </LegalPage>
  );
}
