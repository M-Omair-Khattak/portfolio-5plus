export const profile = {
  name: "Muhammad Omair",
  shortName: "Omair",
  title: "Senior Full Stack Engineer",
  yearsExperience: "5+",
  tagline: "Django, React, and Next.js — client work in healthcare, construction, and the unglamorous tools teams actually use.",
  email: "omairkhattak2018@gmail.com",
  location: "Lahore, Punjab, Pakistan",
  github: "https://github.com/M-Omair-Khattak",
  githubHandle: "M-Omair-Khattak",
  linkedin: "https://www.linkedin.com/in/muhammad-omair333967194",
  linkedinHandle: "Muhammad Omair",
  availability: "Usually reply within a day",
  resumePath: "/resume/Muhammad_Omair_Resume.pdf",
  bio: `I'm a full stack engineer with 5+ years on production web apps. Most of that time is Python on the backend (Django, DRF, FastAPI) and React or Next.js on the frontend. Lately I also ship a lot of TanStack apps, plus the jobs nobody puts on a landing page: Celery workers, Playwright scrapers, CI, and AWS.`,
  extendedBio: `Four years at Arbisoft on client products — health testing, PropTech, auctions, AI tools. Since Oct 2025 I've been at Ubiquify, where I take a messy workflow (faxes, dealer portals, Procore, call recordings) and turn it into something the team actually logs into. I use Cursor every day. That's not a personality; it just means a working slice shows up sooner.`,
  values: [
    {
      title: "Ship the real thing",
      description:
        "Staging, deploys, logs. I would rather hand over a boring working app than a pretty demo.",
    },
    {
      title: "Own the feature",
      description:
        "Database through UI. I don't like throwing half a ticket over the wall and hoping.",
    },
    {
      title: "Tools that earn their keep",
      description:
        "Cursor, Claude, Playwright — when they cut real work. Not as decoration on a résumé.",
    },
    {
      title: "Say the awkward part",
      description:
        "If the spec is wrong, I'll say so. Standups, Slack, tickets. No mystery status updates.",
    },
  ],
  highlights: [
    "5+ years on Django, React, and Next.js",
    "Client work in healthcare, construction, PropTech, and e-commerce",
    "Celery, Playwright, Postgres, Redis, and AWS when the job needs them",
    "TanStack Router, Query, and Table on newer apps",
    "OCR, RAG, and voice agents where they save someone a pile of manual work",
  ],
  process: [
    "Ask questions until the actual workflow is clear — not the slide version",
    "Get a thin slice running so we can argue about the real product",
    "Tests and deploys as we go, not as a phase at the end",
    "Hand off with notes. Next person shouldn't have to reverse-engineer Slack",
  ],
} as const;
