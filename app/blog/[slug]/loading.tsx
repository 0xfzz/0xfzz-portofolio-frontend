import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/PageContainer";

export default function BlogDetailLoading() {
  return (
    <PageContainer maxWidth="max-w-none">
      {/* Header Skeleton - Matches BlogDetailHeader.tsx */}
      <div className="space-y-12 mb-16">
        <div className="max-w-4xl mx-auto space-y-8 px-4 w-full text-left">
          <Skeleton className="h-6 w-32" /> {/* Back button */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-24 rounded-sm" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-12 md:h-16 w-full" />
            <Skeleton className="h-10 md:h-12 w-3/4" />
          </div>
        </div>

        {/* Hero Image Skeleton matching BlogDetailHeader.tsx aspect-[21/9] */}
        <div className="max-w-4xl mx-auto px-4 w-full">
          <Skeleton className="aspect-[21/9] w-full rounded-2xl" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto px-4 space-y-6">
         <div className="flex gap-4">
            <Skeleton className="h-20 w-20 shrink-0" /> {/* Drop cap placeholder */}
            <div className="space-y-3 w-full">
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-full" />
            </div>
         </div>
         {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className={`h-4 ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-[95%]' : 'w-[90%]'}`} />
         ))}
      </div>
    </PageContainer>
  );
}
