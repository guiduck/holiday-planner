import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { PlanType } from "@/models/plan-models";
const CreateButton = dynamic(() => import("./create-button"), {
  loading: () => <Skeleton className="max-w-80 m-auto" />,
});

interface PlanSelectedProps {
  dateFormated: string;
  plan?: PlanType;
}

export default function PlanSelected({
  dateFormated,
  plan,
}: Readonly<PlanSelectedProps>) {
  return (
    <div>
      {plan?.date && (
        <div className="ml-auto text-xs text-muted-foreground">
          {plan.date || dateFormated}
        </div>
      )}
      <Separator />
      {!plan ? (
        <div className="p-8 flex flex-col gap-6 text-center ">
          <h1 className="text-2xl font-bold">{dateFormated}</h1>
          <p className="text-2xl font-bold text-muted-foreground">
            Select a plan or
          </p>
          <CreateButton />
        </div>
      ) : (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">date section</div>
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {plan.title}
          </div>
          <Separator className="mx-1" />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {plan.description}
          </div>
          <Separator className="mt-auto" />
        </div>
      )}
    </div>
  );
}
