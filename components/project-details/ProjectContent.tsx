import DOMPurify from "isomorphic-dompurify";

interface ProjectContentProps {
  technologies: string[];
  children: React.ReactNode;
}

export function ProjectContent({ technologies, children }: ProjectContentProps) {
  return (
    <div className="space-y-16">
      {/* 
        Tailwind 4 'prose' styles for the markdown content.
        We use prose-zinc to match the dark text, and prose-lg for editorial feel.
      */}
      <div className="prose prose-zinc prose-lg max-w-none 
        prose-headings:text-[#323235] 
        prose-headings:font-bold 
        prose-p:text-muted-foreground 
        prose-p:leading-relaxed 
        prose-strong:text-[#323235]
        prose-code:text-[#323235]
        prose-pre:bg-[#F3F4F6]
        prose-pre:text-[#323235]
        prose-pre:border
        prose-pre:border-border/50"
      >
        {children}
      </div>

      <section className="pt-8 border-t border-border/40">
        <h4 className="text-sm font-bold text-[#323235] uppercase tracking-wider opacity-80 mb-6">
          Technologies Leveraged
        </h4>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 bg-muted-foreground/15 text-muted-foreground text-[12px] font-bold rounded-md uppercase tracking-wide"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
