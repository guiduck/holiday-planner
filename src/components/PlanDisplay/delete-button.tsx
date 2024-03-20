import { PlanType } from "@/models/plan-models";
import { Button } from "../ui/button";
import deletePlan from "@/lib/actions/delete-Plan";
import { Trash2 } from "lucide-react";
import { useAlertStore } from "@/stores/alert-store";

export default function DeleteButton({
  plan,
}: Readonly<{ plan?: PlanType | null }>) {
  const { setAlertData } = useAlertStore();

  const handleDelete = async () => {
    const { message, data } = await deletePlan(plan?.id);
    setAlertData({
      show: true,
      message: data,
      time: 5000,
      type: message === "success" ? "success" : "error",
    });
  };

  return (
    <Button variant="ghost" size="icon" disabled={!plan} onClick={handleDelete}>
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete permanently</span>
    </Button>
  );
}
