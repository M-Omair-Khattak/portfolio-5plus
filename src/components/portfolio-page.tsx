"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CommandPalette } from "@/components/layout/command-palette";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { PageAtmosphere } from "@/components/effects/page-atmosphere";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Contributions } from "@/components/sections/contributions";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export function PortfolioPage() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <PageAtmosphere />
      <CustomCursor />
      <LoadingScreen />
      <ScrollProgress />
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <main className="relative z-[1]">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contributions />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
