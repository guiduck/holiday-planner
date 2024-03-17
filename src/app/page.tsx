import { Alert } from "@/components/Alert";
import { CalendarModal } from "@/components/CalendarModal";
import { PDFModal } from "@/components/ModalPDF";
import { PlanView } from "@/components/PlanView";
import getDateCookie from "@/lib/actions/get-Date";
import { getPlans } from "@/lib/actions/get-Plans";
import getErrors from "@/lib/actions/get-errors";
import { PlanType } from "@/models/plan-models";

export default async function Home() {
  const plans: PlanType[] = await getPlans();
  const currentDate = await getDateCookie();
  const errorObj = await getErrors();

  return (
    <main className="flex min flex-col h-full items-center justify-between p-24">
      <CalendarModal />
      <Alert {...errorObj} />
      {/* <PDFModal /> */}
      <PlanView
        plans={plans ?? []}
        currentDate={currentDate}
        defaultLayout={[40, 60]}
        navCollapsedSize={5}
      />
    </main>
  );
}
