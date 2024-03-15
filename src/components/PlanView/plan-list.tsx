import { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { PlanType } from "models/plan-models";
import { Clock, MapPin } from "lucide-react";
import { usePlansStore } from "@/stores/plan-store";
import { useDateStore } from "@/stores/date-store";
import { Separator } from "../ui/separator";

interface PlanListProps {
  items: PlanType[];
}

export function PlanList({ items }: Readonly<PlanListProps>) {
  const { setSelectedPlan, selectedPlan } = usePlansStore();
  const { setDateParam } = useDateStore();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item, index) => (
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

            <button
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                selectedPlan?.id === item.id && "bg-muted"
              )}
              onClick={() => {
                if (selectedPlan?.id === item.id) {
                  return setSelectedPlan(undefined);
                }
                return setSelectedPlan(item);
                // setDateParam(undefined);
              }}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.title}</div>
                    {!item.archive && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                </div>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  {item.description?.substring(0, 300)}
                </p>

                <div className="flex items-center gap-2">
                  {item.participants.map((label, index) => (
                    <Badge
                      className="text-[0.7rem] p-0 px-1.5 gap-1"
                      key={label}
                      variant={getBadgeVariantFromIndex(index + 1)}
                    >
                      <Clock className="h-4 w-4" />
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              {item.locations.length ? (
                <div className="flex items-center gap-2">
                  {item.locations.map((label, index) => (
                    <Badge
                      className="text-[0.7rem] p-0 px-1.5 gap-1"
                      key={label}
                      variant={getBadgeVariantFromIndex(index + 1)}
                    >
                      <MapPin className="h-4 w-4" />
                      {label}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </button>

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

function getBadgeVariantFromIndex(
  index: number
): ComponentProps<typeof Badge>["variant"] {
  if (index !== 0 && index % 2 === 0) {
    return "default";
  }

  if (index !== 0 && index % 3 === 0) {
    return "outline";
  }

  return "secondary";
}
