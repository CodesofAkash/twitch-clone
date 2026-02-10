import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | StreamHub",
  description: "How we handle and protect your personal information",
};

export default function PrivacyPage() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect information you provide directly to us when you create an account, update your profile,
        or use our streaming services. This includes:
      </p>
      <ul>
        <li>Account information (username, email, profile picture)</li>
        <li>Stream data (stream titles, categories, tags)</li>
        <li>Usage data (viewing history, chat messages)</li>
        <li>Device information (IP address, browser type)</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide and improve our services</li>
        <li>Personalize your experience</li>
        <li>Communicate with you about updates and features</li>
        <li>Ensure platform security and prevent abuse</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>
        We do not sell your personal information. We may share information with:
      </p>
      <ul>
        <li>Service providers (authentication, streaming infrastructure)</li>
        <li>Law enforcement when required by law</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your data, including encryption,
        secure authentication, and regular security audits.
      </p>

      <h2>5. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Delete your account and data</li>
        <li>Opt out of marketing communications</li>
      </ul>

      <h2>6. Cookies</h2>
      <p>
        We use cookies and similar technologies to enhance your experience, analyze usage,
        and maintain session security.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at{" "}
        <Link href="/contact">our contact page</Link>.
      </p>
    </div>
  );
}