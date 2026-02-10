import { Metadata } from "next";
import { CurrentFeatures } from "./_components/current-features";
import { FutureFeatures } from "./_components/future-features";
import { SuggestionForm } from "./_components/suggestion-form";

export const metadata: Metadata = {
  title: "Features & Roadmap | StreamHub",
  description: "Explore current features and upcoming improvements",
};

export default function FeaturesPage() {
  return (
    <div className="container max-w-7xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Features & Roadmap</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover what StreamHub offers today and what&apos;s coming next
        </p>
      </div>

      <CurrentFeatures />
      <FutureFeatures />
      <SuggestionForm />
    </div>
  );
}