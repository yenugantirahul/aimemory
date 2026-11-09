import { Skeleton } from "@/components/ui/skeleton";

export function MessageListSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading messages">
      {[0, 1].map((i) => (
        <div key={i} className="space-y-8">
          <div className="flex justify-end">
            <Skeleton className="h-11 w-2/5 rounded-2xl" />
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="size-7 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
