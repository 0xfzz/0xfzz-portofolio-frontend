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
      "pt-24 pb-16 md:pt-40 md:pb-32 container mx-auto px-6 md:px-12 lg:px-16 min-h-[70vh]",
      maxWidth,
      className
    )}>
      {children}
    </div>
  );
}
