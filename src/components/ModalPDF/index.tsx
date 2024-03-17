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
import View from "@/app/@pdfView/page";

export function PDFModal() {
  const { showPDF, setShowPDF } = useModalStore();

  if (!showPDF) return undefined;

  const finish = async () => {
    setShowPDF(false);
  };

  return (
    <div className="absolute w-screen h-screen top-0 left-0 flex items-center justify-center z-50">
      <div className="absolute w-screen h-screen top-0 left-0 bg-background opacity-40 backdrop-filter backdrop-grayscale backdrop-blur-md backdrop-contrast-200 "></div>
      <Card className="absolute min-h-[250px] w-screen bottom-0 mt-[-200px] border-2 border-bg-primary left-0 rounded-tl-2 rounded-tr-2 rounded-br-none rounded-bl-none md:relative md:rounded-md bg-background md:w-[500px]">
        <div className="relative">
          <button onClick={() => setShowPDF(false)}>
            <CircleX className="h-6 w-6 absolute right-3 top-2" />
          </button>
          <CardHeader>
            <CardTitle>DOCUMENT</CardTitle>
            <CardDescription>
              What are you planning for your next holiday?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full flex justify-center items-center">
              <View />
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button type="submit" onClick={finish}>
              Okay
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
