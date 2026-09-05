"use client";

import { BlogCard } from "./BlogCard";
import { TagFilterGrid } from "@/components/shared/TagFilterGrid";
import { TagFilterHeader } from "@/components/shared/TagFilterHeader";
import type { Article } from "@/lib/content";

interface BlogListProps {
  articles: Article[];
  uniqueTags: string[];
  title?: string;
  subtitle?: string;
}

export function BlogList({
  articles,
  uniqueTags,
  title = "Writing & Insights",
  subtitle = "Deep dives into software architecture, security research, and the future of distributed systems.",
}: BlogListProps) {
  return (
    <TagFilterGrid
      items={articles}
      uniqueTags={uniqueTags}
      getTags={a => a.tags}
      getKey={a => a.slug}
      gridClassName="grid grid-cols-1 gap-6"
      emptyMessage="No articles found for this tag."
      header={(activeTag, onTagClick) => (
        <TagFilterHeader title={title} subtitle={subtitle} tags={uniqueTags} activeTag={activeTag} onTagClick={onTagClick} />
      )}
      renderItem={a => <BlogCard {...a} />}
    />
  );
}
