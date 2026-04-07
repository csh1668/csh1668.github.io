"use client";

import { useEffect, useState } from "react";
import { LucideIcon } from "./lucide-icon";

export function FloatingActions({ label }: { label: string }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
      setShowLabel(window.scrollY < 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
          aria-label="최상단으로 이동"
        >
          <LucideIcon name="ArrowUp" className="h-5 w-5 text-foreground/60" />
        </button>
      )}
      {showLabel && (
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/40 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
