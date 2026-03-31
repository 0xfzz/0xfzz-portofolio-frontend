import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { LoadingHeader } from "@/components/layout/LoadingHeader";

export default function ContactLoading() {
  return (
    <PageContainer>
      <LoadingHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
    </PageContainer>
  );
}
