import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "font-bold tracking-tight text-foreground flex items-center gap-2 group",
        className
      )}
    >
      <span 
        className="font-mono text-base md:text-lg" 
        style={{ fontFamily: 'var(--font-fira-code), monospace' }}
      >
        0xfzz
      </span>
      <span className="font-extralight text-muted-foreground/30">|</span>
      <span 
        className="font-mono text-base md:text-lg" 
        style={{ fontFamily: 'var(--font-fira-code), monospace' }}
      >
        Faiz Nurdiana
      </span>
    </Link>
  );
}
