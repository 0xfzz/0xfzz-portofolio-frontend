import { Github, Linkedin, Dribbble } from "lucide-react";
import Link from "next/link";

interface FooterData {
  copyright: string;
  tagline: string;
}

export function Footer({ data }: { data?: FooterData }) {
  const currentYear = new Date().getFullYear();
  const copyrightText = data?.copyright.replace("{year}", currentYear.toString()) || `© ${currentYear} 0xfzz. Built with love.`;

  return (
    <footer className="py-12 border-t border-border/40">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="space-y-1">
          <p className="text-sm font-bold text-[#323235]">
            {copyrightText}
          </p>
          {data?.tagline && (
            <p className="text-xs text-muted-foreground">
              {data.tagline}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Dribbble className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" title="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
