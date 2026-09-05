import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/PageContainer";

export default function ProjectDetailLoading() {
  return (
    <PageContainer>
      {/* Header Skeleton */}
      <div className="max-w-5xl mx-auto space-y-8 px-4 md:px-8 mb-10">
        <Skeleton className="h-6 w-32" /> {/* Back button */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24 rounded-sm" />
          <Skeleton className="h-6 w-20 rounded-sm" />
        </div>
        <Skeleton className="h-10 md:h-14 w-3/4 max-w-4xl" />
        <Skeleton className="h-6 w-full max-w-2xl" />
        
        {/* Image Skeleton matching ProjectHeader.tsx aspect-[21/9] */}
        <div className="mt-8 w-full max-w-5xl mx-auto">
          <Skeleton className="aspect-[21/9] w-full rounded-[2rem]" />
        </div>
      </div>

      {/* Content Columns Skeleton */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Space */}
        <div className="lg:col-span-8 space-y-8">
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
          <div className="p-8 rounded-2xl border border-border-subtle space-y-8">
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
    </PageContainer>
  );
}
