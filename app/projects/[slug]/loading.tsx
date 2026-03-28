import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailLoading() {
  return (
    <div className="min-h-screen bg-[#FCF8F9]">
      <div className="pt-40 pb-24 container mx-auto px-4 max-w-7xl">
        {/* Header Skeleton */}
        <div className="max-w-3xl space-y-6 mb-16">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-16 md:h-20 w-3/4" />
          <Skeleton className="h-6 w-full" />
        </div>

        {/* Gallery Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20 h-[600px]">
          <div className="md:col-span-8">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>
          <div className="md:col-span-4 flex flex-col gap-6">
            <Skeleton className="flex-1 w-full rounded-2xl" />
            <Skeleton className="flex-1 w-full rounded-2xl" />
          </div>
        </div>

        {/* Content Columns Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Space */}
          <div className="lg:col-span-8 space-y-12">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-6">
                <Skeleton className="h-10 w-48" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[98%]" />
                  <Skeleton className="h-4 w-[95%]" />
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Space */}
          <div className="lg:col-span-4 space-y-10">
            <div className="p-8 rounded-2xl border border-[#E4E2E5] space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-8 w-20" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
