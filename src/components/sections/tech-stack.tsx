"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/effects/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { TechStackIcon } from "@/components/ui/tech-stack-icon";
import { techStackItems } from "@/data/skills";

export function TechStack() {
  const doubled = [...techStackItems, ...techStackItems];

  return (
    <section
      id="tech-stack"
      className="overflow-hidden py-16 md:py-20"
      aria-label="Tech stack section"
    >
      <div className="container-max section-padding">
        <SectionHeader
          label="Tech Stack"
          title="Technologies I Work With"
          description="Tools and frameworks powering the projects below."
          align="center"
        />
      </div>

      <FadeIn>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent sm:w-32" />

          <motion.div
            className="flex gap-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: { duration: 30, repeat: Infinity, ease: "linear" },
            }}
          >
            {doubled.map((item, i) => (
              <span
                key={`${item.name}-${i}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium shadow-sm transition-colors hover:border-accent/30 hover:text-accent"
              >
                <TechStackIcon item={item} className="h-4 w-4" />
                {item.name}
              </span>
            ))}
          </motion.div>
        </div>
      </FadeIn>
    </section>
  );
}
