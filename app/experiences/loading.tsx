import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { LoadingHeader } from "@/components/layout/LoadingHeader";

export default function ExperiencesLoading() {
  return (
    <PageContainer>
      <LoadingHeader />

      {/* Work Experience Section Skeleton */}
      <div className="mb-20">
        <Skeleton className="h-4 w-32 mb-10" />
        <div className="space-y-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="group">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 gap-2">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
              
              <ul className="space-y-4 mb-8">
                {[...Array(3)].map((_, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Skeleton className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 w-full" />
                      {j === 0 && <Skeleton className="h-4 w-5/6" />}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} className="h-6 w-16 rounded-md" />
                ))}
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
            <div key={i} className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <div className="space-y-2">
                <Skeleton className="h-7 w-64" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-32" />
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
            <div key={i} className="space-y-3 p-6 rounded-xl border border-border-subtle">
              <div className="flex justify-between items-start gap-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-3 w-1/2" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
