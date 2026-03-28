import { Github, Linkedin, Dribbble } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/40">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} 0xfzz. Built with love.
        </p>
        
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
