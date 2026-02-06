"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class StreamPlayerErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Stream player error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="h-full flex flex-col items-center justify-center p-8">
          <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Stream Error</h3>
          <p className="text-muted-foreground mb-4 text-center">
            Failed to load stream player. Please try refreshing the page.
          </p>
          <Button onClick={() => window.location.reload()} variant="primary">
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}