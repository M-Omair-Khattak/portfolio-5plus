export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  liveUrl?: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  responsibilities: string[];
  impact: string[];
  category:
    | "enterprise"
    | "ecommerce"
    | "healthcare"
    | "platform"
    | "iot"
    | "construction"
    | "education"
    | "automotive";
  screenshots: { src: string; alt: string }[];
}

/** Bump when replacing files in public/images/projects/ to bust image cache */
export const PROJECT_IMAGE_VERSION = "4";

export function projectImageSrc(src: string) {
  return `${src}?v=${PROJECT_IMAGE_VERSION}`;
}

function shots(id: string, alts: string[]): Project["screenshots"] {
  return alts.map((alt, i) => ({
    src: `/images/projects/${id}/${i + 1}.png`,
    alt,
  }));
}

export const projects: Project[] = [
  {
    id: "equiem",
    title: "Equiem",
    subtitle: "Smart Building Management Platform",
    description:
      "PropTech platform for commercial buildings, tenant apps, flex space, and the dashboards property teams live in.",
    role: "Full Stack Engineer",
    liveUrl: "https://getequiem.com/",
    technologies: ["Next.js", "Django REST", "TypeScript", "GraphQL", "Redux Toolkit", "PostgreSQL", "AWS", "Docker"],
    features: [
      "Tenant engagement and communication tools",
      "Flex space management workflows",
      "Operational dashboards",
      "GraphQL APIs",
    ],
    challenges: [
      "A lot of properties, a lot of tenant types, one product.",
      "GraphQL schemas that had to stay fast as features piled on.",
    ],
    responsibilities: [
      "Feature work on Next.js and Django REST.",
      "GraphQL integration and Redux Toolkit state.",
      "AWS/Docker deploys with the team.",
    ],
    impact: [
      "Shipped workplace features used across commercial properties.",
    ],
    category: "enterprise",
    screenshots: shots("equiem", [
      "Equiem homepage",
      "Equiem tenant platform",
      "Equiem Engage",
      "Equiem platform overview",
    ]),
  },
  {
    id: "fitnescity",
    title: "Fitnescity",
    subtitle: "Health Testing Marketplace",
    description:
      "Book DEXA, VO2 Max, and blood panels at 700+ locations. Search, maps, calendar, Stripe, the whole booking path.",
    role: "Full Stack Engineer",
    liveUrl: "https://www.fitnescity.com/",
    technologies: ["Next.js", "Elasticsearch", "Stripe Connect", "Google Maps API", "Google Calendar API", "Redis", "SendGrid", "Sentry", "AWS", "Docker"],
    features: [
      "700+ testing locations",
      "Elasticsearch for test discovery",
      "Stripe Connect payments",
      "Maps + calendar booking",
      "Email reminders via SendGrid",
    ],
    challenges: [
      "Search that does not fall over when the catalog is messy.",
      "Split payments with Stripe Connect.",
    ],
    responsibilities: [
      "Next.js frontend and Elasticsearch wiring.",
      "Stripe Connect and Google Maps/Calendar.",
      "Sentry and AWS with the rest of the team.",
    ],
    impact: [
      "People can actually book a test without calling the location first.",
    ],
    category: "healthcare",
    screenshots: shots("fitnescity", [
      "Fitnescity homepage",
      "Fitnescity quiz",
      "Fitnescity locations",
      "Fitnescity blog",
    ]),
  },
  {
    id: "hippocratic-ai",
    title: "Hippocratic AI",
    subtitle: "Generative AI Healthcare Platform",
    description:
      "Marketing and product site for a healthcare AI company. Next.js frontend, Strapi CMS, GraphQL for the content.",
    role: "Full Stack Developer",
    liveUrl: "https://hippocraticai.com/",
    technologies: ["Next.js", "TypeScript", "Strapi", "GraphQL", "Redux Toolkit"],
    features: [
      "Strapi as the CMS",
      "Pages for customers, safety, benchmarks",
      "GraphQL content APIs",
    ],
    challenges: [
      "CMS content that marketing could edit without a deploy.",
      "Keeping the frontend honest about a regulated space.",
    ],
    responsibilities: [
      "Next.js + TypeScript frontend.",
      "Strapi models and GraphQL.",
    ],
    impact: [
      "Gave the team a site they could update without pinging engineering for every headline.",
    ],
    category: "healthcare",
    screenshots: shots("hippocratic-ai", [
      "Hippocratic AI customers",
      "Hippocratic AI about",
      "Hippocratic AI safety",
      "Hippocratic AI benchmarks",
    ]),
  },
  {
    id: "atomic-asher",
    title: "Atomic Asher",
    subtitle: "Creative Studio Website",
    description:
      "Studio site in Astro and Tailwind, projects, team, dark mode, the editorial layout they asked for.",
    role: "Full Stack Developer",
    liveUrl: "https://atomicasher.com/",
    technologies: ["Astro.js", "Tailwind CSS", "TypeScript", "CSS Grid"],
    features: [
      "Editorial layout for projects and team",
      "Dark mode",
      "Static build, fast enough to not think about it",
    ],
    challenges: [
      "Make it look designed without turning into a JavaScript festival.",
    ],
    responsibilities: [
      "Built the site in Astro and Tailwind.",
      "Responsive grids and dark mode.",
    ],
    impact: [
      "A public site the studio can point people at.",
    ],
    category: "platform",
    screenshots: shots("atomic-asher", [
      "Atomic Asher homepage",
      "Atomic Asher vision section",
      "Atomic Asher team section",
      "Atomic Asher core values",
    ]),
  },
  {
    id: "maisonette",
    title: "Maisonette",
    subtitle: "Premium eCommerce Platform",
    description:
      "Kids and home e-commerce. Rails and Next.js, Klaviyo and Narvar in the order path, AWS around it.",
    role: "Full Stack Developer",
    liveUrl: "https://www.maisonette.com/",
    technologies: ["Ruby on Rails", "Next.js", "TypeScript", "Node.js", "Python", "Klaviyo", "AWS", "CI/CD"],
    features: [
      "Klaviyo marketing events",
      "Narvar order tracking",
      "Storefront in Next.js",
    ],
    challenges: [
      "Third-party APIs that fail at the worst time in checkout.",
      "Keeping storefront and backend deploys in sync.",
    ],
    responsibilities: [
      "Feature work across Rails and Next.js.",
      "Klaviyo and Narvar integration.",
      "CI and the usual production chores.",
    ],
    impact: [
      "Shipped storefront and post-purchase pieces that customers actually hit.",
    ],
    category: "ecommerce",
    screenshots: shots("maisonette", [
      "Maisonette homepage",
      "Maisonette shop all",
      "Maisonette FAQ",
      "Maisonette new arrivals",
    ]),
  },
  {
    id: "ft-technologies",
    title: "FT Technologies",
    subtitle: "Industrial IoT Website",
    description:
      "Product site for ultrasonic wind sensors. Next.js frontend, Django REST, Cloudflare in front.",
    role: "Full Stack Engineer",
    liveUrl: "https://fttechnologies.com/",
    technologies: ["Next.js", "Django REST", "TypeScript", "Tailwind CSS", "PostgreSQL", "Redis", "React Hook Form", "Docker", "Cloudflare CDN", "JWT"],
    features: [
      "Product pages for the sensor line",
      "Inquiry forms behind JWT",
      "Redis-cached API responses",
    ],
    challenges: [
      "Industrial clients on slow connections, keep the pages light.",
      "Inquiry forms that don't leak into a public dump.",
    ],
    responsibilities: [
      "Next.js + Tailwind frontend.",
      "Django REST backend and forms.",
      "Docker and Cloudflare with the team.",
    ],
    impact: [
      "Product inquiries go through the site instead of a generic mailbox.",
    ],
    category: "iot",
    screenshots: shots("ft-technologies", [
      "FT Technologies homepage",
      "FT Technologies technology",
      "FT Technologies about",
      "FT Technologies applications",
    ]),
  },
  {
    id: "united-rehab",
    title: "United Rehab",
    subtitle: "Referral Intake & Fax OCR",
    description:
      "Outpatient rehab ops tool. Faxes come in on RingCentral, we OCR them, pull patient and insurance fields, and put a human on the exceptions.",
    role: "Full Stack Engineer",
    liveUrl: "https://staging.unitedrehabtherapy.com",
    technologies: ["Django REST", "Celery", "PostgreSQL", "Redis", "TanStack", "React", "AWS Bedrock", "RingCentral", "S3"],
    features: [
      "Inbound fax via RingCentral",
      "OCR / extraction for referrals",
      "Intake and insurance workflow",
      "Staff UI on TanStack",
    ],
    challenges: [
      "Faxes are ugly. OCR is wrong often enough that the UI has to make corrections cheap.",
      "Don't lose a referral because a worker died mid-job.",
    ],
    responsibilities: [
      "Django APIs, Celery jobs, S3 for the fax images.",
      "TanStack frontend for intake and review.",
      "RingCentral + Bedrock wiring.",
    ],
    impact: [
      "Staff spend less time retyping what was already on the page.",
    ],
    category: "healthcare",
    screenshots: shots("united-rehab", [
      "United Rehab sign in",
      "United Rehab referral inbox",
      "United Rehab fax review and OCR",
      "United Rehab patients list",
      "United Rehab patient profile",
      "United Rehab user management",
    ]),
  },
  {
    id: "automotive-strategies",
    title: "Automotive Strategies",
    subtitle: "Toyota Dealer List Automation",
    description:
      "TLE (Targeted List Export) for a Texas auto consultancy. Playwright logs into Toyota/LEO, builds ZIP-segmented lists, and drops the files for dealers.",
    role: "Full Stack Engineer",
    liveUrl: "https://app.automotivestrategiestx.com",
    technologies: ["Django REST", "Celery", "Playwright", "PostgreSQL", "Redis", "TanStack", "React", "S3", "Traefik"],
    features: [
      "Scheduled Playwright runs against dealer portals",
      "ZIP-segmented marketing lists",
      "Job status UI so nobody has to SSH to see if it ran",
    ],
    challenges: [
      "Portals change. Selectors break. The job has to fail loudly.",
      "Don't hammer a vendor site; queue it.",
    ],
    responsibilities: [
      "Celery + Playwright pipeline.",
      "Django API and TanStack app for operators.",
    ],
    impact: [
      "List buys that used to be a click-through afternoon now run on a schedule.",
    ],
    category: "automotive",
    screenshots: shots("automotive-strategies", [
      "Automotive Strategies sign in",
      "TLE dashboard for dealer lists",
      "TLE job steps for a Toyota list export",
      "TLE job logs and screenshots",
      "TLE dealer settings",
      "Automotive Strategies user management",
    ]),
  },
  {
    id: "park-and-tow",
    title: "Park-and-Tow",
    subtitle: "Towing Ops, Voice, Listings",
    description:
      "Ops hub for a towing company: Retell voice calls, RingCentral recordings, Omadi listing scrape, customer follow-up.",
    role: "Full Stack Engineer",
    liveUrl: "https://app.parkandtowsolutions.com",
    technologies: ["Django REST", "Celery", "Playwright", "PostgreSQL", "TanStack", "React", "AG Grid", "Retell", "RingCentral", "S3"],
    features: [
      "Retell AI call dashboard",
      "RingCentral sync + recordings",
      "Omadi listing scrape",
      "Customer and inquiry tracking",
    ],
    challenges: [
      "Call recordings are large. Don't block the request path.",
      "Scraper has to survive a listing site that was not built for bots.",
    ],
    responsibilities: [
      "Django APIs, Celery, Playwright scrape.",
      "TanStack UI, WaveSurfer for playback.",
      "RingCentral and Retell glue.",
    ],
    impact: [
      "Dispatchers can see the call and the listing without hopping tools.",
    ],
    category: "platform",
    screenshots: shots("park-and-tow", [
      "Park-and-Tow sign in",
      "AI agent calls history",
      "Call recording, transcript, and vehicle details",
      "RingCentral call log",
      "Inquiring party profile",
      "Tow listings",
      "Tow listing detail",
      "Listing photos and yard details",
      "Delivery app view",
      "Park-and-Tow user management",
    ]),
  },
  {
    id: "lessonloop",
    title: "LessonLoop",
    subtitle: "K-12 Educator Portal",
    description:
      "Class loops, surveys, lesson planner, student onboarding. Nuxt on the frontend, Lambda/Dynamo/OpenSearch/Bedrock on the backend.",
    role: "Full Stack Engineer",
    liveUrl: "https://app.lessonloop.org",
    technologies: ["Nuxt 3", "Vue 3", "PrimeVue", "AWS Lambda", "DynamoDB", "OpenSearch", "S3", "Bedrock", "Node.js"],
    features: [
      "Educator surveys and class loops",
      "AI-assisted lesson planning",
      "NYC / Google OAuth",
    ],
    challenges: [
      "Serverless means cold starts and a lot of IAM. Worth it for the school-district deploy story.",
      "Lesson-plan prompts that teachers will actually edit, not ignore.",
    ],
    responsibilities: [
      "Work across etl-site (Nuxt) and etl-api (Lambda).",
      "OpenSearch and Bedrock pieces for planning.",
    ],
    impact: [
      "Teachers get a planner that talks to their existing loop data.",
    ],
    category: "education",
    screenshots: shots("lessonloop", [
      "LessonLoop educator and admin login",
      "Admin home and manage tools",
      "Instructional strategies catalog",
      "Educator survey reporting",
      "Classroom frustration and support report",
      "Question-level survey responses",
      "Report generator",
      "Manage schools",
      "Student well-being audit log",
    ]),
  },
  {
    id: "cntndr",
    title: "CNTNDR",
    subtitle: "White-label Fitness Platform",
    description:
      "Trainers get their own programs, workouts, HLS video, and Stripe subs. Admin, client, and landing apps, Next.js and Nest, multi-tenant.",
    role: "Full Stack Engineer",
    liveUrl: "https://app.cntndr.com",
    technologies: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Stripe", "Bunny CDN", "AWS S3"],
    features: [
      "Per-trainer custom domains",
      "Program and workout builder",
      "HLS video on Bunny",
      "Stripe subscriptions",
    ],
    challenges: [
      "Multi-tenant without leaking one trainer's members to another.",
      "Video that starts on a phone, not after a 20MB progressive download.",
    ],
    responsibilities: [
      "Feature work across Nest API and Next apps (admin, client, landing).",
      "Stripe and media pipeline with the team.",
    ],
    impact: [
      "Trainers can run a branded app without us standing up a new repo each time.",
    ],
    category: "platform",
    screenshots: shots("cntndr", [
      "CNTNDR create-account checkout",
      "Account verification and payment",
      "Trainer landing page",
      "Membership plans",
      "Programs hero",
      "Program catalog",
      "Program filters",
      "Workout player",
      "Shop catalog",
      "Product detail",
      "Cart and merch",
      "Blog post",
      "White-label welcome screen",
      "Plan and billing",
      "Change-plan confirmation",
      "Available programs",
      "Active programs",
      "In-membership workout",
      "Program detail and checkout",
      "Member profile dashboard",
      "Billing settings",
      "Program browse",
      "Program purchase",
    ]),
  },
  {
    id: "ubiquify-site",
    title: "Ubiquify Website",
    subtitle: "Company Marketing Site",
    description:
      "Ubiquify's public site. Next.js, Ant Design, blog and contact forms. Content lives in Strapi.",
    role: "Full Stack Engineer",
    liveUrl: "https://ubiquifydigital.com/",
    technologies: ["Next.js", "Ant Design", "Tailwind CSS", "Framer Motion", "Strapi", "PostgreSQL", "S3"],
    features: [
      "Services and blog",
      "Contact forms",
      "Strapi CMS",
    ],
    challenges: [
      "Marketing wants to publish without a deploy. Strapi does that; the Next fetch has to keep up.",
    ],
    responsibilities: [
      "Next.js frontend.",
      "Strapi content types and S3 media.",
    ],
    impact: [
      "A site the company can update without opening a PR for every paragraph.",
    ],
    category: "platform",
    screenshots: shots("ubiquify-site", [
      "Ubiquify homepage",
      "Client results carousel",
      "Case studies grid",
      "Careers page",
    ]),
  },
  {
    id: "invaluable",
    title: "Invaluable",
    subtitle: "Auction Marketplace",
    description:
      "Auction listings and bidding UI. React and Next.js, the pages people hit when they're trying to place a bid, not when they're reading a blog.",
    role: "Frontend Engineer",
    liveUrl: "https://www.invaluable.com/",
    technologies: ["React", "Next.js", "JavaScript", "HTML5", "CSS3"],
    features: [
      "Auction listing UI",
      "Bidding interaction",
      "Responsive layouts",
    ],
    challenges: [
      "Live-feeling UI without turning every click into a full reload.",
    ],
    responsibilities: [
      "React/Next components for listings and bidding.",
    ],
    impact: [
      "Cleaner listing and bid flow on the pages I owned.",
    ],
    category: "ecommerce",
    screenshots: shots("invaluable", [
      "Invaluable login",
      "Create-account modal",
      "Invaluable homepage",
      "Live auction bidding",
      "Upcoming auctions",
      "Auction house profile",
      "Popular artists",
    ]),
  },
  {
    id: "comickaze",
    title: "ComicKaze",
    subtitle: "Comics & Pop Culture Store",
    description:
      "Freelance. Django + React store for comic books, graphic novels, and pop culture merch, Stripe at checkout.",
    role: "Full Stack Developer",
    liveUrl: "https://comickaze.com/",
    technologies: ["Django", "React", "Redux", "PostgreSQL", "Stripe"],
    features: [
      "Catalog and cart",
      "Stripe checkout",
    ],
    challenges: [
      "A small store still needs inventory that doesn't double-sell.",
    ],
    responsibilities: [
      "Django API, React storefront, Stripe.",
    ],
    impact: [
      "A shop that could take a real payment.",
    ],
    category: "ecommerce",
    screenshots: shots("comickaze", [
      "ComicKaze homepage",
      "All products catalog",
      "Manga category",
    ]),
  },
  {
    id: "antis",
    title: "Antis",
    subtitle: "Construction Attendance & Labor Costing",
    description:
      "Digital attendance, labor costing, job-site reporting, Excel/PDF exports. The office version of what used to live in a spreadsheet.",
    role: "Full Stack Engineer",
    technologies: ["Django REST", "PostgreSQL", "JWT", "TanStack", "React", "AG Grid", "Tailwind CSS", "AWS RDS"],
    features: [
      "Crew attendance",
      "Labor costing against jobs",
      "Excel and PDF exports",
      "AG Grid for the dense tables",
    ],
    challenges: [
      "Costing math that payroll will argue with if it's off by a dollar.",
      "Tables with enough columns that a normal <table> gives up.",
    ],
    responsibilities: [
      "Django REST API and AWS RDS.",
      "TanStack + AG Grid frontend.",
    ],
    impact: [
      "Job costing moved out of the shared spreadsheet.",
    ],
    category: "construction",
    screenshots: shots("antis", [
      "Antis sign in",
      "Antis attendance dashboard",
      "Daily attendance grid",
      "Job sites",
      "Personnel and labor rates",
      "Project labor report with Excel and PDF export",
    ]),
  },
  {
    id: "keeley",
    title: "Keeley",
    subtitle: "Field Reports, Billing, Procore",
    description:
      "Keeley Construction internals: Procore-synced field reports, a billing/draw tracker, SMB file browser, and a Claude MCP for job financials.",
    role: "Full Stack Engineer",
    technologies: ["Django", "Celery", "PostgreSQL", "Redis", "Procore API", "TanStack", "React", "AG Grid", "MCP"],
    features: [
      "Procore sync for field reports",
      "Billing / draw tracker",
      "SMB file browser",
      "Claude MCP for job questions",
    ],
    challenges: [
      "Procore's API is fine until it isn't, retries and idempotency.",
      "MCP that answers from real job data, not a hallucinated spreadsheet.",
    ],
    responsibilities: [
      "Backend jobs, Procore integration, MCP server.",
      "TanStack + AG Grid UI for reports and billing.",
    ],
    impact: [
      "Field and billing data in one place instead of Procore plus three exports.",
    ],
    category: "construction",
    screenshots: shots("keeley", [
      "Keeley Field Reports sign in",
      "Field reports dashboard",
      "Superintendent compliance analytics",
      "Superintendent weekly breakdown",
      "Billing dashboard",
      "Billing tracker by job",
      "Procore sync status",
      "Keeley files browser",
      "Project visibility settings",
      "Keeley user management",
    ]),
  },
  {
    id: "everon-crm",
    title: "Everon CRM",
    subtitle: "Dealer Marketing Automations",
    description:
      "CRM for auto dealers: onboard a tenant, then run AutoCalls, TextRequest, DMS hooks, and email campaigns.",
    role: "Full Stack Engineer",
    technologies: ["Django", "Celery", "PostgreSQL", "Redis", "React", "Vite", "Docker"],
    features: [
      "Dealer tenant onboarding",
      "Outbound call and SMS automations",
      "DMS and email campaign hooks",
    ],
    challenges: [
      "Every dealer wants one more integration. Keep the core from becoming a hairball.",
    ],
    responsibilities: [
      "Django + Celery backend.",
      "React operator UI.",
    ],
    impact: [
      "Dealers can run a campaign without exporting a CSV by hand.",
    ],
    category: "automotive",
    screenshots: shots("everon-crm", [
      "Everon CRM sign in",
      "Dealer conversion funnel dashboard",
      "Vehicle alert inbox",
      "Dealer profile and settings",
      "Dealer integrations",
      "Background sync jobs",
      "Campaigns",
      "AI call history and transcript",
      "Customers",
      "Appointments",
      "Vehicle alerts",
      "Dealer directory",
    ]),
  },
  {
    id: "abs-tender-scanner",
    title: "ABS Tender Scanner",
    subtitle: "Pakistan Procurement Watch",
    description:
      "Playwright scrapers across PPRA/eProcure and other portals. Keyword match, then a dashboard of tenders worth opening.",
    role: "Full Stack Engineer",
    technologies: ["Express", "TypeScript", "Prisma", "PostgreSQL", "Playwright", "TanStack", "React", "Vite"],
    features: [
      "Multi-portal scrape",
      "Keyword matching",
      "Tender dashboard",
    ],
    challenges: [
      "Government sites were not designed for this. Captchas, timeouts, HTML from 2009.",
    ],
    responsibilities: [
      "Express + Prisma API.",
      "Playwright scrapers.",
      "TanStack dashboard.",
    ],
    impact: [
      "ABS sees matching tenders without someone refreshing ten portals.",
    ],
    category: "enterprise",
    screenshots: shots("abs-tender-scanner", [
      "ABS Scanner dashboard",
      "Tender list and scrape",
      "Keyword management",
      "Scraper sites",
      "Invoices",
      "Invoice and commission reports",
      "User management",
    ]),
  },
  {
    id: "ledgerx",
    title: "LedgerX",
    subtitle: "Trading Journal",
    description:
      "Early trading journal, Django API, Next.js frontend. Users, auth, the skeleton of a journal. Still early.",
    role: "Full Stack Engineer",
    technologies: ["Django REST", "Celery", "PostgreSQL", "Redis", "Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Auth and user accounts",
      "Journal-oriented data model",
      "Next.js app shell",
    ],
    challenges: [
      "Don't over-build before the workflow is real.",
    ],
    responsibilities: [
      "Django backend and Next.js frontend from the shared boilerplates.",
    ],
    impact: [
      "A runnable starting point instead of a slide.",
    ],
    category: "platform",
    screenshots: shots("ledgerx", [
      "TradingAlpha marketing site",
      "Trading dashboard",
      "Trade history",
      "Customize columns",
      "Trading journal",
      "Analytics",
      "Trading accounts settings",
      "Dark-mode dashboard",
      "Dark-mode trade history",
      "Dark-mode analytics",
      "Trade detail",
      "Trade executions",
    ]),
  },
  {
    id: "axocean",
    title: "AXOCEAN",
    subtitle: "Affiliate E-commerce",
    description:
      "Browse designs, jump out to Flipkart. DRF backend, Next.js frontend. Affiliate, not a warehouse.",
    role: "Full Stack Developer",
    technologies: ["Django REST", "Next.js", "React", "PostgreSQL", "Tailwind CSS"],
    features: [
      "Design catalog",
      "Outbound affiliate links",
    ],
    challenges: [
      "Don't pretend we stock the item. The jump to Flipkart has to be obvious.",
    ],
    responsibilities: [
      "DRF API and Next.js catalog.",
    ],
    impact: [
      "A catalog people can browse without us holding inventory.",
    ],
    category: "ecommerce",
    screenshots: shots("axocean", [
      "AXOCEAN homepage",
      "AXOCEAN catalog",
      "AXOCEAN product",
      "AXOCEAN layout",
    ]),
  },

];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "enterprise", label: "Enterprise" },
  { id: "healthcare", label: "Healthcare" },
  { id: "construction", label: "Construction" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "automotive", label: "Automotive" },
  { id: "education", label: "Education" },
  { id: "platform", label: "Platform" },
  { id: "iot", label: "IoT" },
] as const;
