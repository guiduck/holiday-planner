import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useModalStore } from "@/stores/modal-control";

export default function CalendarButton() {
  const { showCalendar, setShowCalendar } = useModalStore();
  return (
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
            <span>calendar</span>
            <CalendarIcon className="ml-auto h-5 w-5" />
            <span className="sr-only">Date</span>
          </Button>
        </TooltipTrigger>
      </div>
      <TooltipContent>you can pick a date here</TooltipContent>
    </Tooltip>
  );
}
