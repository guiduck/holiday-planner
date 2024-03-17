"use client";
import { AlertCircle, CircleCheckBig } from "lucide-react";

import {
  Alert as AlertUi,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import React, { useEffect } from "react";
import { useAlertStore } from "@/stores/snackbar-store";

interface AlertProps {
  show?: boolean;
  message?: string;
  time?: number;
  type?: "success" | "error" | "neutral";
}

export function Alert({ show, message, time, type }: Readonly<AlertProps>) {
  const { setAlertData, alertData } = useAlertStore();

  console.log({ show, message, time, type });

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
    <AlertUi variant="destructive">
      {alertData.type === "success" && <CircleCheckBig className="h-4 w-4" />}
      {alertData.type === "error" && <AlertCircle className="h-4 w-4" />}
      <AlertTitle>{alertData.type}</AlertTitle>
      <AlertDescription>{alertData.message}</AlertDescription>
    </AlertUi>
  );
}
