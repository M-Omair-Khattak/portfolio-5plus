"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.7,
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const directions: Record<string, { hidden: Variants["hidden"]; visible: Variants["visible"] }> = {
    up: { hidden: { opacity: 0, y: 50, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
    down: { hidden: { opacity: 0, y: -50, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
    left: { hidden: { opacity: 0, x: 50, filter: "blur(6px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } },
    right: { hidden: { opacity: 0, x: -50, filter: "blur(6px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } },
    none: { hidden: { opacity: 0, filter: "blur(6px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: directions[direction].hidden,
        visible: {
          ...directions[direction].visible,
          transition: { duration, delay, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
