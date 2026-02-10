import { Metadata } from "next";
import { Sparkles, Code2, Users, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { contentConfig } from "@/lib/content-config";

export const metadata: Metadata = {
  title: contentConfig.about.title,
  description: contentConfig.about.description,
};

export default function AboutPage() {
  const { about, project } = contentConfig;

  return (
    <article className="space-y-12">
      {/* Hero */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/50 mb-4">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {about.hero.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {about.hero.subtitle}
          </p>
        </div>
      </header>

      {/* Mission */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl">{about.mission.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed space-y-4">
          {about.mission.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">{about.techStack.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {about.techStack.items.map((tech) => (
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
          <h2 className="text-2xl font-bold">{about.features.title}</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {about.features.items.map((feature) => (
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
          <CardTitle className="text-2xl">{about.openSource.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{about.openSource.description}</p>
          <div className="flex flex-wrap gap-2">
            {about.openSource.badges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
          <div className="pt-4">
            <Button asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Code2 className="mr-2 h-4 w-4" />
                {about.openSource.githubButtonText}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="text-center">
        <CardContent className="pt-8 pb-8">
          <h3 className="text-2xl font-bold mb-4">{about.cta.title}</h3>
          <p className="text-muted-foreground mb-6">{about.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/features">
                <Sparkles className="mr-2 h-4 w-4" />
                {about.cta.buttons.features}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">{about.cta.buttons.contact}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}