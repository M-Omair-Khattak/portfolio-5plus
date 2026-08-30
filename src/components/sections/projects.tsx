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
import { useState, useMemo, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { FadeIn } from "@/components/effects/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const count = project.screenshots.length;

  useEffect(() => {
    setCurrentSlide(0);
  }, [project.id]);

  const next = useCallback(() => {
    setCurrentSlide((s) => (s + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setCurrentSlide((s) => (s - 1 + count) % count);
  }, [count]);

  if (count === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-accent/15 to-accent-secondary/10">
        <span className="text-5xl font-bold gradient-text">{project.title.slice(0, 1)}</span>
      </div>
    );
  }

  return (
    <div className="relative group/gallery">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="relative h-full w-full cursor-pointer"
            data-cursor="view"
            onClick={() => onImageClick(currentSlide)}
          >
            <Image
              src={projectImageSrc(project.screenshots[currentSlide]?.src ?? "")}
              alt={project.screenshots[currentSlide]?.alt ?? ""}
              fill
              unoptimized
              className="object-contain object-top"
              sizes="(max-width: 768px) 90vw, 720px"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 shadow-lg backdrop-blur-sm hover:bg-background"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 shadow-lg backdrop-blur-sm hover:bg-background"
              aria-label="Next screenshot"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-border bg-muted/30 px-3 py-2.5">
          {project.screenshots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "relative h-14 w-[4.75rem] shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                i === currentSlide
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
                className="object-cover object-top"
                sizes="76px"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge>{project.role}</Badge>
        <Badge variant="outline" className="capitalize">
          {project.category}
        </Badge>
      </div>
      <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h3>
      <p className="mt-1 text-sm text-accent sm:text-base">{project.subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 8).map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
      {project.liveUrl && (
        <Button asChild size="sm" className="mt-5">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Live site
          </a>
        </Button>
      )}
    </div>
  );
}

function TileBoard({
  items,
  onOpen,
}: {
  items: Project[];
  onOpen: (project: Project) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((project) => {
        const cover = project.screenshots[0];
        return (
          <button
            key={project.id}
            type="button"
            onClick={() => onOpen(project)}
            data-cursor="view"
            className="group relative aspect-square overflow-hidden rounded-2xl border border-border text-left transition-transform duration-300 hover:-translate-y-0.5 hover:border-accent/40"
          >
            {cover ? (
              <Image
                src={projectImageSrc(cover.src)}
                alt={cover.alt}
                fill
                unoptimized
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/20 to-accent-secondary/10">
                <span className="text-3xl font-bold gradient-text">{project.title.slice(0, 1)}</span>
              </div>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-10">
              <span className="block text-sm font-semibold text-white">{project.title}</span>
              <span className="mt-0.5 block line-clamp-1 text-xs text-white/70">
                {project.subtitle}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ProjectDrawer({
  project,
  onClose,
  onImageClick,
}: {
  project: Project;
  onClose: () => void;
  onImageClick: (index: number) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-drawer-title"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 36 }}
        className="absolute inset-y-0 right-0 flex h-dvh w-full max-w-xl flex-col border-l border-border bg-background shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p id="project-drawer-title" className="text-sm font-medium text-muted-foreground">
            {project.title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <ProjectGallery
            project={project}
            onImageClick={onImageClick}
          />
          <ProjectMeta project={project} />
        </div>
      </motion.aside>
    </div>,
    document.body
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [panelProject, setPanelProject] = useState<Project | null>(null);
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

  useEffect(() => {
    setPanelProject(null);
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="projects"
      className="section-padding scroll-mt-20 py-10 md:py-12"
      aria-label="Projects section"
    >
      <div className="container-max">
        <SectionHeader
          label="Projects"
          title="Things I've shipped"
          description="Client work from Arbisoft and Ubiquify. Public sites linked where they exist."
        />

        <FadeIn className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
              {projectCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
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
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
        </FadeIn>

        {filteredProjects.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No projects match your search.
          </p>
        ) : (
          <TileBoard items={filteredProjects} onOpen={setPanelProject} />
        )}
      </div>

      {panelProject && (
        <ProjectDrawer
          project={panelProject}
          onClose={() => setPanelProject(null)}
          onImageClick={(index) =>
            setLightbox({ project: panelProject, index })
          }
        />
      )}

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
