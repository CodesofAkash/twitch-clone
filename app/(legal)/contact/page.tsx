import { Metadata } from "next";
import { Mail, MessageSquare, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact Us | StreamHub",
  description: "Get in touch with the StreamHub team",
};

export default function ContactPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Send className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question, feedback, or just want to say hi? We&apos;d love to hear from you!
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:border-primary/50 transition-all hover:shadow-md">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Email Us</CardTitle>
            <CardDescription>Get a response within 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <a
              href="mailto:support@streamhub.com"
              className="text-primary hover:underline font-medium"
            >
              support@streamhub.com
            </a>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-all hover:shadow-md">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Discord Community</CardTitle>
            <CardDescription>Join our community server</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" asChild className="w-full">
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                Join Discord
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-all hover:shadow-md">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
              <Github className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>GitHub Issues</CardTitle>
            <CardDescription>Report bugs or suggest features</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" asChild className="w-full">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                Open Issue
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Send us a Message</CardTitle>
          <CardDescription>
            Fill out the form below and we&apos;ll get back to you as soon as possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="Your name" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-11" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input id="subject" placeholder="How can we help?" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Tell us more..."
                rows={6}
                className="resize-none"
              />
            </div>

            <Button type="submit" className="w-full h-11" size="lg">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}