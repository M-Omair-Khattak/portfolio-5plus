"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    document.documentElement.classList.add("custom-cursor-active");

    let outerX = 0;
    let outerY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId = 0;

    function animateOuter() {
      outerX += (targetX - outerX) * 0.15;
      outerY += (targetY - outerY) * 0.15;
      outer!.style.transform = `translate(calc(${outerX}px - 50%), calc(${outerY}px - 50%))`;
      rafId = requestAnimationFrame(animateOuter);
    }

    function onMouseMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      inner!.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      inner!.style.opacity = "1";
      outer!.style.opacity = "1";
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, label, input, textarea, select, [role='button']")) {
        inner!.classList.add("cursor-hover");
        outer!.classList.add("cursor-hover");
      }
    }

    function onMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, label, input, textarea, select, [role='button']")) {
        inner!.classList.remove("cursor-hover");
        outer!.classList.remove("cursor-hover");
      }
    }

    function onMouseLeave() {
      inner!.style.opacity = "0";
      outer!.style.opacity = "0";
    }

    function onMouseEnter() {
      inner!.style.opacity = "1";
      outer!.style.opacity = "1";
    }

    rafId = requestAnimationFrame(animateOuter);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <>
      <div ref={innerRef} className="cursor-inner hidden md:block" aria-hidden="true" />
      <div ref={outerRef} className="cursor-outer hidden md:block" aria-hidden="true" />
    </>
  );
}
