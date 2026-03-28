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
        <h4 className="text-[10px] font-extrabold text-[#323235] uppercase tracking-[0.2em] opacity-40 mb-6">
          Technologies Leveraged
        </h4>
        <div className="flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <span 
              key={tech}
              className="px-4 py-2 bg-[#E9F0FA] text-[#4A72B2] text-xs font-bold rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
