import { Metadata } from "next";
import { Mail, MessageSquare, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { contentConfig } from "@/lib/content-config";

export const metadata: Metadata = {
  title: contentConfig.contact.title,
  description: contentConfig.contact.description,
};

export default function ContactPage() {
  const { contact, project } = contentConfig;
  return (
    <article className="space-y-12">
      {/* Hero */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Send className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">{contact.hero.title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {contact.hero.subtitle}
        </p>
      </header>

      {/* Contact Methods */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:border-primary/50 transition-all hover:shadow-md">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{contact.methods[0].title}</CardTitle>
            <CardDescription>{contact.methods[0].description}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <a
              href={contact.methods[0].link}
              className="text-primary hover:underline font-medium"
            >
              {contact.methods[0].linkText}
            </a>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-all hover:shadow-md">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{contact.methods[1].title}</CardTitle>
            <CardDescription>{contact.methods[1].description}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" asChild className="w-full">
              <a href={contact.methods[1].link} target="_blank" rel="noopener noreferrer">
                {contact.methods[1].buttonText}
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-all hover:shadow-md">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
              <Github className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{contact.methods[2].title}</CardTitle>
            <CardDescription>{contact.methods[2].description}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" asChild className="w-full">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                {contact.methods[2].buttonText}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{contact.form.title}</CardTitle>
          <CardDescription>{contact.form.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{contact.form.fields.name.label} *</Label>
                <Input id="name" placeholder={contact.form.fields.name.placeholder} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{contact.form.fields.email.label} *</Label>
                <Input id="email" type="email" placeholder={contact.form.fields.email.placeholder} className="h-11" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">{contact.form.fields.subject.label} *</Label>
              <Input id="subject" placeholder={contact.form.fields.subject.placeholder} className="h-11" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{contact.form.fields.message.label} *</Label>
              <Textarea
                id="message"
                placeholder={contact.form.fields.message.placeholder}
                rows={contact.form.fields.message.rows}
                className="resize-none"
              />
            </div>

            <Button type="submit" className="w-full h-11" size="lg">
              <Send className="mr-2 h-4 w-4" />
              {contact.form.submitButton}
            </Button>
          </form>
        </CardContent>
      </Card>
    </article>
  );
}