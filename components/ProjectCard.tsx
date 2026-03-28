import Image from "next/image";
import Link from "next/link";
import { MoveRight, Code2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  category: "Open Source" | "Public" | "Private";
}

export function ProjectCard({ title, description, image, slug, category }: ProjectCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-500 border border-transparent hover:border-border/40">
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-border/10">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <Badge 
            variant="secondary" 
            className="bg-[#B2BDC8] text-[#323235] border-none px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-sm"
          >
            {category}
          </Badge>
        </div>
      </div>

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
            className="inline-flex items-center gap-2 text-xs font-bold text-[#323235] uppercase tracking-widest hover:gap-3 transition-all"
          >
            <Code2 className="w-4 h-4 opacity-70" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
