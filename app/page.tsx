import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex flex-col text-foreground">
      <Navbar />
      <Hero />
      <div id="tech-stack">
        <TechStack />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <Footer />
    </main>
  );
}
