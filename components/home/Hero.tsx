import Image from "next/image";
import { Button } from "@/components/ui/button";

import { DownloadCVButton } from "@/components/resume/DownloadCVButton";
import { HeroConfig } from "@/lib/types";
import { cn } from "@/lib/utils";



export function Hero({
  data,
  resumeData,
  resumeLabel,
  name,
  images
}: {
  data: HeroConfig;
  resumeData: any;
  resumeLabel: string;
  name: string;
  images: Record<string, string>;
}) {
  return (
    <section className="pt-20 pb-8 md:pt-24 md:pb-4">
      <div className="container mx-auto max-w-5xl px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 py-4 md:py-8">
        <div className="max-w-2xl text-left">
          <div className="flex flex-wrap items-end gap-x-5 ">
            {data.title.split(" ").map((word, index) => (
              <div key={index} className="flex items-end gap-3">
                {index === 2 && (
                  <div className="animate-float mb-3 md:mb-6">
                    <Image
                      className="rounded-2xl rotate-[-8deg] shadow-2xl w-[60px] h-auto md:w-[110px]"
                      src={images.hero || "/face.JPEG"}
                      alt="smile"
                      width={110}
                      height={140}
                      priority
                    />
                  </div>
                )}
                <h1 
                  className={cn(
                    "text-5xl md:text-8xl tracking-tight leading-[1.1] text-foreground",
                    index === 1 ? "font-normal" : "font-extrabold"
                  )}
                >
                  {word}
                </h1>
              </div>
            ))}
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-xl leading-relaxed">
            {data.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <DownloadCVButton data={resumeData} label={resumeLabel} />
          </div>
        </div>

        {/* <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border-subtle bg-muted text-ink-strong">
          <Image
            src={data.image}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div> */}
      </div>
    </section>
  );
}
