import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingHeaderProps {
  className?: string;
  hasSubtitle?: boolean;
  hasChildren?: boolean;
}

export function LoadingHeader({ 
  className,
  hasSubtitle = true,
  hasChildren = false
}: LoadingHeaderProps) {
  return (
    <div className={cn("space-y-4 mb-20", className)}>
      <div className="space-y-4">
        {/* Title Skeleton */}
        <Skeleton className="h-12 md:h-14 w-3/4 max-w-md" />
        
        {/* Subtitle Skeleton */}
        {hasSubtitle && (
          <div className="space-y-2 mt-4">
            <Skeleton className="h-5 w-2/3 max-w-xl" />
            <Skeleton className="h-5 w-1/2 max-w-lg" />
          </div>
        )}
      </div>
      
      {/* Optional Children (e.g. Tags) */}
      {hasChildren && (
        <div className="pt-6 flex flex-wrap gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>
      )}
    </div>
  );
}
