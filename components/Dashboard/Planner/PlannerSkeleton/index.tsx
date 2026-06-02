import { Skeleton } from "@/components/ui/skeleton";
import { DAY_INDICES } from "@/types/Planner";

export function PlannerSkeleton() {
  return (
    <div className="-mx-2 overflow-x-auto px-2">
      <div className="grid min-w-[1100px] grid-cols-7 gap-3">
        {DAY_INDICES.map((d) => (
          <div key={d} className="flex min-w-[180px] flex-col gap-2">
            <Skeleton className="mb-1 h-4 w-10" />
            <Skeleton className="mb-2 h-6 w-8" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}