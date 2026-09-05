import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  date: string;
  tags: string[];
  title: string;
  description: string;
  slug: string;
}

export function BlogCard({ date, tags, title, description, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <div className="bg-border/10 border border-border/40 rounded-xl p-6 transition-all duration-300 group-hover:bg-border/20 hover:border-border-hover">
        <div className="space-y-4">
          {/* Meta line */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground/60 whitespace-nowrap">
              {date}
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {tags.filter(tag => tag && tag.trim() !== "").map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  chip="meta-tag"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {/* Title */}
            <h2 className="text-2xl font-bold tracking-tight text-foreground leading-tight group-hover:text-black transition-colors">
              {title}
            </h2>
            
            {/* Description */}
            <p className="text-foreground/70 text-base leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
