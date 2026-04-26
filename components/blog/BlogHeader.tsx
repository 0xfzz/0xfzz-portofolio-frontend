import { Badge } from "@/components/ui/badge";
import { PageHeader } from "../layout/PageHeader";

interface BlogHeaderProps {
  title: string;
  subtitle: string;
  tags: string[];
  activeTag: string;
  onTagClick: (tag: string) => void;
}

export function BlogHeader({ title, subtitle, tags, activeTag, onTagClick }: BlogHeaderProps) {
  return (
    <PageHeader title={title} subtitle={subtitle}>
      <div className="flex flex-wrap gap-4">
        {tags.filter(tag => tag && tag.trim() !== "").map((tag) => (
          <Badge 
            key={tag}
            variant="secondary" 
            onClick={() => onTagClick(tag)}
            className={`
              px-5 py-2 text-xs font-bold rounded-md transition-all cursor-pointer border-none
              ${activeTag === tag 
                ? "bg-[#777E65] text-white" 
                : "bg-[#B2BDC8]/80 text-[#323235] hover:bg-[#B2BDC8]"
              }
            `}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </PageHeader>
  );
}
