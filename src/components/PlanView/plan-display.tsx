"use client";
import { Archive, CalendarIcon, Trash2 } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useState } from "react";
import { PlanType } from "@/models/plan-models";
import { useModalStore } from "@/stores/modal-control";
import { useDateStore } from "@/stores/date-store";
import { AddPlan } from "../AddPlanPanel";
import deletePlan from "@/lib/actions/deletePlan";
import { useFormStatus } from "react-dom";
import { Spinner } from "../Spinner";

interface PlanDisplayProps {
  plan: PlanType | null;
}

// TODO: make this server using the urlsearch params, and set search params upon date pick
export function PlanDisplay({ plan }: Readonly<PlanDisplayProps>) {
  const { showAddPlan, setShowAddPlan, showCalendar, setShowCalendar } =
    useModalStore();
  const { dateFormated } = useDateStore();

  //TODO: implement pending status on other components
  const { pending } = useFormStatus();

  return (
    <div className="flex h-full flex-col">
      {showAddPlan && (
        <div className="hidden flex-col md:flex  w-full">
          <AddPlan />
          <Separator />
        </div>
      )}
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!plan}>
                {pending ? (
                  <Spinner />
                ) : (
                  <>
                    <Archive className="h-4 w-4" />
                    <span className="sr-only">Archive</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={!plan}
                onClick={async () => await deletePlan(plan?.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <div className="w-full flex justify-center items-center">
              <TooltipTrigger asChild>
                <Button
                  className="gap-3 "
                  variant="ghost"
                  size="default"
                  disabled={false}
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  {/* TODO: colocar data selecionada */}
                  <span>Pick a date</span>
                  <CalendarIcon className="ml-auto h-5 w-5" />
                  <span className="sr-only">Date</span>
                </Button>
              </TooltipTrigger>
            </div>

            <TooltipContent>Current date</TooltipContent>
          </Tooltip>
          {plan?.date && (
            <Separator orientation="vertical" className="mx-1 h-6" />
          )}
        </div>

        {plan?.date && (
          <div className="ml-auto text-xs text-muted-foreground">
            {plan.date || dateFormated}
          </div>
        )}
      </div>
      <Separator />
      {plan ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">date section</div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {plan.description}
          </div>
          <Separator className="mt-auto" />
        </div>
      ) : (
        <div className="p-8 flex flex-col gap-6 text-center ">
          <h1 className="text-2xl font-bold">{dateFormated}</h1>
          <p className="text-2xl font-bold text-muted-foreground">
            Select a plan or
          </p>
          <Button
            className="max-w-80 m-auto"
            onClick={() => setShowAddPlan(!showAddPlan)}
          >
            Create a new plan
          </Button>
        </div>
      )}
    </div>
  );
}
