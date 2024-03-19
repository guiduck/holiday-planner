"use client";

import { useModalStore } from "@/stores/modal-control";
import { Button } from "../ui/button";

export default function CreateButton() {
  const { setShowAddPlan } = useModalStore();

  return (
    <Button className="max-w-80 mx-auto" onClick={() => setShowAddPlan(true)}>
      Create a new plan
    </Button>
  );
}
