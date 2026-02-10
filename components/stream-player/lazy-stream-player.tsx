"use client";

import dynamic from "next/dynamic";
import { StreamPlayerSkeleton } from "./index";

// Lazy load the heavy StreamPlayer component
export const LazyStreamPlayer = dynamic(
  () => import("./index").then((mod) => ({ default: mod.StreamPlayer })),
  {
    ssr: false,
    loading: () => <StreamPlayerSkeleton />,
  }
);
