import { useModalStore } from "@/stores/modal-control";
import { usePlansStore } from "@/stores/plan-store";
import { useWindowDimensions } from "hooks/useWindowDimensions";

export default function ViewFileButton() {
  const { setShowPDF } = useModalStore();
  const { setSelectedPlan } = usePlansStore();
  const { width } = useWindowDimensions();

  return (
    <button
      className="bg-accent text-xs px-6 rounded-sm"
      onClick={() => {
        setShowPDF(true);
        if (width < 768) setSelectedPlan(undefined);
      }}
    >
      View file
    </button>
  );
}
