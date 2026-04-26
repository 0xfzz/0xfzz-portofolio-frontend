import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

interface ProjectContentProps {
  technologies: string[];
  content: string;
}

export function ProjectContent({ technologies, content }: ProjectContentProps) {
  return (
    <div className="space-y-16">
      <div className="w-full">
        <MarkdownRenderer content={content} />
      </div>

      <section className="pt-8 border-t border-border/40">
        <h4 className="text-sm font-bold text-[#323235] uppercase tracking-wider opacity-80 mb-6">
          Technologies Leveraged
        </h4>
        <div className="flex flex-wrap gap-2">
          {technologies.filter(tech => tech && tech.trim() !== "").map((tech) => (
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
