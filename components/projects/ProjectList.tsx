"use client";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { TagFilterGrid } from "@/components/shared/TagFilterGrid";
import { TagFilterHeader } from "@/components/shared/TagFilterHeader";
import { Project } from "@/lib/content";

interface ProjectListProps {
  projects: Project[];
  uniqueTags: string[];
  title?: string;
  subtitle?: string;
}

export function ProjectList({
  projects,
  uniqueTags,
  title = "Projects That I've Made",
  subtitle = "A curated selection of technical challenges, experimental systems, and functional applications built with modern stacks.",
}: ProjectListProps) {
  return (
    <TagFilterGrid
      items={projects}
      uniqueTags={uniqueTags}
      getTags={p => p.technologies}
      getKey={p => p.slug}
      gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      emptyMessage="No projects found for this tag."
      header={(activeTag, onTagClick) => (
        <TagFilterHeader title={title} subtitle={subtitle} tags={uniqueTags} activeTag={activeTag} onTagClick={onTagClick} />
      )}
      renderItem={p => <ProjectCard {...p} />}
    />
  );
}
