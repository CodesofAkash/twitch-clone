"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Error() {
  const router = useRouter();

  useEffect(() => {
    toast.error("You cannot access this dashboard");
    router.push("/");
  }, [router]);

  return null;
}