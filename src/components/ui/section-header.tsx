"use client";

import { FadeIn } from "@/components/effects/fade-in";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <FadeIn className={cn("mb-8 md:mb-10", align === "center" && "text-center", className)}>
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
        {label}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}
