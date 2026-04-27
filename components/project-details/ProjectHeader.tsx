import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";

interface ProjectHeaderProps {
  title: string;
  technologies: string[];
  description: string;
  image?: string;
}

export function ProjectHeader({ title, technologies, description, image }: ProjectHeaderProps) {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20">
      <div className="space-y-6">
        <Link 
          href="/projects"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-[#1a1a1a] transition-colors mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" weight="duotone" />
          Back to Projects
        </Link>
        <div className="flex gap-2 flex-wrap">
          {technologies.filter(tech => tech && tech.trim() !== "").map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-[#B2BDC8]/40 text-[#323235] border-none px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-sm">
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
        <div className="mt-16 w-full max-w-6xl mx-auto">
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
