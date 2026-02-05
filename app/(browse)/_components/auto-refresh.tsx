"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AutoRefresh = () => {
  const router = useRouter();

  useEffect(() => {
    // Refresh every 30 seconds to update live status
    const interval = setInterval(() => {
      router.refresh();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [router]);

  return null;
};