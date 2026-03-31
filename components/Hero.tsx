import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, ExternalLink } from "lucide-react";
import { DownloadCVButton } from "./resume/DownloadCVButton";

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
}

export function Hero({ data, resumeData, resumeLabel }: { data: HeroData; resumeData: any; resumeLabel: string }) {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl text-left">
          <Badge variant="secondary" className="mb-4 uppercase tracking-wider px-3 py-1 text-[11px] font-bold bg-olive-500/10 text-olive-600 border border-olive-500/20 rounded-none">
            {data.subtitle}
          </Badge>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight leading-[1.1] text-foreground">
            {data.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
            {data.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <DownloadCVButton data={resumeData} label={resumeLabel} />
          </div>
        </div>

        <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border-subtle bg-muted text-[#121212]">
          <Image
            src="https://picsum.photos/seed/faiz/800/1000"
            alt="Faiz Nurdiana"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
