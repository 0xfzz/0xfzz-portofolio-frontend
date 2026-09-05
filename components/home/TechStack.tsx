import { Badge } from "@/components/ui/badge";
import { 
  SquaresFourIcon as SquaresFour, 
  DatabaseIcon as Database, 
  CloudIcon as Cloud, 
  ShieldCheckIcon as ShieldCheck, 
  GaugeIcon as Gauge, 
  ChartBarIcon as ChartBar,
  CodeIcon as Code,
  TerminalIcon as Terminal, 
  CpuIcon as Cpu, 
  GlobeIcon as Globe, 
  DesktopTowerIcon as DesktopTower, 
  HardDriveIcon as HardDrive, 
  DeviceMobileIcon as DeviceMobile, 
  LayoutIcon as Layout, 
  PaletteIcon as Palette, 
  MagnifyingGlassIcon as MagnifyingGlass, 
  LockIcon as Lock, 
  LightningIcon as Lightning, 
  GearIcon as Gear, 
  PulseIcon as Pulse,
  InfinityIcon
} from "@phosphor-icons/react/dist/ssr";

const ICON_MAP: Record<string, React.ElementType> = {
  Layers: SquaresFour,
  Database,
  Cloud,
  ShieldCheck,
  Gauge,
  BarChart3: ChartBar,
  Code2: Code,
  Terminal,
  Cpu,
  Globe,
  Server: DesktopTower,
  HardDrive,
  Smartphone: DeviceMobile,
  Layout,
  Palette,
  Search: MagnifyingGlass,
  Lock,
  Zap: Lightning,
  Settings: Gear,
  Activity: Pulse,
  Infinity: InfinityIcon,
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
    <section id="tech-stack" className="py-10 md:py-14 bg-background">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        {/* Top Section: Heading + Subheading (Left) and Tech Chips (Right) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 md:mb-10">
          <div className="max-w-xl text-left">
            <h2 className="text-4xl md:text-[2.75rem] font-bold tracking-tight leading-tight text-foreground mb-4">
              {data.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {data.subtitle}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {data.skills.hard.filter(tech => tech && tech.trim() !== "").map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                chip="stack-lg"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bottom Section: Expertise Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.expertise.map((item) => {
            const Icon = ICON_MAP[item.icon] || SquaresFour;
            return (
              <div 
                key={item.title} 
                className="p-6 bg-white border border-border-subtle rounded-xl flex flex-col items-center justify-center text-center group"
              >
                <div className="mb-6">
                  <Icon className="w-8 h-8 text-foreground opacity-80" weight="duotone" />
                </div>
                <h3 className="text-sm font-bold text-foreground">
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
