"use client";
import { Archive } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { PlanType } from "@/models/plan-models";
import { useModalStore } from "@/stores/modal-control";
import { AddPlan } from "../AddPlanPanel";
import { useFormStatus } from "react-dom";
import { Spinner } from "../Spinner";
import { useDateStore } from "@/stores/date-store";
import { usePlansStore } from "@/stores/plan-store";
import archivePlan from "@/lib/actions/archive-Plan";
import CalendarButton from "../PlanView/calendar-button";
import PlanSelected from "../PlanSelected";
import DeleteButton from "./delete-button";
import { useAlertStore } from "@/stores/snackbar-store";

interface PlanDisplayProps {
  plan: PlanType | null;
}

// TODO: make this server using the urlsearch params, and set search params upon date pick
export function PlanDisplay({ plan }: Readonly<PlanDisplayProps>) {
  const { showAddPlan } = useModalStore();
  const { dateFormated } = useDateStore();
  const { selectedPlan } = usePlansStore();
  const { setAlertData } = useAlertStore();

  //TODO: implement pending status on other components
  const { pending } = useFormStatus();

  const handleArchivePlan = async () => {
    const result = await archivePlan(plan?.id);
    setAlertData({
      show: true,
      message: result.data,
      time: 5000,
      type: result.message === "success" ? "success" : "error",
    });
  };

  return (
    <div className="flex h-full flex-col">
      {showAddPlan && (
        <div className="flex-col md:flex  w-full">
          <AddPlan />
          <Separator />
        </div>
        // <div className="hidden flex-col md:flex  w-full">
        //   <AddPlan />
        //   <Separator />
        // </div>
      )}

      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={!plan}
                onClick={async () => await handleArchivePlan()}
              >
                {pending ? (
                  <Spinner className="h-4 w-4" />
                ) : (
                  <>
                    <Archive className="h-4 w-4" />
                    <span className="sr-only">Archive</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              {plan?.archived ? "Unarchive" : "Archive"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <DeleteButton plan={plan} />
            </TooltipTrigger>

            <TooltipContent>Delete permanently</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-6" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Separator orientation="vertical" className="mx-1 h-6" />
          <CalendarButton />
          {plan?.date && (
            <Separator orientation="vertical" className="mx-1 h-6" />
          )}
        </div>
      </div>

      <h1 className="text-2xl font-bold p-8 text-center">
        {selectedPlan?.date ?? dateFormated}
      </h1>

      <PlanSelected
        plan={plan as PlanType}
        dateFormated={dateFormated as string}
      />
    </div>
  );
}
