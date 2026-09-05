import React from "react";

interface ContactCardProps {
  icon: React.ElementType;
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
      className="group block p-6 bg-white rounded-2xl border border-border-subtle text-center"
    >
      <div className="w-16 h-16 bg-tile rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-foreground transition-colors duration-500">
        <Icon className="w-8 h-8 text-foreground group-hover:text-white transition-colors duration-500" weight="duotone" />
      </div>
      <h3 className="text-lg font-bold leading-tight text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">
        {subtext}
      </p>
    </a>
  );
}
