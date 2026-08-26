"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Bump when replacing public/images/footer-avatar.png so browsers skip the old file */
const AVATAR_SRC = "/images/footer-avatar.png?v=5";

interface FooterAvatarProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-[180px]",
  md: "w-[220px]",
  lg: "w-[280px] sm:w-[340px] md:w-[400px]",
};

export function FooterAvatar({ className, size = "lg" }: FooterAvatarProps) {
  const pupilsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const fracX = e.clientX / window.innerWidth;
      const fracY = e.clientY / window.innerHeight;

      pupilsRef.current.forEach((pupil) => {
        if (!pupil) return;
        const eye = pupil.parentElement;
        if (!eye) return;
        const { width, height } = eye.getBoundingClientRect();
        const x = (fracX - 0.5) * width * 0.28;
        const y = (fracY - 0.5) * height * 0.22;
        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={cn(
        "footer-avatar-container",
        sizes[size],
        className
      )}
    >
      {/* Native img so a query-string cache bust is allowed (next/image blocks it). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={AVATAR_SRC}
        alt="Animated avatar"
        width={400}
        height={400}
        className="footer-avatar-img h-auto w-full select-none"
        draggable={false}
      />
      <div className="footer-avatar-face" aria-hidden="true">
        <div className="footer-avatar-eye footer-left-eye">
          <div
            ref={(el) => {
              pupilsRef.current[0] = el;
            }}
            className="footer-pupil !w-[40%]"
          />
        </div>
        <div className="footer-avatar-eye footer-right-eye">
          <div
            ref={(el) => {
              pupilsRef.current[1] = el;
            }}
            className="footer-pupil !w-[40%]"
          />
        </div>
      </div>
    </div>
  );
}
