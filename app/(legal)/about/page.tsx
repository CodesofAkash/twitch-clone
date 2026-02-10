import { Metadata } from "next";
import Link from "next/link";

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
        Have questions or feedback? <Link href="/contact">Get in touch</Link> - we&apos;d love to hear from you!
      </p>
    </div>
  );
}