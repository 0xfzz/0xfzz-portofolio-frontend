import { SiteConfig, ContactData, TechStackData } from "../types";
import { getJsonFile } from "./core";

export function validateSiteConfig(config: SiteConfig) {
  if (!config.metadata?.title) throw new Error("Missing 'metadata.title' in site-config.json");
  if (!config.navigation) throw new Error("Missing 'navigation' object in site-config.json");
  if (!config.hero?.title) throw new Error("Missing 'hero.title' in site-config.json");
  if (!config.images) throw new Error("Missing 'images' object in site-config.json");
}

export const getSiteConfig = async (): Promise<SiteConfig> => {
  const config = await getJsonFile<SiteConfig>("site-config.json");
  validateSiteConfig(config);
  return config;
};

export const getContactData = () => getJsonFile<ContactData>("contact.json");
export const getTechStackData = () => getJsonFile<TechStackData>("tech-stack.json");
