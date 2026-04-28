import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/button";
import { Project } from "@/lib/content";
import { SquaresFourIcon } from "@phosphor-icons/react/dist/ssr";

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
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-4">
              <SquaresFourIcon size={40} weight="duotone" className="text-primary" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
            </div>
            <p className="text-muted-foreground text-lg">
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
