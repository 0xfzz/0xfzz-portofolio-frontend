import { ContactCard } from "@/components/contact/ContactCard";
import { 
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
  MessageSquare, 
  Send,
  LucideIcon 
} from "lucide-react";
import { getContactData, getSiteConfig } from "@/lib/content";
import { notFound } from "next/navigation";

const ICON_MAP: Record<string, LucideIcon> = {
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
  Discord: MessageSquare,
  Telegram: Send,
};

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();

  if (siteConfig.visibility?.contact === false) {
    notFound();
  }

  const contactData = await getContactData();

  return (
    <div className="pt-40 pb-24 container mx-auto px-4 max-w-5xl">
      <div className="text-center space-y-6 mb-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#323235]">
          {contactData.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {contactData.subtitle}
        </p>
      </div>

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
    </div>
  );
}
