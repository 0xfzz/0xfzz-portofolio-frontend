import React from "react";

interface AboutMeProps {
  summary: string;
}

export function AboutMe({ summary }: AboutMeProps) {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <div className="text-left w-full">
          <h2 className="text-4xl md:text-[2.75rem] font-bold tracking-tight leading-tight text-foreground mb-8">
            About Me
          </h2>
          <div className="text-muted-foreground text-lg leading-relaxed space-y-6 w-full">
            <p className="whitespace-pre-line">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
