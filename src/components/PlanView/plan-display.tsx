import { Archive, CalendarIcon, Trash2 } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { useState } from "react";
import { formatDate } from "@/lib/utils/formatDate";
import { PlanType } from "@/models/plan-models";
import { AddPlan } from "../AddPlanModal";

interface PlanDisplayProps {
  plan: PlanType | null;
}

export function PlanDisplay({ plan }: Readonly<PlanDisplayProps>) {
  const [date, setDate] = useState<Date>();
  const [newPlan, setNewPlan] = useState<boolean>(false);
  return (
    <div className="flex h-full flex-col">
      {newPlan && <AddPlan />}
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!plan}>
                <Archive className="h-4 w-4" />
                <span className="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!plan}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
        </div>
        <Tooltip>
          <Popover>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <div className="w-full flex justify-center items-center">
                  <Button
                    className="gap-3"
                    variant="ghost"
                    size="default"
                    disabled={false}
                  >
                    {/* TODO: colocar data selecionada */}
                    <span>Pick a date</span>
                    <CalendarIcon className="ml-auto h-5 w-5" />
                    <span className="sr-only">Date</span>
                  </Button>
                </div>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent className="flex w-[auto] p-5">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(event) => {
                  console.log(event);
                  setDate(event);
                }}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
          <TooltipContent>Current date</TooltipContent>
        </Tooltip>
        <div className="ml-auto flex items-center gap-2"></div>

        <Separator orientation="vertical" className="mx-2 h-6" />

        {plan?.date && (
          <div className="ml-auto text-xs text-muted-foreground">
            {plan.date || formatDate(date)}
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
          <h1 className="text-2xl font-bold">{formatDate(date)}</h1>
          <p className="text-2xl font-bold text-muted-foreground">
            No plans for this date
          </p>
          <Button
            className="max-w-80 m-auto"
            onClick={() => setNewPlan(!newPlan)}
          >
            Create a new plan
          </Button>
        </div>
      )}
    </div>
  );
}
