import { useModalStore } from "@/stores/modal-control";

export default function ViewFileButton() {
  const { setShowPDF } = useModalStore();

  return (
    <button
      className="bg-accent text-xs px-6 rounded-sm"
      onClick={() => setShowPDF(true)}
    >
      View file
    </button>
  );
}
