import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { getSiteConfig, getProjects, getTechStackData, getResumeData } from "@/lib/content";

export default async function Home() {
  const siteConfig = await getSiteConfig();
  const techStackData = await getTechStackData();
  const projects = await getProjects();
  const resumeData = await getResumeData();

  return (
    <main className="relative flex flex-col text-foreground">
      <Hero 
        data={siteConfig.hero} 
        resumeData={resumeData} 
        resumeLabel="Download Resume" 
      />
      {siteConfig.visibility?.techStack !== false && (
        <div id="tech-stack">
          <TechStack data={techStackData} />
        </div>
      )}
      {siteConfig.visibility?.projects !== false && (
        <div id="projects">
          <Projects 
            projects={projects} 
            title={siteConfig.pages?.home?.projects?.title}
            subtitle={siteConfig.pages?.home?.projects?.subtitle}
          />
        </div>
      )}
    </main>
  );
}
