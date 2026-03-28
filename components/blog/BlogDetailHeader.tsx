import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

interface BlogDetailHeaderProps {
  category: string;
  date: string;
  title: string;
}

export function BlogDetailHeader({ category, date, title }: BlogDetailHeaderProps) {
  return (
    <div className="space-y-8 mb-12">
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-[#323235] transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Badge 
            variant="secondary" 
            className="bg-[#B2BDC8]/80 text-[#323235] border-none px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm"
          >
            {category}
          </Badge>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            {date}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#323235] leading-[1.1]">
          {title}
        </h1>
      </div>
    </div>
  );
}
