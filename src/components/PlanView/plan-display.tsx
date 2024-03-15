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
import { useModalStore } from "@/stores/modal-control";
import { useDateStore } from "@/stores/date-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface PlanDisplayProps {
  plan: PlanType | null;
}

// TODO: make this server using the urlsearch params, and set search params upon date pick
export function PlanDisplay({ plan }: Readonly<PlanDisplayProps>) {
  const [date, setDate] = useState<Date>();

  const { showAddPlan, setShowAddPlan, showCalendar, setShowCalendar } =
    useModalStore();
  const { dateParam, dateFormated, setDateParam } = useDateStore();
  console.log(plan);

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

        <div className="ml-auto flex items-center gap-2">
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <TooltipTrigger>
              <div className="w-full flex justify-center items-center">
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
              </div>
            </TooltipTrigger>

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
            No plans for this date
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
