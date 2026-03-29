import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ 
  title, 
  subtitle, 
  children, 
  className 
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4 mb-20", className)}>
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#323235] leading-[1.1]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="pt-2">
          {children}
        </div>
      )}
    </div>
  );
}
