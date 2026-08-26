"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { projectImageSrc } from "@/data/projects";

interface LightboxProps {
  images: { src: string; alt: string }[];
  initialIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Lightbox({
  images,
  initialIndex = 0,
  open,
  onOpenChange,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setCurrentIndex(initialIndex);
  }, [open, initialIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") onOpenChange(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, goNext, goPrev, onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 focus:outline-none"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">
            {images[currentIndex]?.alt ?? "Project screenshot"}
          </Dialog.Title>
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={projectImageSrc(images[currentIndex]?.src ?? "")}
                alt={images[currentIndex]?.alt ?? ""}
                width={1440}
                height={900}
                unoptimized
                className="max-h-[85vh] w-auto object-contain"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-white/70">
              {images[currentIndex]?.alt} ({currentIndex + 1}/{images.length})
            </p>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
