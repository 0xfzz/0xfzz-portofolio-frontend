import { Badge } from "@/components/ui/badge";

interface BlogHeaderProps {
  title: string;
  subtitle: string;
}

const TAGS = ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "Networking"];

export function BlogHeader({ title, subtitle }: BlogHeaderProps) {
  return (
    <div className="space-y-10 mb-10">
      <div className="space-y-5">
        <h1 className="text-5xl md:text-[4.5rem] font-bold tracking-tight text-[#323235] leading-[1.1]">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        {TAGS.map((tag) => (
          <Badge 
            key={tag}
            variant="secondary" 
            className="bg-[#B2BDC8]/80 text-[#323235] border-none px-5 py-2 text-xs font-bold rounded-md"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
