import { Skeleton } from "@/components/ui/skeleton";

export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-[#FCF8F9]">
      <div className="pt-40 pb-24 container mx-auto px-4 max-w-4xl">
        {/* Header Skeleton */}
        <div className="space-y-6 mb-12">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-16 md:h-24 w-full" />
          <Skeleton className="h-6 w-1/3" />
        </div>

        {/* Hero Image Skeleton */}
        <Skeleton className="h-[400px] w-full rounded-2xl mb-16" />

        {/* Content Skeleton */}
        <div className="space-y-6">
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
      </div>
    </div>
  );
}
