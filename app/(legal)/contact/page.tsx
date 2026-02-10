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
        Have a question or feedback? We&apos;d love to hear from you.
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