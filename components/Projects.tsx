import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/button";

const PROJECTS: any[] = [
  {
    title: "Quantum API Engine",
    description: "High-throughput GraphQL engine built for real-time financial data processing, utilizing Rust and Node.js workers.",
    image: "https://picsum.photos/seed/quantum/800/450",
    status: "OPEN SOURCE",
    type: "open-source",
    slug: "quantum-api-engine",
  },
  {
    title: "Nexus CRM Platform",
    description: "Enterprise-grade CRM with automated lead scoring and integrated machine learning models for churn prediction.",
    image: "https://picsum.photos/seed/nexus/800/450",
    status: "ACTIVE PROJECT",
    type: "public",
    slug: "nexus-crm-platform",
  },
  {
    title: "BlockTrace Core",
    description: "Distributed ledger verification system for supply chain transparency, featuring Dockerized validator nodes.",
    image: "https://picsum.photos/seed/trace/800/450",
    status: "NDA PROTECTED",
    type: "private",
    slug: "blocktrace-core",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">
              A selection of my recent work in backend engineering, cloud architecture, and web development.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">View All Projects</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
