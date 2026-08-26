"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
    const pupilStartPoint = -10;
    const pupilRangeX = 20;
    const pupilRangeY = 15;
    const mouseXEndPoint = window.innerWidth;
    const mouseYEndPoint = window.innerHeight;

    function handleMouseMove(e: MouseEvent) {
      const fracX = e.clientX / mouseXEndPoint;
      const fracY = e.clientY / mouseYEndPoint;
      const x = pupilStartPoint + fracX * pupilRangeX;
      const y = pupilStartPoint + fracY * pupilRangeY;
      const transform = `translate(${x}px, ${y}px)`;

      pupilsRef.current.forEach((pupil) => {
        if (pupil) pupil.style.transform = transform;
      });
    }

    function handleResize() {
      /* ranges stay window-based like reference main.js */
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "footer-avatar-container",
        sizes[size],
        className
      )}
    >
      <Image
        src="/images/footer-avatar.png"
        alt="Animated avatar"
        width={400}
        height={400}
        className="footer-avatar-img h-auto w-full select-none"
        priority
        draggable={false}
      />
      <div className="footer-avatar-face" aria-hidden="true">
        <div className="footer-avatar-eye footer-left-eye">
          <div
            ref={(el) => {
              pupilsRef.current[0] = el;
            }}
            className="footer-pupil"
          />
        </div>
        <div className="footer-avatar-eye footer-right-eye">
          <div
            ref={(el) => {
              pupilsRef.current[1] = el;
            }}
            className="footer-pupil"
          />
        </div>
      </div>
    </div>
  );
}
