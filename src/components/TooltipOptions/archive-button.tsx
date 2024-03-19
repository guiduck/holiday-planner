"use client";

import { Archive } from "lucide-react";
import { Spinner } from "../Spinner";
import { Button } from "../ui/button";
import archivePlan from "@/lib/actions/archive-Plan";
import { useFormStatus } from "react-dom";
import { useAlertStore } from "@/stores/snackbar-store";
import { PlanType } from "@/models/plan-models";

export default function ArchiveButton({ plan }: { plan?: PlanType }) {
  const { setAlertData } = useAlertStore();
  const { pending } = useFormStatus();

  const handleArchivePlan = async () => {
    const result = await archivePlan(plan?.id);
    setAlertData({
      show: true,
      message: result.data,
      time: 5000,
      type: result.message === "success" ? "success" : "error",
    });
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={!plan}
      onClick={async () => await handleArchivePlan()}
    >
      {pending ? (
        <Spinner className="h-4 w-4" />
      ) : (
        <>
          <Archive className="h-4 w-4" />
          <span className="sr-only">Archive</span>
        </>
      )}
    </Button>
  );
}
