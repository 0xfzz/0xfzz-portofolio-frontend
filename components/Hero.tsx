import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, ExternalLink } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl text-left">
          <Badge variant="secondary" className="mb-4 uppercase tracking-widest px-3 py-1 text-[10px] font-bold bg-muted-foreground/20 text-muted-foreground border-none">
            Available For Work
          </Badge>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight leading-[1.1] text-foreground">
            Hello, I&apos;m Faiz Nurdiana
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
            Hi, I&apos;m Faiz Nurdiana (0xfzz) a Web Developer and Cybersecurity Enthusiast based in Yogyakarta. 
            Currently a student at Universitas Teknologi Yogyakarta.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="secondary" className="rounded-md gap-2 px-8 font-semibold">
              <Download className="w-4 h-4" />
              Download CV
            </Button>
            <Button variant="accent" size="lg" className="rounded-md gap-2 px-8 font-semibold bg-accent">
              View Portfolio
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-700 ring-1 ring-border/50 bg-muted">
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
