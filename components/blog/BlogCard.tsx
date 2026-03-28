import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  date: string;
  tags: string[];
  title: string;
  slug: string;
}

export function BlogCard({ date, tags, title, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <div className="bg-white border border-border-subtle rounded-lg p-5 group-hover:bg-[#F9FAFB]">
        <div className="space-y-1.5">
          {/* Meta line */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-medium text-muted-foreground/80 whitespace-nowrap">
              {date}
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary" 
                  className="bg-[#B2BDC8]/50 text-[#323235] border-none px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-sm whitespace-nowrap"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-[1.65rem] font-bold tracking-tight text-[#323235] leading-tight group-hover:text-black transition-colors">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
