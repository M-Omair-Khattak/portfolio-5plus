"use client";

import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Code2,
  FolderOpen,
  Mail,
  ExternalLink,
  FileDown,
  Briefcase,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState("");

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      setSearch("");
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    [onOpenChange]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[20%] z-[201] w-[min(560px,92vw)] -translate-x-1/2"
          >
            <Command
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
              shouldFilter
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search sections, projects..."
                  className="flex h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="hidden rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground sm:inline">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-[360px] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                  {[
                    { href: "#about", label: "About", icon: User },
                    { href: "#experience", label: "Experience", icon: Briefcase },
                    { href: "#skills", label: "Skills", icon: Code2 },
                    { href: "#projects", label: "Projects", icon: FolderOpen },
                    { href: "#contact", label: "Contact", icon: Mail },
                  ].map(({ href, label, icon: Icon }) => (
                    <Command.Item
                      key={href}
                      value={label}
                      onSelect={() => navigate(href)}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm aria-selected:bg-accent/10 aria-selected:text-accent"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Projects" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                  {projects.map((project) => (
                    <Command.Item
                      key={project.id}
                      value={`${project.title} ${project.subtitle}`}
                      onSelect={() => navigate("#projects")}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm aria-selected:bg-accent/10 aria-selected:text-accent"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {project.title}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                  <Command.Item
                    value="download resume"
                    onSelect={() => {
                      onOpenChange(false);
                      window.open(profile.resumePath, "_blank");
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm aria-selected:bg-accent/10 aria-selected:text-accent"
                  >
                    <FileDown className="h-4 w-4" />
                    Download Resume
                  </Command.Item>
                  <Command.Item
                    value={`email ${profile.email}`}
                    onSelect={() => {
                      onOpenChange(false);
                      window.location.href = `mailto:${profile.email}`;
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm aria-selected:bg-accent/10 aria-selected:text-accent"
                  >
                    <Mail className="h-4 w-4" />
                    Send Email
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
