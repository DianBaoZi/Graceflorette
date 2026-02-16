import LegalPage from "@/components/layout/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Grace's Florette",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="16 February 2026">
      <p>
        Grace&apos;s Florette (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your
        privacy. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you visit our website and use our
        services.
      </p>

      <h2>Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, phone
          number, and delivery address when you place an order or contact us.
        </li>
        <li>
          <strong>Order Information:</strong> Details about the products you
          purchase, payment information, and delivery preferences.
        </li>
        <li>
          <strong>Usage Data:</strong> Information about how you interact with
          our website, including pages visited, time spent, and referring URLs.
        </li>
        <li>
          <strong>Cookies:</strong> We use cookies and similar tracking
          technologies to enhance your browsing experience.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Process and fulfil your orders</li>
        <li>Communicate with you about your orders and requests</li>
        <li>Improve our website and services</li>
        <li>Send promotional communications (with your consent)</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>Data Protection</h2>
      <p>
        We implement appropriate technical and organisational measures to protect
        your personal data against unauthorised access, alteration, disclosure,
        or destruction. In accordance with Singapore&apos;s Personal Data Protection
        Act (PDPA), we handle your data with care and transparency.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may share your information with trusted third-party service providers
        who assist us in operating our website, processing payments, and
        delivering orders. These parties are obligated to keep your information
        confidential.
      </p>

      <h2>Your Rights</h2>
      <p>Under the PDPA, you have the right to:</p>
      <ul>
        <li>Access your personal data we hold</li>
        <li>Request correction of inaccurate data</li>
        <li>Withdraw consent for data processing</li>
        <li>Request deletion of your data (subject to legal requirements)</li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        through our{" "}
        <a href="/contact">contact page</a> or via Instagram{" "}
        <a
          href="https://www.instagram.com/gracesflorette"
          target="_blank"
          rel="noopener noreferrer"
        >
          @gracesflorette
        </a>
        .
      </p>
    </LegalPage>
  );
}
