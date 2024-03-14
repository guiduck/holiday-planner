import { PlanView } from "@/components/PlanView";
import { plans } from "@/components/PlanView/types";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PlanView plans={plans} defaultLayout={[40, 60]} navCollapsedSize={25} />
    </main>
  );
}
