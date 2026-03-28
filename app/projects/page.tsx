import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProjects, getLandingPageData } from "@/lib/content";

export default async function ProjectsPage() {
  const projects = await getProjects();
  const landingData = await getLandingPageData();

  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
      <div className="pt-40 pb-24 container mx-auto px-4 max-w-7xl">
        <ProjectsHeader 
          title="Projects That I've Made"
          subtitle="A curated selection of technical challenges, experimental systems, and functional applications built with modern stacks."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>

      <Footer data={{ copyright: "© {year} 0xfzz. Built with luvv.", tagline: "Architecting the future, one byte at a time." }} />
    </main>
  );
}
