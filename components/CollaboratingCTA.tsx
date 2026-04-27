import { Button } from "./ui/button";

import Link from "next/link";
import { DownloadCVButton } from "./resume/DownloadCVButton";

interface CollaboratingCTAProps {
  title?: string;
  description?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  resumeData?: any;
}

export function CollaboratingCTA({ 
  title = "Interested in collaborating?", 
  description = "I am always open to discussing architecture or potential leadership opportunities.", 
  primaryActionLabel = "Download Resume", 
  secondaryActionLabel = "Get in Touch",
  resumeData
}: CollaboratingCTAProps) {
  return (
    <div className="bg-[#E5E7EB]/40 rounded-2xl p-8 md:p-12 border border-border-subtle flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="max-w-md text-center lg:text-left">
        <h3 className="text-2xl font-bold text-[#323235] mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <DownloadCVButton 
          data={resumeData} 
          label={primaryActionLabel} 
          variant="default"
          size="lg"
          className="bg-[#777E65] hover:bg-[#777E65]/90 text-white px-8 h-12 text-sm font-bold rounded-lg border-none" 
        />
        <Link href="/contact" passHref>
          <Button variant="outline" className="bg-white hover:bg-white/90 border border-border-subtle text-[#323235] px-8 h-12 text-sm font-bold rounded-lg w-full sm:w-auto">
            {secondaryActionLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
