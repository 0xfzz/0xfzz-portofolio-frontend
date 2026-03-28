import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FCF8F9]">
      {/* Navbar Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-8">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <Skeleton className="h-8 w-24" />
          <div className="hidden md:flex gap-8">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>

      <div className="pt-40 pb-24 container mx-auto px-4 max-w-7xl">
        {/* Hero Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-16 w-3/4" />
              <Skeleton className="h-16 w-1/2" />
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
          <Skeleton className="h-[500px] w-full rounded-2xl" />
        </div>

        {/* Tech Stack Skeleton */}
        <div className="mb-40">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 space-y-4">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-16 w-full" />
            </div>
            <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Featured Projects Skeleton */}
        <div className="space-y-12 mb-40">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-4 w-96" />
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
