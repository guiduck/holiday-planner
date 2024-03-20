import { Alert } from "@/components/Alert";
import { PDFModal } from "@/components/PDFModal";
import { PlanView } from "@/components/PlanView";
import getDateCookie from "@/lib/actions/get-Date";
import { getPlans } from "@/lib/actions/get-Plans";
import { testFetch } from "@/lib/actions/testfetch";
import { PlanType } from "@/models/plan-models";
import { Suspense } from "react";

export default async function Home() {
  const dateResponse = await getDateCookie();
  const planResponse = await getPlans();
  const test = await testFetch();
  let plans: PlanType[] = [];

  if (planResponse?.message === "success") {
    //@ts-ignore
    plans = planResponse?.data;
    console.log(plans);
  }

  return (
    <main className="flex min flex-col h-full items-center justify-between p-10 h-screen">
      <Alert />
      <Suspense>
        <PDFModal />
      </Suspense>
      {test && JSON.stringify(test)}
      {plans && JSON.stringify(plans)}
      <Suspense>
        <PlanView
          currentDate={dateResponse?.data}
          defaultLayout={[40, 60]}
          navCollapsedSize={5}
          plans={plans}
        />
      </Suspense>
    </main>
  );
}
