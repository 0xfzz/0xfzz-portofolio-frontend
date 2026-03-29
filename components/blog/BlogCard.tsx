import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  date: string;
  tags: string[];
  title: string;
  excerpt: string;
  slug: string;
}

export function BlogCard({ date, tags, title, excerpt, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <div className="bg-[#E5E7EB]/10 border border-border/40 rounded-xl p-6 transition-all duration-300 group-hover:bg-[#E5E7EB]/20 hover:border-border-hover">
        <div className="space-y-4">
          {/* Meta line */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-[#323235]/60 whitespace-nowrap">
              {date}
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary" 
                  className="bg-[#B2BDC8]/40 text-[#323235] border-none px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-wider rounded-sm whitespace-nowrap"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#323235] leading-tight group-hover:text-black transition-colors">
              {title}
            </h2>
            
            {/* Excerpt */}
            <p className="text-[#323235]/70 text-base leading-relaxed line-clamp-2">
              {excerpt}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
