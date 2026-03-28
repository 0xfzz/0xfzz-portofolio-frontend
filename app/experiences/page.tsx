import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExperienceItem } from "@/components/ExperienceItem";
import { TechnicalStackSection } from "@/components/TechnicalStackSection";
import { CollaboratingCTA } from "@/components/CollaboratingCTA";
import { getExperiencesData, getLandingPageData } from "@/lib/content";

export default async function ExperiencesPage() {
  const experiences = await getExperiencesData();
  const landingData = await getLandingPageData();

  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
      <div className="pt-40 pb-24 container mx-auto px-4 max-w-5xl">
        <div className="space-y-12 mb-24">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#323235]">
              Experience
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
              A journey through building scalable systems, securing infrastructures, and leading engineering teams.
            </p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/40 before:to-transparent">
            {experiences.map((exp: any, index: number) => (
              <ExperienceItem key={index} {...exp} />
            ))}
          </div>
        </div>

        <TechnicalStackSection />
        <CollaboratingCTA />
      </div>

      <Footer data={{ copyright: "© {year} 0xfzz. Built with luvv.", tagline: "Architecting the future, one byte at a time." }} />
    </main>
  );
}
