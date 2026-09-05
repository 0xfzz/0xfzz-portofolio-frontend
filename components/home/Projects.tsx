import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/content";

export function Projects({
  projects,
  title = "Featured Projects",
  subtitle = "A selection of my recent work in backend engineering, cloud architecture, and web development."
}: {
  projects: Project[],
  title?: string,
  subtitle?: string
}) {
  return (
    <section id="projects" className="py-10 md:py-14">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-[2.75rem] font-bold tracking-tight leading-tight text-foreground mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {subtitle}
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
