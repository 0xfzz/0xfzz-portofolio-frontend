import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-[#FCF8F9]">
      <div className="pt-40 pb-24 container mx-auto px-4 max-w-7xl">
        {/* Page Header Skeleton */}
        <div className="space-y-10 mb-10">
          <div className="space-y-5">
            <Skeleton className="h-16 md:h-[4.5rem] w-3/4 mb-4" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          
          {/* Tag Filter Skeleton */}
          <div className="flex flex-wrap gap-4 pt-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-md" />
            ))}
          </div>
        </div>

        {/* Project Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[450px] w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
