import { Metadata } from "next";
import { Sparkles, Code2, Users, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About StreamHub",
  description: "Learn about our mission and technology",
};

export default function AboutPage() {
  const techStack = [
    { name: "Next.js 15", description: "React framework with App Router" },
    { name: "LiveKit", description: "Real-time video streaming" },
    { name: "Clerk", description: "Authentication & user management" },
    { name: "Prisma", description: "Type-safe database ORM" },
    { name: "PostgreSQL", description: "Relational database" },
    { name: "Tailwind CSS", description: "Utility-first styling" },
  ];

  const features = [
    "Real-time live streaming",
    "Interactive chat",
    "Categories & tags",
    "Follow system",
    "Creator dashboard",
    "Search & discovery",
  ];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/50 mb-4">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            About StreamHub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A modern, open-source live streaming platform built with cutting-edge web technologies
          </p>
        </div>
      </div>

      {/* Mission */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            StreamHub is designed to empower creators with professional-grade streaming tools that are
            accessible, reliable, and easy to use. We believe that anyone should be able to share their
            passion with the world through live video.
          </p>
          <p>
            Built as an educational project, StreamHub demonstrates modern web development practices
            and real-time technologies while providing a fully functional streaming platform.
          </p>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Technology Stack</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((tech) => (
            <Card key={tech.name} className="hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle className="text-base">{tech.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Key Features</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Open Source */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Open Source</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            StreamHub is an open-source project built for learning and demonstration. The codebase
            showcases modern web development patterns including:
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Server Components</Badge>
            <Badge variant="secondary">Server Actions</Badge>
            <Badge variant="secondary">Real-time WebRTC</Badge>
            <Badge variant="secondary">Type Safety</Badge>
            <Badge variant="secondary">Responsive Design</Badge>
            <Badge variant="secondary">Dark Mode</Badge>
          </div>
          <div className="pt-4">
            <Button asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Code2 className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="text-center">
        <CardContent className="pt-8 pb-8">
          <h3 className="text-2xl font-bold mb-4">Want to Learn More?</h3>
          <p className="text-muted-foreground mb-6">
            Check out our features roadmap or get in touch with questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/features">
                <Sparkles className="mr-2 h-4 w-4" />
                Features & Roadmap
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}