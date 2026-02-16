import LegalPage from "@/components/layout/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Grace's Florette",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="16 February 2026">
      <p>
        Welcome to Grace&apos;s Florette. By accessing or using our website and
        services, you agree to be bound by these Terms of Service. Please read
        them carefully.
      </p>

      <h2>Use of Our Services</h2>
      <p>
        You agree to use our website and services only for lawful purposes and
        in accordance with these terms. You must be at least 18 years old to
        make a purchase.
      </p>

      <h2>Products and Pricing</h2>
      <ul>
        <li>All prices are listed in Singapore Dollars (SGD) and are inclusive of GST where applicable.</li>
        <li>We reserve the right to modify prices without prior notice.</li>
        <li>Product images are for illustration purposes. As flowers are natural products, actual arrangements may vary slightly in colour, size, and composition.</li>
        <li>Seasonal availability may affect specific flower types. We will substitute with blooms of equal or greater value when necessary.</li>
      </ul>

      <h2>Orders</h2>
      <ul>
        <li>An order is confirmed once you receive an order confirmation from us.</li>
        <li>We reserve the right to refuse or cancel any order at our discretion.</li>
        <li>Custom orders require a minimum of 2 business days&apos; notice.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        All content on this website, including text, images, logos, and design
        elements, is the property of Grace&apos;s Florette and is protected by
        copyright and intellectual property laws. You may not reproduce,
        distribute, or use any content without our written permission.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Grace&apos;s Florette shall not be liable for any indirect, incidental, or
        consequential damages arising from the use of our services. Our
        liability is limited to the amount paid for the specific order in
        question.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by and construed in accordance with the laws of
        the Republic of Singapore. Any disputes shall be subject to the
        exclusive jurisdiction of the courts of Singapore.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms of Service from time to time. Continued use of
        our website after changes constitutes acceptance of the updated terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        For questions about these Terms of Service, please visit our{" "}
        <a href="/contact">contact page</a>.
      </p>
    </LegalPage>
  );
}
