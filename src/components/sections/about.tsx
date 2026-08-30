"use client";

import { motion } from "framer-motion";
import {
  Bot,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  MessageCircle,
  Rocket,
  Sparkles,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/effects/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { TechStackIcon } from "@/components/ui/tech-stack-icon";
import { profile } from "@/data/profile";
import { featuredToolkit } from "@/data/skills";
import { cn } from "@/lib/utils";

const valueIcons = [Bot, Rocket, Layers, MessageCircle] as const;

const quickFacts = [
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: Clock, label: "Availability", value: profile.availability },
];

const stats = [
  { value: profile.yearsExperience, label: "Years of experience" },
  { value: "2x", label: "Faster with AI tooling" },
  { value: "Full", label: "Stack ownership" },
];

function ProfileCard() {
  return (
    <div className="gradient-border overflow-hidden rounded-3xl">
      <div className="rounded-[22px] bg-card/80 p-6 backdrop-blur-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <p className="text-lg font-semibold">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.title}</p>
              <Badge className="mt-2">Open to new projects</Badge>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:max-w-md lg:flex-1">
            {quickFacts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4 text-accent" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 lg:max-w-xs">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="mt-1 text-[10px] leading-tight text-muted-foreground sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="section-padding relative scroll-mt-20 py-10 md:py-12"
      aria-label="About section"
    >
      <div className="container-max relative">
        <FadeIn>
          <ProfileCard />
        </FadeIn>

        <SectionHeader
          className="mt-10 md:mt-12"
          label="About"
          title="Engineering with intent"
          description="From architecture to deployment, I build systems that scale, ship fast, and hold up in production."
        />

        <FadeIn>
          <blockquote className="border-l-2 border-accent pl-5 text-xl font-medium leading-snug tracking-tight sm:text-2xl">
            I turn complex problems into{" "}
            <span className="gradient-text">clean, reliable software</span>,{" "}
            full stack, cloud-native, and AI-assisted.
          </blockquote>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>{profile.bio}</p>
            <p>{profile.extendedBio}</p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {profile.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            React & AI Toolkit
          </p>
          <div className="flex flex-wrap gap-3">
            {featuredToolkit.map((item) => (
              <div
                key={item.name}
                className={cn(
                  "group inline-flex items-center gap-2.5 rounded-xl border border-border bg-card/60",
                  "px-4 py-2.5 backdrop-blur-sm transition-colors hover:border-accent/30 hover:bg-card"
                )}
              >
                <TechStackIcon item={item} className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {profile.values.map((value, i) => {
            const Icon = valueIcons[i] ?? Sparkles;
            return (
              <StaggerItem key={value.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={cn(
                    "group h-full rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm",
                    "transition-colors duration-300 hover:border-accent/30 hover:bg-card hover:shadow-lg hover:shadow-accent/5"
                  )}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn delay={0.2} className="mt-16 lg:mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Process
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                How I work
              </h3>
            </div>
          </div>

          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            <div
              className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
              aria-hidden="true"
            />
            {profile.process.map((step, i) => (
              <li key={step} className="relative">
                <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-card font-mono text-lg font-bold text-accent shadow-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="pt-3 text-sm leading-relaxed text-muted-foreground lg:pt-0">
                    {step}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </FadeIn>
      </div>
    </section>
  );
}
