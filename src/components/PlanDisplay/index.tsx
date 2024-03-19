"use client";

import { PlanType } from "@/models/plan-models";
import { useModalStore } from "@/stores/modal-control";
import { useDateStore } from "@/stores/date-store";
import { usePlansStore } from "@/stores/plan-store";
import { Skeleton } from "../ui/skeleton";
import dynamic from "next/dynamic";
import { Separator } from "../ui/separator";
import { Spinner } from "../Spinner";
const CreateButton = dynamic(() => import("../PlanView/create-button"), {
  loading: () => <Skeleton className="max-w-80 m-auto" />,
});
const AddPlan = dynamic(() => import("../AddPlanPanel"), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="w-8 m-auto" />
    </div>
  ),
});
const PlanSelected = dynamic(() => import("../PlanSelected"), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="w-8 m-auto" />
    </div>
  ),
});

export function PlanDisplay() {
  const { showAddPlan } = useModalStore();
  const { dateFormated } = useDateStore();
  const { selectedPlan } = usePlansStore();

  return (
    <div className="flex flex-col h-full">
      {showAddPlan && !selectedPlan && (
        <div className="hidden h-full flex-col md:flex  w-full">
          <AddPlan />
        </div>
      )}

      {selectedPlan && (
        <PlanSelected
          plan={selectedPlan as PlanType}
          dateFormated={dateFormated as string}
        />
      )}

      {!showAddPlan && !selectedPlan && (
        <div className="p-8 flex flex-col gap-10 text-center h-full justify-center mt-[-100px]">
          <p className="text-2xl font-bold text-foreground">Select a plan</p>
          <div className="flex max-w-[100px] mx-auto justify-center items-center gap-2">
            <Separator className="max-w-[35px]" orientation="horizontal" />
            <p className="font-light">or</p>
            <Separator className="max-w-[35px]" orientation="horizontal" />
          </div>
          <CreateButton />
        </div>
      )}
    </div>
  );
}

export default PlanDisplay;
