import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

interface BlogDetailHeaderProps {
  tags: string[];
  date: string;
  title: string;
  image: string;
}

export function BlogDetailHeader({ tags, date, title, image }: BlogDetailHeaderProps) {
  return (
    <div className="space-y-12 mb-16 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-[#323235] transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary" 
                  className="bg-[#B2BDC8]/80 text-[#323235] border-none px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              {date}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-[#323235] leading-[1.05]">
            {title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl">
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
    </div>
  );
}
