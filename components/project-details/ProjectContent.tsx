import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

interface ProjectContentProps {
  technologies: string[];
  content: string;
}

export function ProjectContent({ technologies, content }: ProjectContentProps) {
  return (
    <div className="space-y-8">
      <div className="w-full">
        <MarkdownRenderer content={content} />
      </div>

      <section className="pt-6 border-t border-border/40">
        <h4 className="text-sm font-bold text-foreground mb-4">
          Technologies Leveraged
        </h4>
        <div className="flex flex-wrap gap-2">
          {technologies.filter(tech => tech && tech.trim() !== "").map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 bg-muted-foreground/15 text-muted-foreground text-[12px] font-bold rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
