"use client";
import { useModalStore } from "@/stores/modal-control";
import { Button } from "../ui/button";

export default function CreateButton() {
  const { showCalendar, setShowCalendar } = useModalStore();
  return (
    <Button
      className="max-w-80 m-auto"
      onClick={() => setShowCalendar(!showCalendar)}
    >
      Create a new plan
    </Button>
  );
}
