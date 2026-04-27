import React from "react";
import { IdentificationBadgeIcon } from "@phosphor-icons/react/dist/ssr";

interface AboutMeProps {
  summary: string;
}

export function AboutMe({ summary }: AboutMeProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-left w-full">
          <div className="flex items-center gap-4 mb-8">
            <IdentificationBadgeIcon size={40} weight="duotone" className="text-primary" />
            <h2 className="text-4xl md:text-[2.75rem] font-bold tracking-tight leading-tight text-foreground">
              About Me
            </h2>
          </div>
          <div className="text-muted-foreground text-lg leading-relaxed font-sans space-y-6 w-full">
            <p className="whitespace-pre-line">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
