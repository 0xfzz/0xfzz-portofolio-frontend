import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectList } from "@/components/projects/ProjectList";
import { getProjects, getLandingPageData } from "@/lib/content";

export default async function ProjectsPage() {
  const projects = await getProjects();
  const landingData = await getLandingPageData();

  // Extract unique tags and sort them
  const allTags = projects.flatMap(project => project.tags);
  const uniqueTags = ["All", ...Array.from(new Set(allTags)).sort()];

  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
      <div className="pt-40 pb-24 container mx-auto px-4 max-w-7xl">
        <ProjectList projects={projects} uniqueTags={uniqueTags} />
      </div>

      <Footer data={landingData.footer} />
    </main>
  );
}
