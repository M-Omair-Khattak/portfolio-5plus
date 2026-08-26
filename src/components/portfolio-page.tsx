"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CommandPalette } from "@/components/layout/command-palette";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { Contact } from "@/components/sections/contact";

export function PortfolioPage() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <ScrollProgress />
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
