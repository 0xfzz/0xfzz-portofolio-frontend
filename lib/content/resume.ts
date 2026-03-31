import { Experience, Education, Award, ResumeData } from "../types";
import { getJsonFile } from "./core";
import { getSiteConfig, getContactData, getTechStackData } from "./config";

export const getExperiencesData = () => getJsonFile<Experience[]>("experiences/work-experiences.json");
export const getOtherExperiencesData = () => getJsonFile<Experience[]>("experiences/other-experiences.json");
export const getEducationData = () => getJsonFile<Education[]>("experiences/education.json");
export const getAwardsData = () => getJsonFile<Award[]>("experiences/awards.json");

export async function getResumeData(): Promise<ResumeData> {
  const [siteConfig, experiences, otherExperiences, education, awards, contact, techStack] = await Promise.all([
    getSiteConfig(),
    getExperiencesData(),
    getOtherExperiencesData(),
    getEducationData(),
    getAwardsData(),
    getContactData(),
    getTechStackData(),
  ]);

  return {
    name: siteConfig.metadata.name,
    title: siteConfig.hero.subtitle,
    contact,
    summary: siteConfig.hero.description,
    work: experiences,
    otherExperiences: otherExperiences,
    education,
    skills: techStack.skills,
    awards,
    label: "Download Resume",
  };
}
