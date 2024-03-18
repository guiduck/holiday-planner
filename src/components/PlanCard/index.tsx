import { cn } from "@/lib/utils/cn";
import { PlanType } from "@/models/plan-models";
import { usePlansStore } from "@/stores/plan-store";
import { Badge } from "../ui/badge";
import { Clock, MapPin } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFDocument } from "@/app/pdf/pdf-document";
import { Separator } from "../ui/separator";
import setPlanIdCookie from "@/lib/actions/set-PlanId";

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
        "min-w-[300px] flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        selectedPlan?.id === plan?.id && "bg-muted",
        `${plan?.archived && "bg-muted opacity-70"}`
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

        replace(`${pathname}?${params.toString()}`);
        return setSelectedPlan(selected);
      }}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center  gap-2">
            <div className="font-semibold">{plan?.title}</div>
            {!plan?.archived && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          {plan?.archived && (
            <Badge className="text-[0.7rem] p-0 px-1.5 gap-1" variant="default">
              <Clock className="h-4 w-4" />
              archived
            </Badge>
          )}
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {plan?.description?.substring(0, 300)}
        </p>

        <div className="flex items-center gap-2">
          {plan?.participants.map((label) => (
            <Badge
              className="text-[0.7rem] p-0 px-1.5 gap-1"
              key={label}
              variant="outline"
            >
              <Clock className="h-4 w-4" />
              {label}
            </Badge>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        {plan?.locations.length ? (
          <div className="flex items-center gap-2">
            {plan?.locations.map((label) => (
              <Badge
                className="text-[0.7rem] p-0 px-1.5 gap-1"
                key={label}
                variant="secondary"
              >
                <MapPin className="h-4 w-4" />
                {label}
              </Badge>
            ))}
          </div>
        ) : null}
        <div className="flex items-center gap-2">
          <PDFDownloadLink
            document={<PDFDocument plan={plan} />}
            fileName="somename.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <p className="text-xs">Loading document...</p>
              ) : (
                <p className="text-xs">Download PDF</p>
              )
            }
          </PDFDownloadLink>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <p className="text-xs text-end">
            {selectedPlan?.id !== plan?.id ? "See details" : "Close details"}
          </p>
        </div>
      </div>
    </button>
  );
}
