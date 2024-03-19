"use client";

import { cn } from "@/lib/utils/cn";
import { PlanType } from "@/models/plan-models";
import { usePlansStore } from "@/stores/plan-store";
import { Badge } from "../ui/badge";
import {
  CircleMinus,
  CirclePlus,
  Download,
  MapPin,
  User,
  Users,
} from "lucide-react";
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
        "min-w-[300px] flex flex-col p-6 px-4 items-start gap-4 rounded-lg border text-left text-sm transition-all hover:bg-accent",
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
            <Badge
              className="text-[0.7rem] p-0 px-1.5 gap-1 rounded-sm"
              variant="default"
            >
              archived
            </Badge>
          )}
        </div>

        <Separator orientation="horizontal" className="my-2" />

        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <Badge
              className="text-[0.7rem] p-0 px-1.5 gap-1 bg-accent rounded-sm"
              variant="outline"
            >
              {plan?.participants && plan?.participants?.length > 1 ? (
                <Users className="h-4 w-4" />
              ) : (
                <User className="h-4 w-4" />
              )}
              {plan?.participants.slice(0, 3).join(", ")}
              {(plan?.participants?.length ?? 0) > 4 ? "..." : null}
            </Badge>
          </div>

          {plan?.locations.length ? (
            <div className="flex items-center gap-4">
              <Badge
                className="text-[0.7rem] p-0 px-1.5 gap-1 bg-primary-foreground text-accent rounded-sm"
                variant="secondary"
              >
                <MapPin className="h-4 w-4 text-accent" />
                {plan?.locations.slice(0, 3).join(", ")}
                {plan?.locations.length > 4 ? "..." : null}
              </Badge>
            </div>
          ) : null}
        </div>

        <p className="line-clamp-2 text-xs mt-2 text-muted-foreground">
          {plan?.description?.substring(0, 300)}
        </p>
      </div>
      <div className="w-full flex justify-end items-center">
        <div className="flex items-center gap-2">
          <PDFDownloadLink
            document={<PDFDocument plan={plan} />}
            fileName="somename.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <p className="text-xs">Loading document...</p>
              ) : (
                <span className="text-xs flex gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </span>
              )
            }
          </PDFDownloadLink>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <p className="text-xs text-end w-[97px]">
            {selectedPlan?.id !== plan?.id ? (
              <span className="flex gap-2 items-center">
                <CirclePlus className="w-4 h-4" />
                See details
              </span>
            ) : (
              <span className="flex gap-2 items-center">
                <CircleMinus className="w-4 h-4" />
                Close details
              </span>
            )}
          </p>
        </div>
      </div>
    </button>
  );
}
