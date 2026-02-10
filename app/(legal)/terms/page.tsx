import { Metadata } from "next";
import { Scale, FileText, AlertTriangle, UserCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Terms of Service | StreamHub",
  description: "Terms and conditions for using StreamHub",
};

export default function TermsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Scale className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Please read these terms carefully before using StreamHub
        </p>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          By using StreamHub, you agree to these terms. If you don&apos;t agree, please don&apos;t use our service.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <UserCheck className="w-8 h-8 text-primary mb-2" />
            <CardTitle>1. User Accounts</CardTitle>
            <CardDescription>Your responsibilities as a user</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>When creating an account, you agree to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Take responsibility for all activity under your account</li>
              <li>Be at least 13 years old (or older in some jurisdictions)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="w-8 h-8 text-primary mb-2" />
            <CardTitle>2. Content Guidelines</CardTitle>
            <CardDescription>What you can and cannot do on StreamHub</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Prohibited Content</h4>
              <p className="text-muted-foreground mb-2">You must NOT stream or share:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Illegal content or content promoting illegal activities</li>
                <li>Hateful, discriminatory, or harassing content</li>
                <li>Content that infringes intellectual property rights</li>
                <li>Spam, malware, or phishing attempts</li>
                <li>Sexually explicit or graphic violent content</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Required Conduct</h4>
              <p className="text-muted-foreground mb-2">You must:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Own rights to all content you stream</li>
                <li>Respect other users and community standards</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Intellectual Property</CardTitle>
            <CardDescription>Rights and licenses</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              <strong className="text-foreground">You retain ownership</strong> of content you create.
              By streaming on StreamHub, you grant us a worldwide, non-exclusive license to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Display and distribute your content on our platform</li>
              <li>Promote your streams in discovery features</li>
              <li>Create thumbnails and previews</li>
            </ul>
            <p className="pt-2">
              This license ends when you delete your content or close your account.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Account Termination</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>We reserve the right to suspend or terminate accounts that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Violate these terms or community guidelines</li>
              <li>Engage in harmful or abusive behavior</li>
              <li>Attempt to circumvent platform security</li>
              <li>Remain inactive for extended periods</li>
            </ul>
            <p className="pt-2">
              You may close your account at any time from your settings page.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Disclaimer & Liability</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              StreamHub is provided <strong className="text-foreground">&quot;as is&quot;</strong> without warranties of any kind.
              We are not responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>User-generated content or third-party services</li>
              <li>Service interruptions or technical issues</li>
              <li>Loss of data or content</li>
            </ul>
            <p className="pt-2">
              Our liability is limited to the maximum extent permitted by law.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              We may update these terms from time to time. Continued use of StreamHub after changes
              constitutes acceptance of the updated terms. We&apos;ll notify you of significant changes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}