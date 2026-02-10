import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | StreamHub",
  description: "Terms and conditions for using StreamHub",
};

export default function TermsPage() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using StreamHub, you agree to be bound by these Terms of Service.
        If you do not agree to these terms, please do not use our service.
      </p>

      <h2>2. User Accounts</h2>
      <p>To use certain features, you must create an account. You agree to:</p>
      <ul>
        <li>Provide accurate and complete information</li>
        <li>Maintain the security of your account credentials</li>
        <li>Notify us immediately of any unauthorized access</li>
        <li>Be responsible for all activity under your account</li>
      </ul>

      <h2>3. Content Guidelines</h2>
      <p>When streaming or chatting on StreamHub, you must not:</p>
      <ul>
        <li>Share illegal, harmful, or offensive content</li>
        <li>Infringe on intellectual property rights</li>
        <li>Harass, threaten, or abuse other users</li>
        <li>Spam or distribute malware</li>
        <li>Impersonate others or provide false information</li>
      </ul>

      <h2>4. Streaming Guidelines</h2>
      <p>All streamers must:</p>
      <ul>
        <li>Own rights to content they stream</li>
        <li>Comply with all applicable laws</li>
        <li>Respect community standards</li>
        <li>Not stream inappropriate or harmful content</li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <p>
        You retain ownership of content you create. By streaming on StreamHub, you grant us
        a license to display, distribute, and promote your content.
      </p>

      <h2>6. Termination</h2>
      <p>
        We reserve the right to suspend or terminate accounts that violate these terms or
        engage in harmful behavior.
      </p>

      <h2>7. Disclaimers</h2>
      <p>
        StreamHub is provided &quot;as is&quot; without warranties. We are not responsible for user-generated
        content or third-party services.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        StreamHub shall not be liable for any indirect, incidental, or consequential damages
        arising from your use of the service.
      </p>

      <h2>9. Changes to Terms</h2>
      <p>
        We may modify these terms at any time. Continued use of the service constitutes
        acceptance of updated terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        For questions about these Terms of Service, please <Link href="/contact">contact us</Link>.
      </p>
    </div>
  );
}