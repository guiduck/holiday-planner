"use client";

import { useModalStore } from "@/stores/modal-control";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar } from "../ui/calendar";
import { useDateStore } from "@/stores/date-store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, CircleX } from "lucide-react";
import { Button } from "../ui/button";
import setDateCookie from "@/lib/actions/set-Date";

export function CalendarModal() {
  const { showCalendar, setShowCalendar, setShowAddPlan } = useModalStore();
  const { dateParam, setDateParam } = useDateStore();

  if (!showCalendar) return null;

  const finish = async () => {
    setShowCalendar(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setShowAddPlan(true);
  };

  return (
    <div className="absolute w-screen h-screen top-0 left-0 flex items-center justify-center z-50">
      <div className="absolute w-screen h-screen top-0 left-0 bg-background opacity-40 backdrop-filter backdrop-grayscale backdrop-blur-md backdrop-contrast-200 "></div>
      <Popover>
        <Card className="absolute min-h-[250px] w-[calc(100%-1rem)] bottom-0 mt-[-200px] border-2 border-bg-primary left-0 rounded-tl-2 rounded-tr-2 rounded-br-none rounded-bl-none md:relative md:rounded-md bg-background md:w-[500px]">
          <div className="relative">
            <button onClick={() => setShowCalendar(false)}>
              <CircleX className="h-6 w-6 absolute right-3 top-2" />
            </button>
            <CardHeader>
              <CardTitle>Pick a date</CardTitle>
              <CardDescription>
                What are you planning for your next holiday?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full flex justify-center items-center">
                <PopoverTrigger>
                  <Button
                    className="gap-3"
                    variant="ghost"
                    size="default"
                    disabled={false}
                  >
                    <span>Pick a date</span>
                    <CalendarIcon className="ml-auto h-5 w-5" />
                    <span className="sr-only">Date</span>
                  </Button>
                </PopoverTrigger>
              </div>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateParam}
                  onDayClick={async (event) => {
                    await setDateCookie(event);
                  }}
                  onSelect={(event) => setDateParam(event as Date)}
                  className="rounded-md border min-w-[300px] flex items-center justify-center"
                />
              </PopoverContent>
            </CardContent>
            <CardFooter className="justify-between space-x-2">
              <Button type="submit" onClick={finish}>
                Okay
              </Button>
            </CardFooter>
          </div>
        </Card>
      </Popover>
    </div>
  );
}
