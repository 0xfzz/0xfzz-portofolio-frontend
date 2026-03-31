import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { LoadingHeader } from "@/components/layout/LoadingHeader";

export default function BlogLoading() {
  return (
    <PageContainer>
      <LoadingHeader hasChildren={true} />

      {/* Blog List Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-6">
            <Skeleton className="h-[250px] w-full rounded-2xl" />
            <div className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
