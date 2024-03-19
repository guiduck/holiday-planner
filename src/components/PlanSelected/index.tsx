import { Separator } from "../ui/separator";
import { PlanType } from "@/models/plan-models";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFDocument } from "@/app/pdf/pdf-document";
import ViewFileButton from "./view-file";
import TooltipOptions from "../TooltipOptions";
import CalendarButton from "../PlanView/calendar-button";
import { Label } from "../ui/label";
import { CalendarIcon, Download } from "lucide-react";
import { Button } from "../ui/button";

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
      <div className="flex items-center p-2">
        <TooltipOptions plan={plan} />

        <div className="ml-auto flex items-center gap-2">
          <Separator orientation="vertical" className="mx-1 h-6" />
          {/* <CalendarButton /> */}
          <Button className="text-xs flex" variant="link">
            <CalendarIcon className="w-6 h-6" />
          </Button>
          {plan?.date && (
            <Separator orientation="vertical" className="mx-1 h-6" />
          )}
        </div>
      </div>

      <Separator orientation="horizontal" />

      <h1 className="text-2xl text-[28px] font-bold p-8 text-center bg-secondary">
        {plan?.date ?? dateFormated}
      </h1>

      <div className="flex flex-1 flex-col min-w-[250px] px-6 pt-10">
        <div className="flex flex-col gap-[46px] ">
          <div className="flex flex-col gap-3 p-0">
            <Label className="flex items-start text-sm p-0 rounded-sm">
              What am I doing?
            </Label>
            <div className="flex-1 h-[22px] text-md whitespace-pre-wrap px-4 py-2 text-sm border-[1px] border-accent">
              {plan?.title}
            </div>
          </div>

          <div className="flex flex-col gap-3 p-0">
            <Label className="flex items-start text-sm p-0 rounded-sm">
              Where am I going?
            </Label>
            <div className="flex-1 h-[22px] text-md whitespace-pre-wrap px-4 py-2 text-sm border-[1px] border-accent">
              {plan?.locations?.join(", ")}
            </div>
          </div>

          <div className="flex flex-col gap-3 p-0">
            <Label className="flex items-start text-sm p-0 rounded-sm">
              Who is joining me?
            </Label>
            <div className="flex-1 h-[22px] text-md whitespace-pre-wrap px-4 py-2 text-sm border-[1px] border-accent">
              {plan?.participants?.join(", ")}
            </div>
          </div>

          <div className="flex flex-col gap-3 p-0">
            <Label className="flex items-start text-sm p-0 rounded-sm">
              What are my plans?
            </Label>
            <div className="flex-1 min-h-[97px] text-md whitespace-nowrap text-ellipsis px-4 py-2 text-sm border-[1px] border-accent">
              <p className="whitespace-nowrap text-ellipsis">
                {plan?.description}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

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
                  <Button className="text-xs flex gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
}
