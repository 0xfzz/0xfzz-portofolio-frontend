"use client";

import { useState } from "react";
import { BlogCard } from "./BlogCard";
import { BlogHeader } from "./BlogHeader";
import { Article } from "@/lib/content";

interface BlogListProps {
  articles: Article[];
  uniqueTags: string[];
}

export function BlogList({ articles, uniqueTags }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredArticles = selectedTag === "All" 
    ? articles 
    : articles.filter(article => article.tags.includes(selectedTag));

  return (
    <>
      <BlogHeader 
        title="Writing & Insights"
        subtitle="Deep dives into software architecture, security research, and the future of distributed systems."
        tags={uniqueTags}
        activeTag={selectedTag}
        onTagClick={setSelectedTag}
      />

      <div className="grid grid-cols-1 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <BlogCard key={article.slug} {...article} />
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No articles found for this tag.</p>
          </div>
        )}
      </div>
    </>
  );
}
