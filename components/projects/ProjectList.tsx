"use client";

import { useState } from "react";
import { ProjectCard } from "../ProjectCard";
import { ProjectsHeader } from "./ProjectsHeader";
import { Project } from "@/lib/content";

interface ProjectListProps {
  projects: Project[];
  uniqueTags: string[];
}

export function ProjectList({ projects, uniqueTags }: ProjectListProps) {
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredProjects = selectedTag === "All" 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedTag));

  return (
    <>
      <ProjectsHeader 
        title="Projects That I've Made"
        subtitle="A curated selection of technical challenges, experimental systems, and functional applications built with modern stacks."
        tags={uniqueTags}
        activeTag={selectedTag}
        onTagClick={setSelectedTag}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-muted-foreground">No projects found for this tag.</p>
          </div>
        )}
      </div>
    </>
  );
}
