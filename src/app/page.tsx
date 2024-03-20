import { Alert } from "@/components/Alert";
import { PDFModal } from "@/components/PDFModal";
import { PlanView } from "@/components/PlanView";
import getDateCookie from "@/lib/actions/get-Date";
import { getPlansAction } from "@/lib/actions/get-Plans";
import { PlanType } from "@/models/plan-models";
import { Suspense } from "react";

async function getPlans() {
  try {
    let plans;

    const URL =
      process.env.NODE_ENV !== "development"
        ? process.env.URL_PROD
        : process.env.URL_LOCAL;

    const response = await fetch(`${URL}/api/plans`, {
      next: {
        tags: ["get-plans"],
      },
      cache: "no-store",
    });

    if (response.ok) {
      plans = (await response.json()).data;
    }

    if (!plans) {
      const actionResult = await getPlansAction();

      if (actionResult?.message === "success") {
        plans = actionResult?.data;
      } else {
        return { ...actionResult };
      }
    }

    return { message: "success", data: plans };
  } catch (error) {
    return { message: "error", data: "Failed to get Plans." };
  }
}

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
