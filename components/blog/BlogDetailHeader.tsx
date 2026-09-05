import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CaretLeftIcon as CaretLeft, CalendarIcon as Calendar } from "@phosphor-icons/react/dist/ssr";

interface BlogDetailHeaderProps {
  tags: string[];
  date: string;
  title: string;
  image?: string;
}

export function BlogDetailHeader({ tags, date, title, image }: BlogDetailHeaderProps) {
  return (
    <div className="space-y-8 mb-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-bold text-foreground/60 hover:text-foreground transition-colors group"
      >
        <CaretLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" weight="duotone" />
        Back to Blog
      </Link>

      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight text-balance">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {tags.filter(tag => tag && tag.trim() !== "").map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              chip="tag"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground/60 whitespace-nowrap">
          <Calendar className="w-4 h-4" weight="duotone" />
          {date}
        </span>
      </div>

      {image && (
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border/40">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </div>
  );
}
