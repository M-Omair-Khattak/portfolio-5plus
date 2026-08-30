"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/effects/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { TechStackIcon } from "@/components/ui/tech-stack-icon";
import { techStackItems } from "@/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section
      id="skills"
      className="section-padding scroll-mt-20 py-10 md:py-12"
      aria-label="Skills section"
    >
      <div className="container-max">
        <SectionHeader
          label="Skills"
          title="Tech Stack"
          description="Tools I use to ship production-ready software."
          align="center"
        />

        <StaggerContainer className="mx-auto grid max-w-5xl grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-6">
          {techStackItems.map((item) => (
            <StaggerItem key={item.name}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-border",
                  "bg-card/60 p-3 backdrop-blur-sm transition-colors duration-300",
                  "hover:border-accent/30 hover:bg-card hover:shadow-lg hover:shadow-accent/5"
                )}
              >
                <TechStackIcon item={item} className="h-8 w-8 sm:h-9 sm:w-9" />
                <span className="text-center text-[10px] font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground sm:text-xs">
                  {item.name}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
