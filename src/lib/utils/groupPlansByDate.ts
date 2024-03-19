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

  groupedArray.forEach((group) => {
    group.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  });

  groupedArray.sort((a, b) => {
    const dateA = new Date(a[0].date);
    const dateB = new Date(b[0].date);
    return dateA.getTime() - dateB.getTime();
  });

  return groupedArray;
}
