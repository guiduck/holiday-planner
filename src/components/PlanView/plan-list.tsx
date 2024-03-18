import { cn } from "@/lib/utils/cn";
import { ScrollArea } from "../ui/scroll-area";
import { PlanType } from "models/plan-models";
import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";
import CardSkeleton from "../PlanCard/loading";
import groupPlansByDate from "@/lib/utils/groupPlansByDate";

const PlanCard = dynamic(() => import("../PlanCard"), {
  loading: () => <CardSkeleton />,
});

interface PlanListProps {
  items: PlanType[];
  selectedPlan?: PlanType;
}

export function PlanList({ items, selectedPlan }: Readonly<PlanListProps>) {
  //TODO: descobrir pq altura n aplica
  return (
    <ScrollArea
      className="!max-h-[650px] h-screen"
      // style={{ maxHeight: "650px" }}
    >
      <div className="flex flex-col gap-2 p-4 pt-0">
        {groupPlansByDate(items)?.map((plans, index) => {
          return (
            <div key={`${plans[0].id}1`} className="flex flex-col gap-[1.8rem]">
              <p
                className={cn(
                  `mr-auto mt-[0.9rem] text-[0.9rem] h-7 transition-all hover:text-foreground hover:text-[1rem] items-center justify-center`,
                  plans.map((p) => p.id).includes(selectedPlan?.id ?? "")
                    ? "text-foreground text-lg"
                    : "text-muted-foreground"
                )}
              >
                {plans[0].date}
              </p>

              {/* <Separator
                orientation="vertical"
                className={`h-[20px] m${index % 2 !== 0 ? "r" : "l"}-auto`}
              /> */}

              <div className="flex flex-col gap-4">
                {plans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>

              <Separator orientation="horizontal" className={`mr-auto`} />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
