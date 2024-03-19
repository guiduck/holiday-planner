"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/cn";
import { useDateStore } from "@/stores/date-store";
import setDateCookie from "@/lib/actions/set-Date";

export function DatePicker() {
  const { dateParam, setDateParam } = useDateStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !dateParam && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateParam ? format(dateParam, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dateParam}
          onDayClick={async (date) => await setDateCookie(date as Date)}
          onSelect={(date) => setDateParam(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
