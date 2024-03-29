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
  onSelectPlan?: (plan: PlanType) => void;
}

export function PlanList({
  items,
  selectedPlan,
  onSelectPlan,
}: Readonly<PlanListProps>) {
  const groupedPlans = groupPlansByDate(items);

  return (
    <ScrollArea className="!max-h-[650px] h-screen">
      <div className="flex flex-col p-4 pt-0">
        {groupedPlans?.map((plans, index) => {
          return (
            <>
              <div
                key={`${plans[0].id}1`}
                className="flex flex-col gap-[1.8rem]"
              >
                <p
                  className={cn(
                    `mr-auto text-[0.9rem] h-7 transition-all hover:text-foreground hover:text-[1rem] items-center justify-center`,
                    plans.map((p) => p.id).includes(selectedPlan?.id ?? "")
                      ? "text-foreground text-lg"
                      : "text-muted-foreground"
                  )}
                >
                  {plans[0].date}
                </p>

                <div className="flex flex-col gap-4">
                  {plans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      selectedPlan={selectedPlan}
                      onSelectPlan={onSelectPlan}
                    />
                  ))}
                </div>
              </div>
              {index !== groupedPlans.length - 1 && (
                <Separator orientation="horizontal" className="my-[40px]" />
              )}
            </>
          );
        })}
      </div>
    </ScrollArea>
  );
}
