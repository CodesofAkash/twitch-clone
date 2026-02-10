"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { submitSuggestion } from "@/actions/suggestion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";

export const SuggestionForm = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "feature",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.title || !formData.description) {
      toast.error("Please fill in all fields");
      return;
    }

    startTransition(() => {
      submitSuggestion(formData)
        .then(() => {
          toast.success("Suggestion submitted! Thank you for your feedback.");
          setFormData({
            name: "",
            email: "",
            title: "",
            description: "",
            category: "feature",
          });
        })
        .catch(() => {
          toast.error("Failed to submit suggestion. Please try again.");
        });
    });
  };

  return (
    <section>
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="space-y-3 pb-6">
          <div className="flex items-center gap-2">
            <Send className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl">Share Your Ideas</CardTitle>
          </div>
          <CardDescription className="text-base">
            Have a feature request or found a bug? We&apos;d love to hear from you!
            Your feedback helps us build a better platform.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  disabled={isPending}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  disabled={isPending}
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                disabled={isPending}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">✨ New Feature</SelectItem>
                  <SelectItem value="improvement">🚀 Improvement</SelectItem>
                  <SelectItem value="bug">🐛 Bug Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief description of your suggestion"
                disabled={isPending}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us more about your idea or the issue you encountered..."
                rows={6}
                disabled={isPending}
                className="resize-none"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isPending} 
              className="w-full h-11 text-base"
              size="lg"
            >
              {isPending ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Suggestion
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};