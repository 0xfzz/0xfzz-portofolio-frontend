import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { getLandingPageData, getProjects, getTechStackData } from "@/lib/content";

export default async function Home() {
  const landingData = await getLandingPageData();
  const techStackData = await getTechStackData();
  const projects = await getProjects();

  return (
    <main className="relative flex flex-col text-foreground">
      <Navbar />
      <Hero data={landingData.hero} />
      <div id="tech-stack">
        <TechStack data={techStackData} />
      </div>
      <div id="projects">
        <Projects projects={projects} />
      </div>
      <Footer data={landingData.footer} />
    </main>
  );
}
