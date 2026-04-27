import { Button } from "@/components/ui/button";
import { ArrowSquareOutIcon as ExternalLink, CodeIcon as Code } from "@phosphor-icons/react/dist/ssr";

interface ProjectSidebarProps {
  liveUrl?: string;
  sourceUrl?: string;
}

export function ProjectSidebar({ liveUrl, sourceUrl }: ProjectSidebarProps) {
  return (
    <div className="space-y-6">
      <h4 className="text-sm font-bold text-[#323235] uppercase tracking-wider opacity-80">
        Core Actions
      </h4>
      <div className="flex flex-col gap-3">
        {liveUrl && (
          <Button asChild className="w-full bg-[#777E65] hover:bg-[#777E65]/90 text-white gap-2 h-12 font-bold rounded-lg border-none justify-between px-4">
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <span>Live Demo</span>
              <ExternalLink className="w-4 h-4 opacity-70" weight="duotone" />
            </a>
          </Button>
        )}
        {sourceUrl && (
          <Button asChild variant="outline" className="w-full bg-white hover:bg-[#F9F9F9] text-[#323235] border border-[#E5E7EB] gap-2 h-12 font-bold rounded-lg justify-between px-4">
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
              <span>Source Code</span>
              <Code className="w-4 h-4 opacity-70" weight="duotone" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
