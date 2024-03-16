import { Skeleton } from "../ui/skeleton";

export default function CardSkeleton() {
  return (
    <Skeleton className="flex flex-col min-h-[122px] items-start gap-2 rounded-lg bg-secondary border p-3 text-left text-sm transition-all hover:bg-accent"></Skeleton>
  );
}
