import { create } from "zustand";

interface StoreProps {
  alertData?: DataAlert;
  setAlertData: (data?: DataAlert) => void;
}

interface DataAlert {
  show?: boolean;
  message?: string;
  time?: number;
  type?: "success" | "error" | "neutral";
}

export const useAlertStore = create<StoreProps>((set) => ({
  alertData: { show: false, message: "", time: 0, type: "neutral" },
  setAlertData: (alertData?: DataAlert) => set(() => ({ alertData })),
}));
