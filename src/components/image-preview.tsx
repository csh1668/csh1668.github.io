"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export function ImagePreview({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block cursor-pointer overflow-hidden rounded-lg transition-[filter] hover:brightness-75 not-prose"
      >
        <Image
          src={src}
          alt={alt}
          width={224}
          height={126}
          className="max-w-56 w-full h-auto"
          unoptimized
        />
      </button>

      {open && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: ESC handled via useEffect
        <div
          role="dialog"
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70"
          onClick={close}
        >
          <Image
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            unoptimized
            // onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
