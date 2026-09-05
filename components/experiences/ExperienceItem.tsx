import { Badge } from "@/components/ui/badge";

interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export function ExperienceItem({ role, company, period, description, tags }: ExperienceItemProps) {
  return (
    <div className="group">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3 className="text-2xl font-bold tracking-tight leading-tight text-foreground">{role}</h3>
          <span className="text-muted-foreground font-medium text-sm">{company}</span>
        </div>
        <span className="text-muted-foreground text-sm font-medium whitespace-nowrap">
          {period}
        </span>
      </div>
      
      <ul className="space-y-4 mb-8">
        {description.filter(point => point && point.trim() !== "").map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed text-[0.95rem]">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-chip shrink-0" />
            {point}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {tags.filter(tag => tag && tag.trim() !== "").map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            chip="experience"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
