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
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
const View = dynamic(() => import("@/components/pdfViewComponent"), {
  loading: () => <p>Loading...</p>,
});

export function PDFModal() {
  const { showPDF, setShowPDF } = useModalStore();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!showPDF) return undefined;

  const finish = async () => {
    setShowPDF(false);
  };

  const getpdfrUrl = () => {
    const params = new URLSearchParams(searchParams);
    const planId = params.get("planId");
    return `${pathname.split("/")[0]}/pdfView/?planId=${planId}`;
  };

  return (
    <div
      data-testid="pdf-modal"
      className="absolute w-screen h-screen top-0 left-0 flex items-center justify-center z-20"
    >
      <div
        data-testid="pdf-modal-backdrop"
        className="absolute w-screen h-screen top-0 left-0 bg-background opacity-40 backdrop-filter backdrop-grayscale backdrop-blur-md backdrop-contrast-200 "
        onClick={() => setShowPDF(false)}
      ></div>
      <Card className="z-[100000] absolute min-h-[250px] w-full bottom-0 mt-[-200px] border-2 border-bg-primary left-0 rounded-tl-2 rounded-tr-2 rounded-br-none rounded-bl-none md:relative md:rounded-md bg-background md:w-[600px]">
        <div className="relative w-full h-full">
          <button data-testid="close-button" onClick={() => setShowPDF(false)}>
            <X className="h-6 w-6 absolute right-3 top-2 text-muted-foreground" />
          </button>
          <CardHeader>
            <CardTitle>DOCUMENT</CardTitle>
            <CardDescription>
              You can click the link to see the full document below.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[500px] w-full">
            <div className="w-full h-full flex justify-center items-center">
              <View modal />
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button data-testid="confirm-button" type="submit" onClick={finish}>
              Confirm
            </Button>
            <a data-testid="document-link" href={getpdfrUrl()} target="_blank">
              <p className="">See full document</p>
            </a>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
