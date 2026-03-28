import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { getLandingPageData, getProjects } from "@/lib/content";

export default async function Home() {
  const landingData = await getLandingPageData();
  const projects = await getProjects();

  return (
    <main className="relative flex flex-col text-foreground">
      <Navbar />
      <Hero data={landingData.hero} />
      <div id="tech-stack">
        <TechStack />
      </div>
      <div id="projects">
        <Projects projects={projects} />
      </div>
      <Footer data={landingData.footer} />
    </main>
  );
}
