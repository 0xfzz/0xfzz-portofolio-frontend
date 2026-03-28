import { Badge } from "@/components/ui/badge";

interface ProjectHeaderProps {
  title: string;
  category: string;
  description: string;
}

export function ProjectHeader({ title, category, description }: ProjectHeaderProps) {
  return (
    <header className="container mx-auto px-4 max-w-7xl py-12 md:py-20">
      <div className="space-y-6">
        <Badge variant="secondary" className="bg-[#B2BDC8]/40 text-[#323235] border-none px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm">
          {category}
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#323235] leading-tight max-w-4xl">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
    </header>
  );
}
