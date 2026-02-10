"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { WifiOff, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    console.error("Application error:", error);
    
    // Check if user is online
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [error]);

  // Check if error is network-related
  const isNetworkError = error.message?.toLowerCase().includes('network') || 
                        error.message?.toLowerCase().includes('fetch') ||
                        !isOnline;

  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground p-4">
      {isNetworkError ? (
        <>
          <WifiOff className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-3xl font-bold text-center">Connection Problem</h2>
          <p className="text-lg text-center max-w-md">
            {!isOnline 
              ? "You appear to be offline. Please check your internet connection and try again."
              : "We're having trouble connecting. Please check your internet connection."}
          </p>
        </>
      ) : (
        <>
          <AlertTriangle className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-3xl font-bold text-center">Something went wrong!</h2>
          <p className="text-lg text-center max-w-md">
            An unexpected error occurred. Don't worry, we're here to help.
          </p>
        </>
      )}
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