import { Metadata } from "next";
import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | StreamHub",
  description: "How we handle and protect your personal information",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your privacy is important to us. We&apos;re committed to protecting your personal information.
        </p>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <Lock className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Secure by Design</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We use industry-standard encryption and security practices.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Eye className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Transparency</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We&apos;re clear about what data we collect and why we need it.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Your Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You can access, modify, or delete your data at any time.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
            <CardDescription>What data we gather when you use StreamHub</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Account Information</h4>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>Username and email address</li>
                <li>Profile picture and bio</li>
                <li>Account preferences and settings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Usage Data</h4>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>Streams you watch and create</li>
                <li>Chat messages and interactions</li>
                <li>Follow and block relationships</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Technical Data</h4>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage analytics and performance data</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
            <CardDescription>Why we collect and process your data</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
              <li>Provide and improve our streaming services</li>
              <li>Personalize your experience and content recommendations</li>
              <li>Communicate important updates and features</li>
              <li>Ensure platform security and prevent abuse</li>
              <li>Analyze usage patterns to enhance performance</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Data Sharing</CardTitle>
            <CardDescription>Who we share your information with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">We do NOT sell your personal data.</p>
              <p>We only share data with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Service Providers:</strong> Clerk (auth), LiveKit (streaming), Vercel (hosting)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
                <li><strong>Public Data:</strong> Your username, profile, and streams are publicly visible</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Your Privacy Rights</CardTitle>
            <CardDescription>What you can do with your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Access & Export</h4>
                <p className="text-muted-foreground">Request a copy of all your personal data</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Correction</h4>
                <p className="text-muted-foreground">Update inaccurate or incomplete information</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Deletion</h4>
                <p className="text-muted-foreground">Permanently delete your account and data</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Opt-Out</h4>
                <p className="text-muted-foreground">Unsubscribe from marketing communications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Contact Us</CardTitle>
            <CardDescription>Questions about your privacy?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm">
                  For privacy-related inquiries, please visit our{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    contact page
                  </Link>{" "}
                  or email us at{" "}
                  <a href="mailto:privacy@streamhub.com" className="text-primary hover:underline">
                    privacy@streamhub.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}