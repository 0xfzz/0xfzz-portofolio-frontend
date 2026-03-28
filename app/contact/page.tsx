import { ContactCard } from "@/components/contact/ContactCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Github, Linkedin, Mail } from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: Github,
    title: "GitHub",
    subtext: "View Repositories",
    href: "https://github.com/0xfzz",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    subtext: "Professional Network",
    href: "https://linkedin.com/in/0xfzz",
  },
  {
    icon: Mail,
    title: "Email",
    subtext: "hello@architect.logic",
    href: "mailto:hello@architect.logic",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FCF8F9]">
      <Navbar />
      
      <div className="pt-40 pb-24 container mx-auto px-4 max-w-5xl">
        <div className="text-center space-y-6 mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#323235]">
            Let&apos;s Connect
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            I&apos;m currently open to new opportunities and technical collaborations. 
            Reach out using the form below or through my digital outposts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTACT_METHODS.map((method) => (
            <ContactCard key={method.title} {...method} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
