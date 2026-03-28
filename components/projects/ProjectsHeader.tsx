import { Badge } from "@/components/ui/badge";

interface ProjectsHeaderProps {
  title: string;
  subtitle: string;
  tags: string[];
  activeTag: string;
  onTagClick: (tag: string) => void;
}

export function ProjectsHeader({ title, subtitle, tags, activeTag, onTagClick }: ProjectsHeaderProps) {
  return (
    <div className="space-y-10 mb-10">
      <div className="space-y-5">
        <h1 className="text-4xl md:text-[4.5rem] font-bold tracking-tight text-[#323235] leading-[1.1]">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        {tags.map((tag) => (
          <Badge 
            key={tag}
            variant="secondary" 
            onClick={() => onTagClick(tag)}
            className={`
              px-5 py-2 text-xs font-bold rounded-md transition-all cursor-pointer border-none
              ${activeTag === tag 
                ? "bg-[#777E65] text-white" 
                : "bg-[#B2BDC8]/80 text-[#323235] hover:bg-[#B2BDC8]"
              }
            `}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
