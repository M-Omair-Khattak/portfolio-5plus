"use client";

import { useEffect, useRef } from "react";

type CursorMode = "default" | "hover" | "view" | "text";

function readMode(node: EventTarget | null): CursorMode {
  if (!(node instanceof Element)) return "default";
  if (node.closest("input, textarea, select, [contenteditable='true']")) return "text";
  if (node.closest("[data-cursor='view'], #projects button.group")) {
    return "view";
  }
  if (
    node.closest(
      "a, button, label, summary, [role='button'], [role='option'], [role='menuitem']"
    )
  ) {
    return "hover";
  }
  return "default";
}

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = rootRef.current;
    const follow = followRef.current;
    if (!root || !follow) return;

    document.documentElement.classList.add("custom-cursor-active");

    let x = -100;
    let y = -100;
    let visible = false;
    let down = false;
    let mode: CursorMode = "default";
    let rafId = 0;
    let dirty = true;

    function setMode(next: CursorMode) {
      if (mode === next) return;
      mode = next;
      root!.dataset.mode = next;
      dirty = true;
    }

    function render() {
      if (dirty) {
        const shown = visible && mode !== "text" ? "1" : "0";
        const punch = down ? 0.86 : 1;
        follow!.style.opacity = shown;
        follow!.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${punch})`;
        dirty = false;
      }
      rafId = requestAnimationFrame(render);
    }

    function onMouseMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
      visible = true;
      setMode(readMode(e.target));
      dirty = true;
    }

    function onMouseOver(e: MouseEvent) {
      setMode(readMode(e.target));
    }

    function onMouseDown() {
      down = true;
      root!.dataset.down = "true";
      dirty = true;
    }

    function onMouseUp() {
      down = false;
      root!.dataset.down = "false";
      dirty = true;
    }

    function onMouseLeave() {
      visible = false;
      dirty = true;
    }

    function onMouseEnter() {
      visible = true;
      dirty = true;
    }

    rafId = requestAnimationFrame(render);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="site-cursor hidden md:block"
      data-mode="default"
      data-down="false"
      aria-hidden="true"
    >
      <div ref={followRef} className="site-cursor-follow">
        <span className="site-cursor-halo" />
        <span className="site-cursor-orbit" />
        <span className="site-cursor-ring" />
        <span className="site-cursor-core" />
        <span className="site-cursor-label">View</span>
      </div>
    </div>
  );
}
