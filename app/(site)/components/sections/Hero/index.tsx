"use client";

import HeroCentered from "./variants/HeroCentered";
import HeroSplit from "./variants/HeroSplit";

export default function Hero({ variant = "centered" }: { variant?: string }) {
  if (variant === "split") return <HeroSplit />;
  return <HeroCentered />;
}
