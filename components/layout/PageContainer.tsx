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
      "pt-32 pb-24 md:pt-48 md:pb-32 container mx-auto px-4",
      maxWidth,
      className
    )}>
      {children}
    </div>
  );
}
