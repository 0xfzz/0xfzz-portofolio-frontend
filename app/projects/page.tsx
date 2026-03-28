import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PROJECTS = [
  {
    title: "Quantum API Engine",
    description: "High-throughput GraphQL engine built for real-time financial data processing, utilizing Rust and Node.js workers.",
    image: "https://picsum.photos/seed/quantum/1600/1000",
    slug: "quantum-api-engine",
    category: "Public" as const,
  },
  {
    title: "Quantum API Engine",
    description: "High-throughput GraphQL engine built for real-time financial data processing, utilizing Rust and Node.js workers.",
    image: "https://picsum.photos/seed/quantum2/1600/1000",
    slug: "quantum-api-engine-2",
    category: "Public" as const,
  },
  {
    title: "Quantum API Engine",
    description: "High-throughput GraphQL engine built for real-time financial data processing, utilizing Rust and Node.js workers.",
    image: "https://picsum.photos/seed/quantum3/1600/1000",
    slug: "quantum-api-engine-3",
    category: "Public" as const,
  },
  {
    title: "Nexus CRM",
    description: "A comprehensive customer relationship management system with AI-powered lead scoring and automated pipeline management.",
    image: "https://picsum.photos/seed/nexus/1600/1000",
    slug: "nexus-crm",
    category: "Private" as const,
  },
  {
    title: "BlockTrace Core",
    description: "Enterprise blockchain explorer and analytics platform providing real-time visibility into distributed ledger transactions.",
    image: "https://picsum.photos/seed/block/1600/1000",
    slug: "blocktrace-core",
    category: "Open Source" as const,
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
      <div className="pt-40 pb-24 container mx-auto px-4 max-w-7xl">
        <ProjectsHeader 
          title="Projects That I've Made"
          subtitle="A curated selection of technical challenges, experimental systems, and functional applications built with modern stacks."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
