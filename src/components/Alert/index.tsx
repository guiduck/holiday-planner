"use client";
import { AlertCircle, CircleCheckBig } from "lucide-react";

import {
  Alert as AlertUi,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import React, { useEffect } from "react";
import { useAlertStore } from "@/stores/alert-store";

interface AlertProps {
  show?: boolean;
  message?: string;
  time?: number;
  type?: "success" | "error" | "neutral";
}

export function Alert({
  show,
  message,
  time = 5000,
  type = "error",
}: Readonly<AlertProps>) {
  const { setAlertData, alertData } = useAlertStore();

  useEffect(() => {
    if (show) {
      setAlertData({ show, message, time, type });
    }
  }, [show]);

  if (!alertData || !alertData.show) return undefined;

  setTimeout(() => {
    setAlertData({ show: false, message: "", time: 0, type: "neutral" });
  }, alertData.time);

  return (
    <AlertUi
      className={`absolute z-[100000] bg-background min-w-[300px] h-[70px] border-2 top-0 right-0 md:max-w-[350px] max-h-[200px] ${
        alertData.type === "success" ? "border-green-800" : ""
      }`}
      variant={
        alertData.type === "success" || alertData.type === "neutral"
          ? "default"
          : "destructive"
      }
    >
      {alertData.type === "success" && (
        <CircleCheckBig data-testid="success" className="h-4 w-4" />
      )}
      {alertData.type === "error" && (
        <AlertCircle data-testid="error" className="h-4 w-4" />
      )}
      <AlertTitle>{alertData.type}</AlertTitle>
      <AlertDescription className="whitespace-nowrap text-ellipsis">
        {alertData.message}
      </AlertDescription>
    </AlertUi>
  );
}
