import { Skeleton } from "@/components/ui/skeleton";

export default function ExperiencesLoading() {
  return (
    <div className="min-h-screen bg-[#FCF8F9]">
      <div className="pt-40 pb-24 container mx-auto px-4 max-w-5xl">
        {/* Page Header Skeleton */}
        <div className="space-y-4 mb-20 animate-pulse">
          <Skeleton className="h-12 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Work Experience Section Skeleton */}
        <div className="mb-20">
          <Skeleton className="h-4 w-32 mb-10" />
          <div className="space-y-16 relative">
             {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-6">
                   <div className="flex justify-between items-start">
                      <div className="space-y-2">
                         <Skeleton className="h-8 w-64" />
                         <Skeleton className="h-4 w-40" />
                      </div>
                      <Skeleton className="h-4 w-24" />
                   </div>
                   <div className="space-y-3 pl-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/5" />
                   </div>
                   <div className="flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Education Section Skeleton */}
        <div className="mb-32">
          <Skeleton className="h-4 w-24 mb-10" />
          <div className="space-y-12">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-64" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="space-y-2 text-right">
                  <Skeleton className="h-4 w-20 ml-auto" />
                  <Skeleton className="h-3 w-32 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards Section Skeleton */}
        <div className="mb-32">
          <Skeleton className="h-4 w-32 mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-xl" />
            ))}
          </div>
        </div>

        {/* Tech Stack Section Skeleton */}
        <div className="mb-32">
          <Skeleton className="h-4 w-40 mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
