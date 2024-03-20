import { PlanType } from "@/models/plan-models";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import DeleteButton from "./delete-button";
import ArchiveButton from "./archive-button";
import { Separator } from "../ui/separator";

export default function TooltipOptions({
  plan,
}: Readonly<{ plan?: PlanType }>) {
  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <ArchiveButton plan={plan} />
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
  );
}
