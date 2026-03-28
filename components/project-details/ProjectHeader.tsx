import { Badge } from "@/components/ui/badge";

interface ProjectHeaderProps {
  title: string;
  category: string;
  description: string;
}

export function ProjectHeader({ title, category, description }: ProjectHeaderProps) {
  return (
    <div className="space-y-6 max-w-4xl">
      <Badge 
        variant="secondary" 
        className="bg-[#B2BDC8]/80 text-[#323235] hover:bg-[#B2BDC8] border-none px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm"
      >
        {category}
      </Badge>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#323235]">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
        {description}
      </p>
    </div>
  );
}
