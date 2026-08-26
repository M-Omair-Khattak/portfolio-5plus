"use client";

import { Briefcase } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/effects/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="section-padding py-20 md:py-28"
      aria-label="Experience section"
    >
      <div className="container-max">
        <SectionHeader
          label="Experience"
          title="Where I've been"
          description="Ubiquify now. Arbisoft before that. Client work either way."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline line */}
          <div
            className="absolute left-[19px] top-0 hidden h-full w-px bg-gradient-to-b from-accent via-accent/50 to-transparent md:left-1/2 md:block md:-translate-x-px"
            aria-hidden="true"
          />

          <StaggerContainer className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <StaggerItem key={exp.id}>
                <FadeIn>
                  <div
                    className={`relative flex flex-col gap-4 md:flex-row md:gap-8 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-6 hidden md:left-1/2 md:block md:-translate-x-1/2">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-background shadow-lg shadow-accent/20">
                        <Briefcase className="h-4 w-4 text-accent" />
                      </div>
                    </div>

                    {/* Mobile dot */}
                    <div className="flex items-center gap-3 md:hidden">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background">
                        <Briefcase className="h-4 w-4 text-accent" />
                      </div>
                      <Badge variant="outline">{exp.duration}</Badge>
                    </div>

                    {/* Content card */}
                    <div
                      className={`md:w-[calc(50%-2rem)] ${
                        index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"
                      }`}
                    >
                      <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                        <div className="hidden md:block">
                          <Badge
                            variant="outline"
                            className={`mb-3 ${index % 2 === 0 ? "md:ml-auto" : ""}`}
                          >
                            {exp.duration}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold">{exp.position}</h3>
                        <p className="mt-1 text-accent">{exp.company}</p>
                        {exp.description && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {exp.description}
                          </p>
                        )}

                        <div className="mt-4 space-y-3">
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Responsibilities
                            </h4>
                            <ul className="mt-2 space-y-1.5">
                              {exp.responsibilities.map((item) => (
                                <li
                                  key={item}
                                  className="text-sm text-muted-foreground before:mr-2 before:text-accent before:content-['•']"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {exp.achievements.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Also
                            </h4>
                            <ul className="mt-2 space-y-1.5">
                              {exp.achievements.map((item) => (
                                <li
                                  key={item}
                                  className="text-sm text-foreground/80 before:mr-2 before:text-green-500 before:content-['✓']"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                </FadeIn>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
