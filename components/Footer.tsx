import { 
  GithubLogo as Github, 
  LinkedinLogo as Linkedin, 
  Envelope as Mail, 
  TwitterLogo as Twitter, 
  GlobeIcon as Globe, 
  DribbbleLogo as Dribbble 
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface FooterData {
  copyright: string;
  tagline: string;
  contactCount?: number;
}

interface ContactMethod {
  platform: string;
  label: string;
  href: string;
  icon: string;
}

interface FooterProps {
  data?: FooterData;
  contacts?: ContactMethod[];
  visibility?: {
    projects?: boolean;
    experiences?: boolean;
    blog?: boolean;
    contact?: boolean;
  };
}

const IconMap: { [key: string]: any } = {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Globe,
  Dribbble
};

export function Footer({ data, contacts = [], visibility }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText = data?.copyright.replace("{year}", currentYear.toString()) || `© ${currentYear} 0xfzz. Built with love.`;

  // Slice contacts based on the configuration (default to 3 if not set)
  const displayContacts = contacts.slice(0, data?.contactCount || 3);

  return (
    <footer className="py-12 border-t border-border/40">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="space-y-1">
          <p className="text-sm font-bold text-[#323235]">
            {copyrightText}
          </p>
          {data?.tagline && (
            <div className="text-[10px] text-muted-foreground flex items-center justify-center md:justify-start gap-2 h-4">
              <span>{data.tagline}</span>
              <span className="opacity-40">•</span>
              <div className="flex items-center gap-1.5 font-mono opacity-60">
                <span title="Frontend Hash" className="flex items-center gap-0.5">
                  <span className="text-[8px] opacity-50 uppercase">f:</span>
                  <span>{process.env.NEXT_PUBLIC_COMMIT_HASH}</span>
                </span>
                <span className="opacity-20">/</span>
                <span title="Content Hash" className="flex items-center gap-0.5">
                  <span className="text-[8px] opacity-50 uppercase">c:</span>
                  <span>{process.env.NEXT_PUBLIC_CONTENT_COMMIT_HASH}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          {displayContacts.map((contact) => {
            const IconComponent = IconMap[contact.icon] || Globe;
            return (
              <Link
                key={contact.platform}
                href={contact.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title={contact.platform}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconComponent className="w-5 h-5" weight="duotone" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
