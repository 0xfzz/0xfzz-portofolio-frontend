import React from "react";

interface AboutMeProps {
  summary: string;
}

export function AboutMe({ summary }: AboutMeProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-left w-full">
          <h2 className="text-4xl md:text-[2.75rem] font-bold mb-8 tracking-tight leading-tight text-foreground">
            About Me
          </h2>
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
