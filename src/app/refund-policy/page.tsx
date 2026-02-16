import LegalPage from "@/components/layout/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy — Grace's Florette",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" lastUpdated="16 February 2026">
      <p>
        At Grace&apos;s Florette, we take great pride in the quality of our floral
        arrangements. We want you to be completely satisfied with your purchase.
      </p>

      <h2>Quality Guarantee</h2>
      <p>
        If your arrangement arrives damaged or does not meet our quality
        standards, please contact us within <strong>24 hours</strong> of
        delivery with photographic evidence. We will work with you to resolve
        the issue promptly.
      </p>

      <h2>Refund Eligibility</h2>
      <p>Refunds or replacements may be issued in the following cases:</p>
      <ul>
        <li>Flowers arrive wilted, damaged, or in poor condition</li>
        <li>The arrangement is significantly different from what was ordered</li>
        <li>Delivery was not made on the agreed date without prior communication</li>
      </ul>

      <h2>Non-Refundable Cases</h2>
      <p>We are unable to offer refunds in the following situations:</p>
      <ul>
        <li>Minor variations in flower colour, size, or bloom stage (this is natural)</li>
        <li>Flowers that have naturally wilted after the expected vase life</li>
        <li>Issues reported more than 24 hours after delivery</li>
        <li>Incorrect delivery address provided by the customer</li>
        <li>Arrangements that were not stored or cared for as recommended</li>
      </ul>

      <h2>Cancellations</h2>
      <ul>
        <li>Orders may be cancelled for a full refund up to <strong>48 hours</strong> before the scheduled delivery date.</li>
        <li>Cancellations within 48 hours of delivery may incur a cancellation fee of up to 50% of the order value.</li>
        <li>Custom or bespoke arrangements cannot be cancelled once preparation has begun.</li>
      </ul>

      <h2>Refund Process</h2>
      <p>
        Approved refunds will be processed within <strong>5–7 business days</strong>{" "}
        via the original payment method. You will receive a confirmation email
        once the refund has been initiated.
      </p>

      <h2>Contact Us</h2>
      <p>
        To request a refund or report an issue, please reach out through our{" "}
        <a href="/contact">contact page</a> or message us on{" "}
        <a
          href="https://www.instagram.com/gracesflorette"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>{" "}
        with your order details and photos.
      </p>
    </LegalPage>
  );
}
