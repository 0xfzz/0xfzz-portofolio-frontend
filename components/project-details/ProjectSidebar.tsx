import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectSidebarProps {
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectSidebar({ liveUrl, githubUrl }: ProjectSidebarProps) {
  return (
    <div className="space-y-6 sticky top-24">
      <div className="space-y-3">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] block mb-4">
          Core Actions
        </span>
        <Button 
          className="w-full justify-between bg-[#777E65] hover:bg-[#666C57] text-[#FCF8F9] rounded-sm py-6 font-bold"
          asChild
        >
          <a href={liveUrl || "#"} target="_blank" rel="noopener noreferrer">
            Live Demo
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
        <Button 
          variant="outline"
          className="w-full justify-between border-border/60 rounded-sm py-6 font-bold text-[#4A5568]"
          asChild
        >
          <a href={githubUrl || "#"} target="_blank" rel="noopener noreferrer">
            Source Code
            <Github className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
