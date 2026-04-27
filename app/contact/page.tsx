import { ContactCard } from "@/components/contact/ContactCard";
import { 
  GithubLogo as Github, 
  LinkedinLogo as Linkedin, 
  Envelope as Mail, 
  TwitterLogo as Twitter, 
  InstagramLogo as Instagram, 
  FacebookLogo as Facebook, 
  YoutubeLogo as Youtube, 
  TwitchLogo as Twitch, 
  DribbbleLogo as Dribbble, 
  FigmaLogo as Figma, 
  GlobeIcon as Globe, 
  DiscordLogo as Discord, 
  PaperPlaneTilt as Send
} from "@phosphor-icons/react/dist/ssr";
import { getContactData, getSiteConfig } from "@/lib/content";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";

const ICON_MAP: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Twitch,
  Dribbble,
  Figma,
  Globe,
  Discord,
  Telegram: Send,
};

import { PageHeader } from "@/components/layout/PageHeader";

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();

  if (siteConfig.visibility?.contact === false) {
    notFound();
  }

  const contactData = await getContactData();

  return (
    <PageContainer>
      <PageHeader 
        title={contactData.title}
        subtitle={contactData.subtitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contactData.methods.map((method: any) => {
          const Icon = ICON_MAP[method.icon] || Mail;
          return (
            <ContactCard 
              key={method.platform} 
              icon={Icon}
              title={method.platform}
              subtext={method.label}
              href={method.href}
            />
          );
        })}
      </div>
    </PageContainer>
  );
}
