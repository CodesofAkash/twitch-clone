"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { submitSuggestion } from "@/actions/suggestion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <section className="bg-muted/50 rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-4">Suggest a Feature</h2>
      <p className="text-muted-foreground mb-6">
        Have an idea for improving StreamHub? We&apos;d love to hear from you!
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              disabled={isPending}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              disabled={isPending}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
            disabled={isPending}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feature">New Feature</SelectItem>
              <SelectItem value="improvement">Improvement</SelectItem>
              <SelectItem value="bug">Bug Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Brief description of your suggestion"
            disabled={isPending}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Tell us more about your idea..."
            rows={5}
            disabled={isPending}
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full md:w-auto">
          {isPending ? "Submitting..." : "Submit Suggestion"}
        </Button>
      </form>
    </section>
  );
};