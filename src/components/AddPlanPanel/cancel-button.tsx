"use client";

import { useModalStore } from "@/stores/modal-control";
import { Button } from "../ui/button";

export default function CancelButton() {
  const { setShowAddPlan } = useModalStore();
  return (
    <Button variant="ghost" onClick={() => setShowAddPlan(false)}>
      Cancel
    </Button>
  );
}
