import { ExperienceItem } from "@/components/experiences/ExperienceItem";
import { EducationSection } from "@/components/experiences/EducationSection";
import { AwardsSection } from "@/components/experiences/AwardsSection";
import { CollaboratingCTA } from "@/components/CollaboratingCTA";
import { 
  getExperiencesData, 
  getOtherExperiencesData,
  getSiteConfig, 
  getEducationData,
  getAwardsData,
  getResumeData
} from "@/lib/content";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: `Experiences | ${siteConfig.metadata.name}`,
    description: siteConfig.pages?.experiences?.subtitle || `Explore the professional journey of ${siteConfig.metadata.name}.`,
    alternates: {
      canonical: 'https://www.0xfzz.my.id/experiences',
    },
  };
}

export default async function ExperiencesPage() {
  const siteConfig = await getSiteConfig();

  if (siteConfig.visibility?.experiences === false) {
    notFound();
  }

  const experiences = await getExperiencesData();
  const otherExperiences = await getOtherExperiencesData();
  const educationData = await getEducationData();
  const awardsData = await getAwardsData();
  const resumeData = await getResumeData();

  return (
    <PageContainer>
      <div className="space-y-12 mb-32">
        <PageHeader 
          title={siteConfig.pages?.experiences?.title || "Experience"}
          subtitle={siteConfig.pages?.experiences?.subtitle}
        />

        <div className="mb-20">
          <h4 className="text-sm font-bold tracking-wider text-[#323235] uppercase mb-10">
            {siteConfig.pages?.experiences?.sections?.work || "Work Experience"}
          </h4>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/40 before:to-transparent">
            {experiences.map((exp: any, index: number) => (
              <ExperienceItem key={index} {...exp} />
            ))}
          </div>
        </div>

        {otherExperiences.length > 0 && (
          <div className="mb-20">
            <h4 className="text-sm font-bold tracking-wider text-[#323235] uppercase mb-10">
              {siteConfig.pages?.experiences?.sections?.other || "Other Experience"}
            </h4>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/40 before:to-transparent">
              {otherExperiences.map((exp: any, index: number) => (
                <ExperienceItem key={index} {...exp} />
              ))}
            </div>
          </div>
        )}
      </div>

      <EducationSection 
        data={educationData} 
        title={siteConfig.pages?.experiences?.sections?.education}
      />
      <AwardsSection 
        data={awardsData} 
        title={siteConfig.pages?.experiences?.sections?.awards}
      />
      <CollaboratingCTA resumeData={resumeData} />
    </PageContainer>
  );
}
