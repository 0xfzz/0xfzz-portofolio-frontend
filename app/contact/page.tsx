import { ContactCard } from "@/components/contact/ContactCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Github, Linkedin, Mail, LucideIcon } from "lucide-react";
import { getContactData } from "@/lib/content";

const ICON_MAP: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Mail,
};

export default async function ContactPage() {
  const contactData = await getContactData();

  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
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

      <Footer data={{ copyright: "© {year} 0xfzz. Built with luvv.", tagline: "Architecting the future, one byte at a time." }} />
    </main>
  );
}
