export interface ContributionYear {
  id: string;
  year: string;
  count: number;
  countLabel: string;
  src: string;
  alt: string;
  orgs: string[];
  note?: string;
}

export const contributions: ContributionYear[] = [
  {
    id: "2026",
    year: "2026",
    count: 1914,
    countLabel: "1,914",
    src: "/images/github/2026.png",
    alt: "GitHub contribution graph for 2026, 1,914 contributions",
    orgs: ["ubiquify-digital", "LessonLoop"],
  },
  {
    id: "2025",
    year: "2025",
    count: 457,
    countLabel: "457",
    src: "/images/github/2025.png",
    alt: "GitHub contribution graph for 2025, 457 contributions",
    orgs: ["ubiquify-digital"],
    note: "Ubiquify",
  },
  {
    id: "2025-fitnescity",
    year: "2025",
    count: 750,
    countLabel: "750",
    src: "/images/github/2025-fitnescity.png",
    alt: "GitHub contribution graph for 2025 at Fitnescity and Alithia, 750 contributions",
    orgs: ["Fitnescity-Tech", "taigaio"],
    note: "Fitnescity",
  },
  {
    id: "2024",
    year: "2024",
    count: 142,
    countLabel: "142",
    src: "/images/github/2024.png",
    alt: "GitHub contribution graph for 2024, 142 contributions",
    orgs: ["freeCodeCamp"],
  },
];
