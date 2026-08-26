"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/effects/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lightbox } from "@/components/ui/lightbox";
import { projects, projectCategories, projectImageSrc, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function ProjectGallery({
  project,
  onImageClick,
}: {
  project: Project;
  onImageClick: (index: number) => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = useCallback(() => {
    setCurrentSlide((s) => (s + 1) % project.screenshots.length);
  }, [project.screenshots.length]);

  const prev = useCallback(() => {
    setCurrentSlide(
      (s) => (s - 1 + project.screenshots.length) % project.screenshots.length
    );
  }, [project.screenshots.length]);

  return (
    <div className="relative group/gallery">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative h-full w-full cursor-pointer"
            onClick={() => onImageClick(currentSlide)}
          >
            <Image
              src={projectImageSrc(project.screenshots[currentSlide]?.src ?? "")}
              alt={project.screenshots[currentSlide]?.alt ?? ""}
              fill
              unoptimized
              className="object-contain object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>

        {project.screenshots.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover/gallery:opacity-100 hover:bg-background"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover/gallery:opacity-100 hover:bg-background"
              aria-label="Next screenshot"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {project.screenshots.map((shot, i) => (
          <button
            key={`${project.id}-${i}`}
            onClick={() => setCurrentSlide(i)}
            className={cn(
              "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
              currentSlide === i
                ? "border-accent shadow-md shadow-accent/20"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
            aria-label={`View ${shot.alt}`}
          >
            <Image
              src={projectImageSrc(shot.src)}
              alt={shot.alt}
              fill
              unoptimized
              className="object-contain object-top"
              sizes="80px"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onImageClick,
}: {
  project: Project;
  onImageClick: (project: Project, index: number) => void;
}) {
  return (
    <StaggerItem>
      <Card className="group overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5">
        <div className={cn(
          "grid gap-0",
          project.screenshots.length > 0 && "lg:grid-cols-2"
        )}>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge>{project.role}</Badge>
              <Badge variant="outline" className="capitalize">
                {project.category}
              </Badge>
            </div>

            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-accent">{project.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 6).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            {project.liveUrl && (
              <div className="mt-5">
                <Button asChild size="sm">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live site
                  </a>
                </Button>
              </div>
            )}
          </div>

          {project.screenshots.length > 0 && (
          <div className="p-4 sm:p-6 lg:p-8">
            <ProjectGallery
              project={project}
              onImageClick={(i) => onImageClick(project, i)}
            />
          </div>
          )}
        </div>
      </Card>
    </StaggerItem>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightbox, setLightbox] = useState<{
    project: Project;
    index: number;
  } | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.technologies.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="projects"
      className="section-padding bg-muted/30 py-16 md:py-24"
      aria-label="Projects section"
    >
      <div className="container-max">
        <SectionHeader
          label="Projects"
          title="Things I've shipped"
          description="Client work from Arbisoft and Ubiquify. Public sites linked where they exist."
        />

        <FadeIn className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300",
                  activeCategory === cat.id
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search projects"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </FadeIn>

        <StaggerContainer className="space-y-8" key={`${activeCategory}-${searchQuery}`}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onImageClick={(p, i) => setLightbox({ project: p, index: i })}
              />
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
              <p className="text-muted-foreground">No projects match your search.</p>
            </motion.div>
          )}
        </StaggerContainer>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.project.screenshots}
          initialIndex={lightbox.index}
          open={!!lightbox}
          onOpenChange={(open) => !open && setLightbox(null)}
        />
      )}
    </section>
  );
}
