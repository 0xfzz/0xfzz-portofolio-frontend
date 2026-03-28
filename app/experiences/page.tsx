import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExperienceItem } from "@/components/ExperienceItem";
import { TechnicalStackSection } from "@/components/TechnicalStackSection";
import { CollaboratingCTA } from "@/components/CollaboratingCTA";

const EXPERIENCES = [
  {
    role: "Senior Software Engineer",
    company: "TechFlow Solutions",
    period: "Jan 2022 — Present",
    description: [
      "Architected a micro-frontend architecture for a high-traffic e-commerce platform, reducing initial load time by 45%.",
      "Led a team of 6 developers in the migration from legacy monolithic structures to AWS-native serverless environments.",
      "Implemented a robust CI/CD pipeline using GitHub Actions, decreasing deployment failure rates by 30%.",
      "Mentored junior engineers and established internal documentation standards following \"Editorial Precision\" principles."
    ],
    tags: ["React", "Node.js", "AWS Lambda", "TypeScript"]
  },
  {
    role: "Full Stack Developer",
    company: "DataNexus Systems",
    period: "Mar 2019 — Dec 2021",
    description: [
      "Developed and maintained real-time data visualization dashboards for enterprise clients using D3.js and WebSockets.",
      "Optimized database queries for PostgreSQL instances, achieving a 60% improvement in API response times.",
      "Collaborated closely with UX designers to translate complex technical requirements into intuitive user journeys."
    ],
    tags: ["Python", "PostgreSQL", "D3.js", "Redis"]
  },
  {
    role: "Junior Frontend Developer",
    company: "PixelCraft Studio",
    period: "Jun 2017 — Feb 2019",
    description: [
      "Built responsive landing pages and interactive components for diverse client projects.",
      "Mastered modern CSS techniques including Grid and Flexbox to ensure cross-browser compatibility.",
      "Contributed to the internal component library, improving development speed for subsequent projects."
    ],
    tags: ["Vue.js", "Sass", "JavaScript"]
  }
];

const TECHNICAL_STACK = [
  { category: "FRONTEND", skills: "React, Next.js, Tailwind" },
  { category: "BACKEND", skills: "Node.js, Go, Python" },
  { category: "INFRASTRUCTURE", skills: "AWS, Docker, K8s" },
  { category: "DATA", skills: "PostgreSQL, Redis, Mongo" }
];

export default function ExperiencesPage() {
  return (
    <main className="relative flex flex-col text-foreground">
      <Navbar />
      <div className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#323235]">
              Experiences
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              A chronological breakdown of my journey through software architecture, engineering leadership, and product development.
            </p>
          </div>

          <div className="space-y-16 mb-32">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="group">
                <ExperienceItem {...exp} />
                {idx !== EXPERIENCES.length - 1 && (
                  <div className="mt-16 border-t border-border/40" />
                )}
              </div>
            ))}
          </div>

          <TechnicalStackSection 
            title="Technical Stack" 
            stacks={TECHNICAL_STACK} 
          />

          <CollaboratingCTA 
            title="Interested in collaborating?" 
            description="I am always open to discussing architecture or potential leadership opportunities."
            primaryActionLabel="Download CV"
            secondaryActionLabel="Get in Touch"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
