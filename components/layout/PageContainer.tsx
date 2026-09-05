import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "max-w-3xl" | "max-w-4xl" | "max-w-5xl" | "max-w-6xl" | "max-w-7xl" | "max-w-none";
}

export function PageContainer({ 
  children, 
  className, 
  maxWidth 
}: PageContainerProps) {
  return (
    <div className={cn(
      "pt-20 pb-12 md:pt-28 md:pb-16 container mx-auto max-w-5xl px-4 md:px-8",
      maxWidth,
      className
    )}>
      {children}
    </div>
  );
}
