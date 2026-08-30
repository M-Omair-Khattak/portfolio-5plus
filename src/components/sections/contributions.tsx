"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FadeIn } from "@/components/effects/fade-in";
import { Lightbox } from "@/components/ui/lightbox";
import { SectionHeader } from "@/components/ui/section-header";
import { contributions } from "@/data/contributions";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Contributions() {
  const [activeId, setActiveId] = useState(contributions[0].id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const active = contributions.find((item) => item.id === activeId) ?? contributions[0];
  const activeIndex = contributions.findIndex((item) => item.id === active.id);

  const total = useMemo(
    () => contributions.reduce((sum, item) => sum + item.count, 0).toLocaleString(),
    []
  );

  const lightboxImages = contributions.map((item) => ({
    src: item.src,
    alt: item.alt,
  }));

  return (
    <section
      id="github"
      className="section-padding scroll-mt-20 py-10 md:py-12"
      aria-label="GitHub contributions"
    >
      <div className="container-max">
        <SectionHeader
          label="GitHub"
          title="Three years of shipping"
          description="Contribution graphs from client and product work, year by year."
        />

        <FadeIn>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm sm:text-sm">
              <GitBranch className="h-3.5 w-3.5 text-accent" aria-hidden />
              {total} contributions across these graphs
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-opacity hover:opacity-80 sm:text-sm"
            >
              @{profile.githubHandle}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_11rem]">
            <button
              type="button"
              data-cursor="view"
              onClick={() => setLightboxOpen(true)}
              className="group relative overflow-hidden rounded-3xl border border-border bg-[#0d1117] text-left shadow-[var(--card-shadow)]"
              aria-label={`Open ${active.alt}`}
            >
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 sm:px-5">
                <span className="rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                  {active.year}
                </span>
                <span className="rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
                  {active.countLabel} contributions
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="relative aspect-[16/9] sm:aspect-[2/1]"
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    unoptimized
                    className="object-contain object-center p-2 pt-10 sm:p-4 sm:pt-12"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3 sm:px-5">
                {active.orgs.map((org) => (
                  <span
                    key={org}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80"
                  >
                    @{org}
                  </span>
                ))}
                <span className="ml-auto text-[11px] text-white/45 transition-colors group-hover:text-white/70">
                  Click to enlarge
                </span>
              </div>
            </button>

            <div
              className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
              role="tablist"
              aria-label="Contribution year"
            >
              {contributions.map((item) => {
                const selected = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                      "min-w-[7.5rem] rounded-2xl border px-4 py-3 text-left transition-all duration-300 lg:min-w-0",
                      selected
                        ? "border-accent/40 bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                        : "border-border bg-card/70 text-foreground hover:border-accent/30 hover:bg-card"
                    )}
                  >
                    <span className="block text-lg font-bold leading-none">{item.year}</span>
                    <span
                      className={cn(
                        "mt-1.5 block text-xs",
                        selected ? "text-accent-foreground/80" : "text-muted-foreground"
                      )}
                    >
                      {item.countLabel} contributions
                    </span>
                    {item.note && (
                      <span
                        className={cn(
                          "mt-1 block text-[11px]",
                          selected ? "text-accent-foreground/70" : "text-muted-foreground/80"
                        )}
                      >
                        {item.note}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>

      <Lightbox
        images={lightboxImages}
        initialIndex={Math.max(activeIndex, 0)}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </section>
  );
}
