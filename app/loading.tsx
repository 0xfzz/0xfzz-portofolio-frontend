import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-background">
      <div className="pt-20 pb-12 md:pt-28 md:pb-16 container mx-auto max-w-5xl px-4 md:px-8">
        {/* Hero Skeleton - Matches Hero.tsx layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="max-w-2xl w-full text-left space-y-8">
            <Skeleton className="h-6 w-32 rounded-full" />
            <div className="space-y-4">
              <Skeleton className="h-16 md:h-24 w-full" />
              <Skeleton className="h-16 md:h-24 w-3/4" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
            <Skeleton className="h-12 w-48 rounded-xl" />
          </div>

          <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] overflow-hidden">
            <Skeleton className="h-full w-full" />
          </div>
        </div>

        {/* Tech Stack Skeleton */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3 space-y-4">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
            <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Featured Projects Skeleton */}
        <div className="space-y-8">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-6 w-96" />
            </div>
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
