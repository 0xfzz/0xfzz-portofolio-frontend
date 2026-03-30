"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { DownloadCVButton } from "./resume/DownloadCVButton";

import { usePathname } from "next/navigation";

interface NavbarProps {
  title: string;
  navigation: {
    home: string;
    projects: string;
    experiences: string;
    blog: string;
    contact: string;
  };
  visibility?: {
    projects?: boolean;
    experiences?: boolean;
    blog?: boolean;
    contact?: boolean;
  };
  resumeData: any;
}

export function Navbar({ title, navigation, visibility, resumeData }: NavbarProps) {
  const pathname = usePathname();

  const NAV_LINKS = [
    { label: navigation.home, href: "/" },
    { label: navigation.projects, href: "/projects" },
    { label: navigation.experiences, href: "/experiences" },
    { label: navigation.blog, href: "/blog" },
    { label: navigation.contact, href: "/contact" },
  ];

  const activeLinks = NAV_LINKS.filter(link => {
    if (link.href === "/") return true;
    if (link.href === "/projects") return visibility?.projects !== false;
    if (link.href === "/experiences") return visibility?.experiences !== false;
    if (link.href === "/blog") return visibility?.blog !== false;
    if (link.href === "/contact") return visibility?.contact !== false;
    return true;
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground font-mono"
          style={{ fontFamily: 'var(--font-fira-code), monospace' }}
        >
          0xfzz
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {activeLinks.map((link) => {
            // Home is only active if the pathname is exactly /
            // Exceptions: /#projects (anchors on the home page)
            const isActive = link.href === "/"
              ? pathname === "/"
              : link.href.startsWith("/#")
                ? false // Don't highlight hash-only links as "active" in the nav by default
                : pathname === link.href || pathname?.startsWith(link.href + "/");

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-1",
                  isActive
                    ? "text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#323235]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <DownloadCVButton
          data={resumeData}
          label={resumeData.label}
          size="sm"
          variant="secondary"
          showIcon={false}
        />
      </div>
    </nav>
  );
}
