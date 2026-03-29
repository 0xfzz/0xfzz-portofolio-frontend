import { ProjectList } from "@/components/projects/ProjectList";
import { getProjects, getSiteConfig } from "@/lib/content";
import { notFound } from "next/navigation";

export default async function ProjectsPage() {
  const siteConfig = await getSiteConfig();

  if (siteConfig.visibility?.projects === false) {
    notFound();
  }

  const projects = await getProjects();

  // Extract unique technologies and sort them
  const allTech = projects.flatMap(project => project.technologies);
  const uniqueTags = ["All", ...Array.from(new Set(allTech)).sort()];

  return (
    <div className="pt-40 pb-24 container mx-auto px-4 max-w-7xl">
      <ProjectList 
        projects={projects} 
        uniqueTags={uniqueTags} 
        title={siteConfig.pages?.projects?.title}
        subtitle={siteConfig.pages?.projects?.subtitle}
      />
    </div>
  );
}
