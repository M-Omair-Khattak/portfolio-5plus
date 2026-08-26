"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--hero-glow)" }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--accent-secondary)" }}
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
