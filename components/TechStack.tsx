import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { 
  Layers, 
  Database, 
  Cloud, 
  ShieldCheck, 
  Gauge, 
  BarChart3 
} from "lucide-react";

const TECH_TAGS = [
  "TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "Networking"
];

const BENEFITS = [
  { title: "Microservices", icon: Layers },
  { title: "Distributed DB", icon: Database },
  { title: "Serverless", icon: Cloud },
  { title: "IAM & Auth", icon: ShieldCheck },
  { title: "Optimization", icon: Gauge },
  { title: "Observability", icon: BarChart3 },
];

export function TechStack() {
  return (
    <section id="tech-stack" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Top Section: Heading + Subheading (Left) and Tech Chips (Right) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-20">
          <div className="max-w-xl text-left">
            <h2 className="text-4xl md:text-[2.75rem] font-bold mb-4 tracking-tight leading-tight text-foreground">
              Core Tech Stack
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              My toolkit is focused on type-safety, modularity, and high-performance cloud infrastructure.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {TECH_TAGS.map((tech) => (
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
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={benefit.title} 
                className="p-8 bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg group"
              >
                <div className="mb-6">
                  <Icon className="w-8 h-8 text-[#323235] opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xs font-bold tracking-tight text-[#323235]">
                  {benefit.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
