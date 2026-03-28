import { Button } from "./ui/button";
import { Download } from "lucide-react";

interface CollaboratingCTAProps {
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
}

export function CollaboratingCTA({ 
  title, 
  description, 
  primaryActionLabel, 
  secondaryActionLabel 
}: CollaboratingCTAProps) {
  return (
    <div className="bg-[#E5E7EB]/40 rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="max-w-md text-center lg:text-left">
        <h3 className="text-2xl font-bold text-[#323235] mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Button className="bg-[#777E65] hover:bg-[#777E65]/90 text-white gap-2 px-8 h-12 text-sm font-bold rounded-lg shadow-sm border-none">
          <Download className="w-4 h-4" />
          {primaryActionLabel}
        </Button>
        <Button variant="outline" className="bg-white hover:bg-white/90 border-none text-[#323235] px-8 h-12 text-sm font-bold rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
          {secondaryActionLabel}
        </Button>
      </div>
    </div>
  );
}
