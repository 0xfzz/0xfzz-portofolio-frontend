import { ExperienceItem } from "@/components/experiences/ExperienceItem";
import { EducationSection } from "@/components/experiences/EducationSection";
import { AwardsSection } from "@/components/experiences/AwardsSection";
import { CollaboratingCTA } from "@/components/CollaboratingCTA";
import { 
  getExperiencesData, 
  getSiteConfig, 
  getEducationData,
  getAwardsData
} from "@/lib/content";
import { notFound } from "next/navigation";

export default async function ExperiencesPage() {
  const siteConfig = await getSiteConfig();

  if (siteConfig.visibility?.experiences === false) {
    notFound();
  }

  const experiences = await getExperiencesData();
  const educationData = await getEducationData();
  const awardsData = await getAwardsData();

  return (
    <div className="pt-40 pb-24 container mx-auto px-4 max-w-5xl">
      <div className="space-y-12 mb-32">
        <div className="space-y-4 mb-20">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#323235]">
            {siteConfig.pages?.experiences?.title || "Experience"}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
            {siteConfig.pages?.experiences?.subtitle}
          </p>
        </div>

        <div className="mb-20">
          <h4 className="text-[0.75rem] font-extrabold tracking-widest text-[#323235] uppercase mb-10">
            {siteConfig.pages?.experiences?.sections?.work || "Work Experience"}
          </h4>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/40 before:to-transparent">
            {experiences.map((exp: any, index: number) => (
              <ExperienceItem key={index} {...exp} />
            ))}
          </div>
        </div>
      </div>

      <EducationSection 
        data={educationData} 
        title={siteConfig.pages?.experiences?.sections?.education}
      />
      <AwardsSection 
        data={awardsData} 
        title={siteConfig.pages?.experiences?.sections?.awards}
      />
      <CollaboratingCTA {...siteConfig.collaborating} />
    </div>
  );
}
