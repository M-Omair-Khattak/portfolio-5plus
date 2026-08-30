export interface ExperienceWork {
  name: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location?: string;
  current?: boolean;
  description?: string;
  stack: string[];
  work: ExperienceWork[];
  responsibilities: string[];
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    id: "ubiquify",
    company: "Ubiquify",
    position: "Full Stack Engineer",
    duration: "Oct 2025 to Present",
    location: "Lahore, Pakistan",
    current: true,
    description:
      "End-to-end product delivery for construction, healthcare, and automotive teams, from first ticket through staging and production.",
    stack: [
      "Django",
      "DRF",
      "NestJS",
      "TanStack",
      "Next.js",
      "Playwright",
      "AWS",
      "Stripe",
    ],
    work: [
      {
        name: "Antis",
        summary: "Attendance and labor costing for construction crews, with Excel and PDF exports.",
      },
      {
        name: "Keeley Construction",
        summary: "Procore field reports, a billing/draw tracker, and a Claude MCP for job financials.",
      },
      {
        name: "United Rehab",
        summary: "Inbound fax OCR, patient intake, insurance extraction, and RingCentral for the fax line.",
      },
      {
        name: "Automotive Strategies",
        summary: "Playwright jobs that log into Toyota/LEO, buy ZIP-segmented lists, and export them for dealers.",
      },
      {
        name: "Park-and-Tow",
        summary: "Retell voice dashboard, RingCentral call sync and recordings, and Omadi listing scrape.",
      },
      {
        name: "LessonLoop",
        summary: "K-12 educator portal for lesson planning and class surveys.",
      },
      {
        name: "CNTNDR",
        summary: "White-label fitness app with video and Stripe billing.",
      },
      {
        name: "Everon CRM",
        summary: "Dealer CRM for call, SMS, and email campaigns.",
      },
      {
        name: "ABS Tender Scanner",
        summary: "Scanner for Pakistan government tenders.",
      },
      {
        name: "Ubiquify Website",
        summary: "Company marketing site.",
      },
    ],
    responsibilities: [
      "Build and ship client apps end to end, Django/DRF or Nest on the backend, TanStack or Next.js on the frontend.",
      "Own features from first ticket through production, including staging deploys, client demos, and post-launch fixes.",
      "Build background jobs and automations, Celery workers, Playwright scrapers, and scheduled dealer-list exports.",
      "Integrate the systems staff already use: RingCentral, Procore, Stripe, Retell, and AWS.",
      "Turn messy operational workflows, fax intake, attendance, billing draws, into tools the office can run daily.",
    ],
    achievements: [
      "Stood up several client apps from empty repo to tools staff use daily.",
      "Cut a lot of manual fax handling at United Rehab by parsing referrals instead of typing them.",
      "Took dealer list exports off a click-through portal routine and onto a scheduled job.",
      "Put Keeley field reports, billing, and job financials in one place instead of Procore plus three exports.",
      "Gave Park-and-Tow dispatchers a single hub for voice calls, recordings, and listings.",
    ],
  },
  {
    id: "arbisoft",
    company: "Arbisoft",
    position: "Software Engineer",
    duration: "Aug 2021 to Oct 2025",
    location: "Lahore, Pakistan",
    description:
      "Client platforms in healthcare, PropTech, auctions, and AI, Django REST backends, React and Next.js frontends, CI/CD, and long-running production support.",
    stack: [
      "Django",
      "DRF",
      "Flask",
      "React",
      "Next.js",
      "Redux Toolkit",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    work: [
      {
        name: "Equiem",
        summary: "PropTech platform for commercial buildings, tenant apps, and operations dashboards.",
      },
      {
        name: "Fitnescity",
        summary: "Health testing marketplace, search, maps, calendar, and Stripe booking.",
      },
      {
        name: "Hippocratic AI",
        summary: "Healthcare AI marketing and product site on Next.js and Strapi.",
      },
      {
        name: "FT Technologies",
        summary: "Industrial IoT marketing site and catalog work.",
      },
      {
        name: "Invaluable",
        summary: "Auction marketplace features for live bidding and catalog workflows.",
      },
      {
        name: "Maisonette",
        summary: "Premium e-commerce storefront and checkout flows.",
      },
      {
        name: "Atomic Asher",
        summary: "Creative studio website and content experience.",
      },
      {
        name: "AXOCEAN",
        summary: "Affiliate e-commerce storefront.",
      },
    ],
    responsibilities: [
      "Shipped production web apps with Django, Django REST Framework, React, and Next.js.",
      "Designed REST APIs and smaller services in Django and Flask, JWT, Postgres, and pragmatic architecture.",
      "Built UI with React, Redux Toolkit, Tailwind, and Next.js routing, including mobile-ready layouts.",
      "Set up GitHub Actions and GitLab CI so tests and deploys were not a Friday-night ritual.",
      "Wrote pytest and Postman suites so regressions showed up before a client did.",
    ],
    achievements: [
      "Stayed on the same clients long enough to own features, not just tickets: Fitnescity, Equiem, FT Technologies, Hippocratic AI, Invaluable, and others.",
      "Mentored interns through their first production PRs.",
      "Got CI in place on projects that previously deployed by hand.",
      "Supported long-running production releases, bug fixes, performance work, and handoff, without dropping the clients.",
      "Shipped booking, marketplace, and storefront work that customers actually hit, not just internal demos.",
    ],
  },
];
