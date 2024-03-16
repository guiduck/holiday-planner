import { cn } from "@/lib/utils/cn";
import { PlanType } from "@/models/plan-models";
import { usePlansStore } from "@/stores/plan-store";
import { Badge } from "../ui/badge";
import { Clock, MapPin } from "lucide-react";
import { ComponentProps } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import setPlanIdCookie from "@/lib/actions/setPlanId";

interface PlanCardProps {
  plan?: PlanType;
}

export default function PlanCard({ plan }: Readonly<PlanCardProps>) {
  const { setSelectedPlan, selectedPlan } = usePlansStore();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  return (
    <button
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        selectedPlan?.id === plan?.id && "bg-muted"
      )}
      onClick={async () => {
        const params = new URLSearchParams(searchParams);
        let selected = selectedPlan;

        if (selectedPlan?.id !== plan?.id) {
          selected = plan;
          params.set("planId", plan?.id as string);
          await setPlanIdCookie(plan?.id as string);
        }

        if (selectedPlan?.id === plan?.id && selectedPlan !== undefined) {
          selected = undefined;
          params.delete("planId");
        }
        // selected = undefined;
        replace(`${pathname}?${params.toString()}`);
        return setSelectedPlan(selected);
      }}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{plan?.title}</div>
            {!plan?.archive && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {plan?.description?.substring(0, 300)}
        </p>

        <div className="flex items-center gap-2">
          {plan?.participants.map((label, index) => (
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

      {plan?.locations.length ? (
        <div className="flex items-center gap-2">
          {plan?.locations.map((label, index) => (
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
