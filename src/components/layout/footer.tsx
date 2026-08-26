"use client";

import { ArrowUp, GitBranch, Link2, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

const socialLinks = [
  { href: profile.github, icon: GitBranch, label: "GitHub" },
  { href: profile.linkedin, icon: Link2, label: "LinkedIn" },
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
];

export function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-max section-padding py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium">
              Design & Built by{" "}
              <span className="gradient-text font-semibold">{profile.name}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="rounded-full"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
