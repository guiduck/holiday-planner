import { PlanType } from "@/models/plan-models";
import { create } from "zustand";

interface StoreProps {
  selectedPlan?: PlanType;
  setSelectedPlan: (plan: PlanType) => void;

  displayPlans?: PlanType[];
  setDisplayPlans: (plans: PlanType[]) => void;
}

export const usePlansStore = create<StoreProps>((set) => ({
  selectedPlan: undefined,
  setSelectedPlan: (plan?: PlanType) => set(() => ({ selectedPlan: plan })),

  displayPlans: undefined,
  setDisplayPlans: (plans: PlanType[]) => set(() => ({ displayPlans: plans })),
}));
