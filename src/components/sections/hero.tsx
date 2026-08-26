"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, FolderOpen } from "lucide-react";
import Link from "next/link";
import { AnimatedBackground } from "@/components/effects/animated-background";
import { FooterAvatar } from "@/components/effects/footer-avatar";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { JelloText } from "@/components/effects/text-reveal";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { scrollToHash } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16 md:pt-20"
      aria-label="Hero section"
    >
      <AnimatedBackground />

      <div className="container-max section-padding z-10 w-full py-12 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={itemVariants}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available for new projects
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Hi, I&apos;m <JelloText>{profile.shortName}</JelloText>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-3 text-xl font-medium text-muted-foreground sm:text-2xl"
            >
              {profile.title}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
            >
              {profile.tagline}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button asChild size="lg">
                  <Link
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash("#projects");
                    }}
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    View Projects
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button variant="secondary" size="lg" asChild>
                  <a
                    href={profile.resumePath}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button variant="outline" size="lg" asChild>
                  <Link
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash("#contact");
                    }}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 flex justify-center lg:order-2"
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative">
              <motion.div
                className="gradient-border relative rounded-3xl p-1"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="overflow-visible rounded-[22px] bg-gradient-to-br from-accent/10 to-accent-secondary/10 px-4 pt-6 sm:px-6 sm:pt-8">
                  <FooterAvatar size="lg" />
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 z-10 rounded-2xl glass px-4 py-3 shadow-xl sm:-bottom-6 sm:-right-6 sm:px-6 sm:py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <motion.p
                  className="text-2xl font-bold gradient-text sm:text-3xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {profile.yearsExperience}
                </motion.p>
                <p className="text-xs text-muted-foreground sm:text-sm">Years Experience</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <a
              href="#about"
              aria-label="Scroll to about section"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#about");
              }}
              className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
