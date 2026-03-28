import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Github, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "Quantum API Engine",
    description: "High-throughput GraphQL engine built for real-time financial data processing, utilizing Rust and Node.js workers.",
    image: "https://picsum.photos/seed/quantum/800/450",
    status: "OPEN SOURCE",
    github: "#",
    demo: "#",
  },
  {
    title: "Nexus CRM Platform",
    description: "Enterprise-grade CRM with automated lead scoring and integrated machine learning models for churn prediction.",
    image: "https://picsum.photos/seed/nexus/800/450",
    status: "ACTIVE PROJECT",
    github: "#",
    demo: "#",
  },
  {
    title: "BlockTrace Core",
    description: "Distributed ledger verification system for supply chain transparency, featuring Dockerized validator nodes.",
    image: "https://picsum.photos/seed/trace/800/450",
    status: "DEPLOYED",
    github: "#",
    demo: "#",
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
            <Card key={project.title} className="group overflow-hidden border-border/40 shadow-sm transition-all duration-500 bg-background">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-xl font-bold tracking-tight">{project.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground pt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="px-6 py-4 flex items-center justify-between border-t border-border/40 mt-auto">
                 <Button variant="ghost" size="sm" className="h-auto p-0 gap-2 text-xs font-bold text-foreground hover:bg-transparent">
                    <span className="opacity-60">&lt;&gt;</span> View on GitHub
                 </Button>
                 <Badge variant="outline" className="text-[9px] font-extrabold tracking-[0.2em] px-2 py-0.5 border-border/60 text-muted-foreground/50 rounded-sm">
                   {project.status}
                 </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
