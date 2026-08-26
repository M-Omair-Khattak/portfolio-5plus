"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "p" | "span";
}

export function TextReveal({ text, className, delay = 0, as: Tag = "span" }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="mr-[0.25em] inline-flex overflow-hidden">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: delay + wordIndex * 0.08 + charIndex * 0.03,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

interface JelloTextProps {
  children: string;
  className?: string;
}

export function JelloText({ children, className }: JelloTextProps) {
  const words = children.split(" ");

  return (
    <span className={cn("jello-name", className)}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-flex">
          {word.split("").map((char, i) => (
            <span key={`${wordIndex}-${char}-${i}`} className="jello">
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 ? <span className="jello">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}
