"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h2 className="text-4xl">Something went wrong!</h2>
      <p className="text-lg">{error.message || "An unexpected error occurred"}</p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="primary">
          Try again
        </Button>
        <Button onClick={() => window.location.href = "/"} variant="secondary">
          Go home
        </Button>
      </div>
    </div>
  );
}