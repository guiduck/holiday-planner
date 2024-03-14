import { ComponentProps, useState } from "react";

import { cn } from "@/lib/utils/cn";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { PlanType } from "models/plan-models";

interface PlanListProps {
  items: PlanType[];
}

export function PlanList({ items }: PlanListProps) {
  // TODO: switch this to zustand after
  const [plan, setPlan] = useState({
    selected: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
  });

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              plan.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setPlan({
                ...plan,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.title}</div>
                  {!item.archive && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    plan.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-xs font-medium">{item.title}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.description.substring(0, 300)}
            </div>
            {item.locations.length ? (
              <div className="flex items-center gap-2">
                {item.locations.map((label, index) => (
                  <Badge
                    key={label}
                    variant={getBadgeVariantFromIndex(index + 1)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
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
