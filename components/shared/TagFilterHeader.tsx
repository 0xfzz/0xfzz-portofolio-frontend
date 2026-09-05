import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/PageHeader";

interface TagFilterHeaderProps {
  title: string;
  subtitle: string;
  tags: string[];
  activeTag: string;
  onTagClick: (tag: string) => void;
}

export function TagFilterHeader({ title, subtitle, tags, activeTag, onTagClick }: TagFilterHeaderProps) {
  return (
    <PageHeader title={title} subtitle={subtitle}>
      <div className="flex flex-wrap gap-4">
        {tags.filter(tag => tag && tag.trim() !== "").map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            chip={activeTag === tag ? "filter-active" : "filter-inactive"}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </PageHeader>
  );
}
