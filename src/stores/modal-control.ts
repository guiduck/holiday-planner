import { create } from "zustand";

interface StoreProps {
  showAddPlan: boolean;
  setShowAddPlan: (show: boolean) => void;

  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
}

export const useModalStore = create<StoreProps>((set) => ({
  showAddPlan: false,
  setShowAddPlan: (show: boolean) => set(() => ({ showAddPlan: show })),

  showCalendar: false,
  setShowCalendar: (show: boolean) => set(() => ({ showCalendar: show })),
}));
