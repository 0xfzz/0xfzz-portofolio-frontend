import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { getSiteConfig, getProjects, getTechStackData, getExperiencesData, getEducationData, getAwardsData, getContactData } from "@/lib/content";

export default async function Home() {
  const siteConfig = await getSiteConfig();
  const techStackData = await getTechStackData();
  const projects = await getProjects();
  const experiences = await getExperiencesData();
  const education = await getEducationData();
  const awards = await getAwardsData();
  const contact = await getContactData();

  const resumeData = {
    name: siteConfig.metadata.name,
    title: siteConfig.hero.subtitle.split('.')[0] + '.', // Use first sentence as professional title
    contact,
    summary: siteConfig.hero.subtitle,
    work: experiences,
    education,
    skills: techStackData.skills,
    awards,
  };

  return (
    <main className="relative flex flex-col text-foreground">
      <Hero 
        data={siteConfig.hero} 
        resumeData={resumeData} 
        resumeLabel={siteConfig.collaborating.primaryActionLabel} 
      />
      {siteConfig.visibility?.techStack !== false && (
        <div id="tech-stack">
          <TechStack data={techStackData} />
        </div>
      )}
      {siteConfig.visibility?.projects !== false && (
        <div id="projects">
          <Projects projects={projects} />
        </div>
      )}
    </main>
  );
}
