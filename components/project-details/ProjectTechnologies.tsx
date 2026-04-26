import { Badge } from "@/components/ui/badge";

interface ProjectTechnologiesProps {
  technologies: string[];
}

export function ProjectTechnologies({ technologies }: ProjectTechnologiesProps) {
  return (
    <div className="pt-16 border-t border-border/40 w-full">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] block mb-6">
        Technologies Leveraged
      </span>
      <div className="flex flex-wrap gap-3">
        {technologies.filter(tech => tech && tech.trim() !== "").map((tech) => (
          <Badge 
            key={tech}
            variant="secondary" 
            className="bg-[#B2BDC8]/80 text-[#323235] hover:bg-[#B2BDC8] border-none px-4 py-1.5 text-xs font-bold rounded-xl"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}
