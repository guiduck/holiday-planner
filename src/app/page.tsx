import { Alert } from "@/components/Alert";
import { PDFModal } from "@/components/PDFModal";
import { PlanView } from "@/components/PlanView";
import getDateCookie from "@/lib/actions/get-Date";
import { getPlans } from "@/lib/actions/get-Plans";
import { PlanType } from "@/models/plan-models";
import { Suspense } from "react";

export default async function Home() {
  const planResponse = await getPlans();
  const dateResponse = await getDateCookie();
  let plans: PlanType[] = [];

  if (planResponse.message === "success") {
    plans = planResponse.data;
  }

  return (
    <main className="flex min flex-col h-full items-center justify-between p-10 h-screen">
      {(planResponse.message === "error" ||
        dateResponse?.message === "error") && (
        <Alert
          show
          message={JSON.stringify(planResponse.data || dateResponse?.data)}
        />
      )}
      <Alert />
      <Suspense>
        <PDFModal />
      </Suspense>
      <Suspense>
        <PlanView
          plans={plans}
          currentDate={dateResponse?.data}
          defaultLayout={[40, 60]}
          navCollapsedSize={5}
        />
      </Suspense>
    </main>
  );
}
