import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CaretLeftIcon as CaretLeft } from "@phosphor-icons/react/dist/ssr";

interface BlogDetailHeaderProps {
  tags: string[];
  date: string;
  title: string;
  image?: string;
}

export function BlogDetailHeader({ tags, date, title, image }: BlogDetailHeaderProps) {
  return (
    <div className="space-y-12 mb-16">
      <div className="max-w-4xl mx-auto space-y-8 px-4">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-bold text-[#323235]/60 hover:text-[#323235] transition-colors group"
        >
          <CaretLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" weight="duotone" />
          Back to Blog
        </Link>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {tags.filter(tag => tag && tag.trim() !== "").map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary" 
                  className="bg-[#B2BDC8]/40 text-[#323235] border-none px-3 py-1 text-[13px] font-bold uppercase tracking-wider rounded-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-sm font-bold text-[#323235]/60 uppercase tracking-widest whitespace-nowrap">
              {date}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#323235] leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {image && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border/40">
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
    </div>
  );
}
