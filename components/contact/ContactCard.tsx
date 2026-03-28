import { LucideIcon } from "lucide-react";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  subtext: string;
  href: string;
}

export function ContactCard({ icon: Icon, title, subtext, href }: ContactCardProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block p-10 bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-500 text-center border border-transparent hover:border-border/40"
    >
      <div className="w-16 h-16 bg-[#F8F9FA] rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#323235] transition-colors duration-500">
        <Icon className="w-8 h-8 text-[#323235] group-hover:text-white transition-colors duration-500" />
      </div>
      <h3 className="text-lg font-bold text-[#323235] mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground font-medium group-hover:text-[#323235] transition-colors">
        {subtext}
      </p>
    </a>
  );
}
