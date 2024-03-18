import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { PlanType } from "@/models/plan-models";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFDocument } from "@/app/pdf/pdf-document";
import ViewFileButton from "./view-file";
const CreateButton = dynamic(() => import("../PlanView/create-button"), {
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
      {!plan ? (
        <div className="p-8 flex flex-col gap-6 text-center ">
          <p className="text-2xl font-bold text-muted-foreground">
            Select a plan or
          </p>
          <CreateButton />
        </div>
      ) : (
        <div className="flex flex-1 flex-col min-w-[250px]">
          <div className="flex items-start p-4">date section</div>
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {plan.title}
          </div>
          <Separator className="mx-1" />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {plan.description}
          </div>
          <Separator className="mt-auto" />
          <div className="w-full flex justify-between   ">
            <ViewFileButton />
            <div className="flex gap-3 items-center">
              <Separator orientation="vertical" className="mx-1 h-6" />
              <PDFDownloadLink
                document={<PDFDocument plan={plan} />}
                fileName="somename.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    <p className="text-xs">Loading document...</p>
                  ) : (
                    <p className="text-xs">Download PDF</p>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
