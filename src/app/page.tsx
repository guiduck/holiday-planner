import { Alert } from "@/components/Alert";
import { CalendarModal } from "@/components/CalendarModal";
import { PDFModal } from "@/components/ModalPDF";
import { PlanView } from "@/components/PlanView";
import getDateCookie from "@/lib/actions/get-Date";
import { getPlans } from "@/lib/actions/get-Plans";
import { PlanType } from "@/models/plan-models";

export default async function Home() {
  const planResponse = await getPlans();
  const dateResponse = await getDateCookie();
  let plans: PlanType[] = [];

  if (planResponse.message === "success") {
    plans = planResponse.data;
  }

  return (
    <main className="flex min flex-col h-full items-center justify-between p-24">
      {(planResponse.message === "error" ||
        dateResponse?.message === "error") && (
        <Alert
          show
          message={JSON.stringify(planResponse.data || dateResponse?.data)}
        />
      )}
      <Alert />
      <CalendarModal />
      <PDFModal />
      <PlanView
        plans={plans}
        currentDate={dateResponse?.data}
        defaultLayout={[40, 60]}
        navCollapsedSize={5}
      />
    </main>
  );
}
