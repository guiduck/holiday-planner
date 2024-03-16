import { cn } from "@/lib/utils/cn";
import { ScrollArea } from "../ui/scroll-area";
import { PlanType } from "models/plan-models";
import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";
import CardSkeleton from "../PlanCard/loading";

const PlanCard = dynamic(() => import("../PlanCard"), {
  loading: () => <CardSkeleton />,
});

interface PlanListProps {
  items: PlanType[];
  selectedPlan?: PlanType;
}

export function PlanList({ items, selectedPlan }: Readonly<PlanListProps>) {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items?.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-2">
            <div
              className={cn(
                `m${index % 2 !== 0 ? "r" : "l"}-auto text-sm`,
                selectedPlan?.id === item.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.date}
            </div>

            <Separator
              orientation="vertical"
              className={`h-[30px] m${index % 2 !== 0 ? "r" : "l"}-auto`}
            />

            <PlanCard plan={item} />

            <Separator
              orientation="vertical"
              className={`h-[30px] m${index % 2 === 0 ? "r" : "l"}-auto`}
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
