import { Button } from "@/components/ui/button";
import { ExternalLink, Code2 } from "lucide-react";

interface ProjectSidebarProps {
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectSidebar({ liveUrl, githubUrl }: ProjectSidebarProps) {
  return (
    <div className="space-y-6">
      <h4 className="text-sm font-bold text-[#323235] uppercase tracking-wider opacity-80">
        Core Actions
      </h4>
      <div className="flex flex-col gap-3">
        <Button className="w-full bg-[#777E65] hover:bg-[#777E65]/90 text-white gap-2 h-12 font-bold rounded-lg border-none justify-between px-4">
          <span>Live Demo</span>
          <ExternalLink className="w-4 h-4 opacity-70" />
        </Button>
        <Button variant="outline" className="w-full bg-white hover:bg-[#F9F9F9] text-[#323235] border border-[#E5E7EB] gap-2 h-12 font-bold rounded-lg justify-between px-4">
          <span>Source Code</span>
          <Code2 className="w-4 h-4 opacity-70" />
        </Button>
      </div>
    </div>
  );
}
