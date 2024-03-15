import { CalendarModal } from "@/components/CalendarModal";
import { PlanView } from "@/components/PlanView";
import { getPlans } from "@/lib/actions/getPlans";
import { PlanType } from "@/models/plan-models";
import { mockedPlans } from "mocks/plan-mock";

export default async function Home() {
  const plans: PlanType[] = await getPlans();

  return (
    <main className="flex min flex-col h-full items-center justify-between p-24">
      <CalendarModal />
      <PlanView
        plans={plans ?? mockedPlans}
        defaultLayout={[40, 60]}
        navCollapsedSize={25}
      />
    </main>
  );
}
