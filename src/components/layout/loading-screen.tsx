"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const LOAD_DURATION_MS = 1400;

function LoaderRing() {
  return (
    <motion.div
      className="h-20 w-20"
      animate={{ rotate: 360 }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80" fill="none">
        <defs>
          <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--gradient-start)" />
            <stop offset="100%" stopColor="var(--gradient-end)" />
          </linearGradient>
        </defs>
        <circle
          cx="40"
          cy="40"
          r="34"
          stroke="currentColor"
          strokeWidth="2"
          className="text-border"
        />
        <circle
          cx="40"
          cy="40"
          r="34"
          stroke="url(#loader-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="80 134"
        />
      </svg>
    </motion.div>
  );
}

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOAD_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-background"
          aria-label="Loading portfolio"
          role="status"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative flex h-20 w-20 items-center justify-center">
              <LoaderRing />
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="absolute text-lg font-bold tracking-tight gradient-text"
              >
                {initials}
              </motion.span>
            </div>

            <div className="text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base font-semibold tracking-tight"
              >
                {profile.name}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-1 text-xs text-muted-foreground"
              >
                {profile.title}
              </motion.p>
            </div>

            <div className="h-1 w-36 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: LOAD_DURATION_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
