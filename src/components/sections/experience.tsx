"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/effects/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { experiences, type Experience as ExperienceItem } from "@/data/experience";
import { cn } from "@/lib/utils";

function RoleCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-3xl",
        exp.current ? "gradient-border" : "border border-border"
      )}
    >
      <div
        className={cn(
          "bg-card/80 p-6 backdrop-blur-sm sm:p-8",
          exp.current ? "rounded-[22px]" : "rounded-3xl"
        )}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background font-mono text-lg font-bold text-accent shadow-sm">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {exp.company}
                </h3>
                {exp.current && <Badge>Current</Badge>}
              </div>
              <p className="mt-1 text-base font-medium text-accent">{exp.position}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="font-mono text-xs sm:text-sm">{exp.duration}</span>
                {exp.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden />
                    {exp.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {exp.description && (
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {exp.description}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {exp.stack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>

        {exp.work.length > 0 && (
          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Selected work
            </h4>
            <StaggerContainer className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {exp.work.map((item) => (
                <StaggerItem key={item.name}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={cn(
                      "h-full rounded-2xl border border-border bg-muted/40 p-4",
                      "transition-colors duration-300 hover:border-accent/30 hover:bg-card"
                    )}
                  >
                    <p className="text-sm font-semibold tracking-tight">{item.name}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Key work
            </h4>
            <ul className="mt-4 space-y-3">
              {exp.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {exp.achievements.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Impact
              </h4>
              <ul className="mt-4 space-y-3">
                {exp.achievements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-muted/30 p-3 text-sm leading-relaxed"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden scroll-mt-20 py-20 md:py-28"
      aria-label="Experience section"
    >
      <div
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent-secondary/10 blur-3xl"
        aria-hidden
      />

      <div className="container-max relative">
        <SectionHeader
          label="Experience"
          title="Career path"
          description="Production systems for healthcare, PropTech, construction, and operations teams — designed, shipped, and kept running."
        />

        <div className="relative mx-auto max-w-5xl">
          <div
            className="absolute left-[15px] top-3 bottom-6 w-px bg-gradient-to-b from-accent via-accent/35 to-transparent md:left-[19px]"
            aria-hidden
          />

          <ol className="space-y-8 md:space-y-10">
            {experiences.map((exp, index) => (
              <li key={exp.id} className="relative pl-12 md:pl-16">
                <div
                  className="absolute left-[7px] top-8 z-10 md:left-[11px]"
                  aria-hidden
                >
                  <span
                    className={cn(
                      "relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-background shadow-sm shadow-accent/30",
                      exp.current && "shadow-accent/50"
                    )}
                  >
                    {exp.current && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
                    )}
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                </div>

                <FadeIn>
                  <RoleCard exp={exp} index={index} />
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
