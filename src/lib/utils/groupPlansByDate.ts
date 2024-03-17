import { PlanType } from "@/models/plan-models";

export default function groupPlansByDate(plans: PlanType[]): PlanType[][] {
  const groupedPlans: { [key: string]: PlanType[] } = {};

  plans.forEach((plan) => {
    const { date } = plan;
    if (groupedPlans[date]) {
      groupedPlans[date].push(plan);
    } else {
      groupedPlans[date] = [plan];
    }
  });

  const groupedArray = Object.values(groupedPlans);

  return groupedArray;
}
