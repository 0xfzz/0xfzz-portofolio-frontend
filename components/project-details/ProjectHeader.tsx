import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProjectHeaderProps {
  title: string;
  technologies: string[];
  description: string;
  image?: string;
}

export function ProjectHeader({ title, technologies, description, image }: ProjectHeaderProps) {
  return (
    <header className="container mx-auto px-4 max-w-7xl py-12 md:py-20">
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-[#B2BDC8]/40 text-[#323235] border-none px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm">
              {tech}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#323235] leading-tight max-w-4xl">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>

      {image && (
        <div className="mt-16 container mx-auto max-w-5xl">
          <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-border/50">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}
    </header>
  );
}
