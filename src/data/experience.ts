export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location?: string;
  description?: string;
  responsibilities: string[];
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    id: "ubiquify",
    company: "Ubiquify",
    position: "Full Stack Engineer",
    duration: "Oct 2025 — Present",
    location: "Lahore, Pakistan",
    description:
      "Small team, a lot of client work. I take a product from first ticket through staging and usually production.",
    responsibilities: [
      "Build and maintain client apps end to end — Django/DRF or Nest on the backend, TanStack or Next.js on the frontend.",
      "Antis: attendance and labor costing for construction crews, plus Excel/PDF exports the office actually uses.",
      "Keeley Construction: Procore field reports, a billing/draw tracker, and a Claude MCP so people can ask about job financials without opening five tabs.",
      "United Rehab: inbound fax OCR, patient intake, insurance extraction, RingCentral for the fax line.",
      "Automotive Strategies: Playwright jobs that log into Toyota/LEO, buy ZIP-segmented marketing lists, and dump them for dealers.",
      "Park-and-Tow: Retell voice dashboard, RingCentral call sync and recordings, Omadi listing scrape.",
      "Also LessonLoop, CNTNDR, Everon CRM, RCS, Mobile Expert, Design Democracy, ABS tender scanner, and the Ubiquify marketing site.",
    ],
    achievements: [
      "Stood up several client apps from empty repo to something staff use daily.",
      "Cut a lot of manual fax handling at United Rehab by parsing referrals instead of typing them.",
      "Took dealer list exports off a click-through-the-portal routine and onto a scheduled job.",
    ],
  },
  {
    id: "arbisoft",
    company: "Arbisoft",
    position: "Software Engineer",
    duration: "Aug 2021 — Oct 2025",
    location: "Lahore, Pakistan",
    description:
      "Full-time on client products. Django/DRF backends, React and Next.js frontends, the usual production mess.",
    responsibilities: [
      "Shipped production web apps with Django, Django REST Framework, React, and Next.js.",
      "Wrote REST APIs and smaller services in Django and Flask — JWT, Postgres, nothing clever for its own sake.",
      "Built UI with React, Redux Toolkit, Tailwind, and Next.js routing. Made it work on a phone.",
      "Set up GitHub Actions and GitLab CI so tests and deploys were not a Friday-night ritual.",
      "Wrote pytest and Postman suites so regressions showed up before a client did.",
      "Sat with interns and juniors on PRs, pair sessions, and the kind of notes people actually read.",
      "Touched Hyperledger Fabric on an access-control prototype — not my whole job, but I know my way around the network YAML.",
    ],
    achievements: [
      "Stayed on the same clients long enough to own features, not just tickets: Fitnescity, Equiem, FT Technologies, Hippocratic AI, Invaluable, and others.",
      "Mentored interns through their first production PRs.",
      "Got CI in place on projects that previously deployed by hand.",
    ],
  },
];
