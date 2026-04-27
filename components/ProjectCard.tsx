import Image from "next/image";
import Link from "next/link";
import { CodeIcon as Code } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "./ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  slug: string;
  technologies: string[];
}

export function ProjectCard({ title, description, image, slug, technologies }: ProjectCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-4 border border-border-subtle">
      {image && (
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-border-subtle">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {technologies.filter(tech => tech && tech.trim() !== "").slice(0, 1).map((tech) => (
              <Badge 
                key={tech}
                variant="secondary" 
                className="bg-[#B2BDC8] text-[#323235] border-none px-3 py-1 text-[12px] font-bold uppercase tracking-wider rounded-sm shadow-sm"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {!image && (
        <div className="mb-6 flex gap-2">
          {technologies.filter(tech => tech && tech.trim() !== "").slice(0, 1).map((tech) => (
            <Badge 
              key={tech}
              variant="secondary" 
              className="bg-[#B2BDC8] text-[#323235] border-none px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-sm"
            >
              {tech}
            </Badge>
          ))}
        </div>
      )}

      <div className="px-2 space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#323235] group-hover:text-black transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">
            {description}
          </p>
        </div>

        <div className="pt-4 border-t border-border/40">
          <Link 
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#323235] uppercase tracking-wider hover:gap-3 transition-all"
          >
            <Code className="w-4 h-4 opacity-70" weight="duotone" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
