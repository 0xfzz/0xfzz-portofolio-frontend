import { Badge } from "./ui/badge";
import { 
  Layers, 
  Database, 
  Cloud, 
  ShieldCheck, 
  Gauge, 
  BarChart3,
  LucideIcon
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Database,
  Cloud,
  ShieldCheck,
  Gauge,
  BarChart3,
};

interface TechStackProps {
  data: {
    title: string;
    subtitle: string;
    skills: {
      hard: string[];
      soft: string[];
      tools: string[];
    };
    expertise: {
      title: string;
      icon: string;
    }[];
  }
}

export function TechStack({ data }: TechStackProps) {
  return (
    <section id="tech-stack" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Top Section: Heading + Subheading (Left) and Tech Chips (Right) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-20">
          <div className="max-w-xl text-left">
            <h2 className="text-4xl md:text-[2.75rem] font-bold mb-4 tracking-tight leading-tight text-foreground">
              {data.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {data.subtitle}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {data.skills.hard.map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="px-6 py-3 text-sm font-bold bg-[#B2BDC8]/80 text-[#323235] border-none rounded-xl"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bottom Section: Expertise Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.expertise.map((item) => {
            const Icon = ICON_MAP[item.icon] || Layers;
            return (
              <div 
                key={item.title} 
                className="p-8 bg-white border border-border-subtle rounded-xl flex flex-col items-center justify-center text-center group"
              >
                <div className="mb-6">
                  <Icon className="w-8 h-8 text-[#323235] opacity-80" />
                </div>
                <h3 className="text-xs font-bold tracking-tight text-[#323235]">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
