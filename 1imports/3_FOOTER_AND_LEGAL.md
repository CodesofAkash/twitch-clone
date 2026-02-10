# PART 3: FOOTER & LEGAL PAGES

Production-quality footer and all legal pages

---

## FILE 11: components/footer.tsx (CREATE NEW FILE)

```typescript
import Link from "next/link";
import { Github, Twitter, Youtube, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background mt-20">
      <div className="max-w-screen-2xl mx-auto px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Platform */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/features" className="hover:text-foreground transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-foreground transition">
                  Browse Streams
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-foreground transition">
                  Start Streaming
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition inline-flex items-center gap-1"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/features" className="hover:text-foreground transition">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates and features.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                className="flex-1"
              />
              <Button type="submit" size="icon">
                →
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StreamHub. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

Continue in next file...

---

## FILE 12: app/(legal)/layout.tsx (CREATE NEW FILE)

```typescript
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      {children}
    </div>
  );
}
```

---

## FILE 13: app/(legal)/privacy/page.tsx (CREATE NEW FILE)

```typescript
import { Metadata } from "next";

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
        <a href="/contact">our contact page</a>.
      </p>
    </div>
  );
}
```

---

## FILE 14: app/(legal)/terms/page.tsx (CREATE NEW FILE)

```typescript
import { Metadata } from "next";

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
        StreamHub is provided "as is" without warranties. We are not responsible for user-generated
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
        For questions about these Terms of Service, please <a href="/contact">contact us</a>.
      </p>
    </div>
  );
}
```

---

## FILE 15: app/(legal)/about/page.tsx (CREATE NEW FILE)

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About StreamHub",
  description: "Learn about our mission and technology",
};

export default function AboutPage() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>About StreamHub</h1>

      <h2>Our Mission</h2>
      <p>
        StreamHub is a modern, open-source live streaming platform built with cutting-edge web technologies.
        Our mission is to provide creators with professional-grade streaming tools that are accessible,
        reliable, and easy to use.
      </p>

      <h2>Technology Stack</h2>
      <p>StreamHub is built using:</p>
      <ul>
        <li><strong>Next.js 15</strong> - Modern React framework with App Router</li>
        <li><strong>LiveKit</strong> - Real-time video streaming infrastructure</li>
        <li><strong>Clerk</strong> - Secure authentication and user management</li>
        <li><strong>Prisma & PostgreSQL</strong> - Type-safe database access</li>
        <li><strong>Tailwind CSS</strong> - Beautiful, responsive UI</li>
      </ul>

      <h2>Features</h2>
      <p>StreamHub offers:</p>
      <ul>
        <li>Real-time live streaming with WebRTC</li>
        <li>Interactive chat with real-time messaging</li>
        <li>Categories and tags for content discovery</li>
        <li>Follow system and social features</li>
        <li>Creator dashboard with stream management</li>
        <li>Responsive design for all devices</li>
      </ul>

      <h2>Open Source</h2>
      <p>
        StreamHub is an open-source project built for learning and demonstration purposes.
        Feel free to explore the code, contribute, or use it as a reference for your own projects.
      </p>

      <h2>Contact Us</h2>
      <p>
        Have questions or feedback? <a href="/contact">Get in touch</a> - we'd love to hear from you!
      </p>
    </div>
  );
}
```

---

## FILE 16: app/(legal)/contact/page.tsx (CREATE NEW FILE)

```typescript
import { Metadata } from "next";
import { Mail, MessageSquare, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Contact Us | StreamHub",
  description: "Get in touch with the StreamHub team",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-8">
        Have a question or feedback? We'd love to hear from you.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <Mail className="h-8 w-8 mb-3 text-primary" />
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-sm text-muted-foreground">support@streamhub.com</p>
        </div>

        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <MessageSquare className="h-8 w-8 mb-3 text-primary" />
          <h3 className="font-semibold mb-1">Discord</h3>
          <p className="text-sm text-muted-foreground">Join our community</p>
        </div>

        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <Github className="h-8 w-8 mb-3 text-primary" />
          <h3 className="font-semibold mb-1">GitHub</h3>
          <p className="text-sm text-muted-foreground">Report issues</p>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="How can we help?" />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Tell us more..."
            rows={6}
          />
        </div>

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </div>
  );
}
```

---

## ✅ FOOTER & LEGAL PAGES COMPLETE

Next: Download `4_FEATURES_PAGE.md` for the features/roadmap page.
