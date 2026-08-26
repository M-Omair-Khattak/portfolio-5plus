"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

interface NavbarProps {
  onOpenCommand?: () => void;
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "glass shadow-lg" : "bg-transparent"
        )}
      >
        <nav
          className="container-max section-padding flex h-16 items-center justify-between md:h-20"
          aria-label="Main navigation"
        >
          <Link
            href="#"
            className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
            onClick={() => setMobileOpen(false)}
          >
            <span className="gradient-text">{profile.name.split(" ")[0]}</span>
            <span className="text-muted-foreground">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  activeSection === link.href.slice(1)
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex rounded-full"
              onClick={onOpenCommand}
              aria-label="Open command palette"
            >
              <Command className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[min(320px,85vw)] flex-col gap-2 bg-card p-6 pt-20 shadow-2xl"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                      activeSection === link.href.slice(1)
                        ? "bg-accent/10 text-accent"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-4"
              >
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenCommand?.();
                  }}
                >
                  <Command className="mr-2 h-4 w-4" />
                  Command Palette
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
