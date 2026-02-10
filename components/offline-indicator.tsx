"use client";

import { WifiOff } from "lucide-react";
import { useOfflineDetection } from "@/hooks/use-offline-detection";

export const OfflineIndicator = () => {
  const isOnline = useOfflineDetection();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-2">
      <WifiOff className="h-5 w-5" />
      <p className="font-medium">You appear to be offline. Please check your internet connection.</p>
    </div>
  );
};
