// --- Core Configuration Types ---

export interface SiteMetadata {
  title: string;
  name: string;
  description: string;
}

export interface VisibilityConfig {
  projects?: boolean;
  experiences?: boolean;
  blog?: boolean;
  contact?: boolean;
  techStack?: boolean;
}

export interface NavigationConfig {
  home: string;
  projects: string;
  experiences: string;
  blog: string;
  contact: string;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
}

export interface FooterConfig {
  copyright: string;
  tagline: string;
  contactCount?: number;
}

export interface SiteConfig {
  metadata: SiteMetadata;
  visibility: VisibilityConfig;
  navigation: NavigationConfig;
  hero: HeroConfig;
  footer: FooterConfig;
  pages: {
    home?: {
      projects?: {
        title: string;
        subtitle: string;
        viewAllLabel: string;
      };
    };
    projects?: {
      title: string;
      subtitle: string;
      emptyState?: string;
    };
    blog?: {
      title: string;
      subtitle: string;
      emptyState?: string;
    };
    experiences?: {
      title: string;
      subtitle: string;
      sections: {
        work: string;
        other: string;
        education: string;
        awards: string;
      };
    };
  };
}

// --- Content Types ---

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
  location?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export interface Award {
  title: string;
  date: string;
  issuer: string;
  description: string;
}

export interface ContactMethod {
  platform: string;
  label: string;
  href: string;
  icon: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  methods: ContactMethod[];
}

export interface TechSkillGroup {
  hard: string[];
  soft: string[];
  tools: string[];
}

export interface TechExpertise {
  title: string;
  icon: string;
}

export interface TechStackData {
  title: string;
  subtitle: string;
  skills: TechSkillGroup;
  expertise: TechExpertise[];
}

export interface Article {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  image?: string;
  description: string;
  body: string;
  published?: boolean;
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  slug: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  body: string;
  published?: boolean;
}

// --- Aggregated Types ---

export interface ResumeData {
  name: string;
  title: string;
  contact: ContactData;
  summary: string;
  work: Experience[];
  otherExperiences: Experience[];
  education: Education[];
  skills: TechSkillGroup;
  awards: Award[];
  label?: string; // Optional label for call-to-action buttons
}
