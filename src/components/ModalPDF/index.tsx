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
import { CircleX } from "lucide-react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
const View = dynamic(() => import("@/app/pdfView/page"), {
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
    <div className="absolute w-screen h-screen top-0 left-0 flex items-center justify-center z-50">
      <div className="absolute w-screen h-screen top-0 left-0 bg-background opacity-40 backdrop-filter backdrop-grayscale backdrop-blur-md backdrop-contrast-200 "></div>
      <Card className="absolute min-h-[250px] w-[calc(100%-1rem)] bottom-0 mt-[-200px] border-2 border-bg-primary left-0 rounded-tl-2 rounded-tr-2 rounded-br-none rounded-bl-none md:relative md:rounded-md bg-background md:w-[500px]">
        <div className="relative w-full h-full">
          <button onClick={() => setShowPDF(false)}>
            <CircleX className="h-6 w-6 absolute right-3 top-2" />
          </button>
          <CardHeader>
            <CardTitle>DOCUMENT</CardTitle>
            <CardDescription>
              You can click the link to see the full document below.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <div className="w-full h-full flex justify-center items-center">
              <View />
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button type="submit" onClick={finish}>
              Okay
            </Button>
            <a href={getpdfrUrl()} target="_blank">
              <p className="">See full document</p>
            </a>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
