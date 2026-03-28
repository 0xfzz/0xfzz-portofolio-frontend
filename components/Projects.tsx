import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/button";
import { Project } from "@/lib/content";

export function Projects({ projects }: { projects: Project[] }) {
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
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
