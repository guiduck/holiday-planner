"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { TooltipProvider } from "../ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { PlanType } from "@/models/plan-models";
import { usePlansStore } from "@/stores/plan-store";
import { Search } from "../Search";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { Button } from "../ui/button";
import { Drawer, DrawerContent } from "../ui/drawer";
import { useModalStore } from "@/stores/modal-control";
import dynamic from "next/dynamic";
import { Spinner } from "../Spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import setPlanIdCookie from "@/lib/actions/set-PlanId";
import { PlanList } from "../PlanList";
import { getPlans } from "@/lib/actions/get-Plans";
import { useAlertStore } from "@/stores/alert-store";
const AddPlan = dynamic(() => import("../AddPlanPanel"), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="w-8 m-auto" />
    </div>
  ),
});
const PlanDisplay = dynamic(() => import("../PlanDisplay"), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="w-8 m-auto" />
    </div>
  ),
});

interface PlanProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  currentDate?: string;
}

export function PlanView({
  defaultLayout = [50, 50],
  defaultCollapsed = false,
  navCollapsedSize,
  currentDate,
}: Readonly<PlanProps>) {
  const [plans, setPlans] = React.useState<PlanType[]>([]);
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const { selectedPlan, setDisplayPlans, displayPlans, setSelectedPlan } =
    usePlansStore();
  const { showAddPlan, setShowAddPlan } = useModalStore();
  const { setAlertData } = useAlertStore();

  const { width } = useWindowDimensions();

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const getPlansData = async () => {
    const plansResult = await getPlans();

    if (plansResult.message === "success") {
      const { data: plansData } = plansResult;
      // @ts-ignore
      setPlans(plansData);
    } else {
      setAlertData({
        show: true,
        message: plansResult?.data as string,
        time: 5000,
        type: "error",
      });
    }
  };

  React.useEffect(() => {
    getPlansData();
  }, []);

  React.useEffect(() => {
    if (plans.length > 0) {
      setDisplayPlans(plans);
    }
  }, [plans]);

  const onSelectPlan = async (plan: PlanType) => {
    const params = new URLSearchParams(searchParams);
    let selected = selectedPlan;

    if (selectedPlan?.id !== plan?.id) {
      selected = plan;
      params.set("planId", plan?.id);
      await setPlanIdCookie(plan?.id);
    }

    if (selectedPlan?.id === plan?.id && selectedPlan !== undefined) {
      selected = undefined;
      params.delete("planId");
    }

    replace(`${pathname}?${params.toString()}`);
    return setSelectedPlan(selected);
  };

  const onSearch = (query: string) => {
    setDisplayPlans(
      plans.filter(
        (plan) =>
          plan.title.includes(query) ||
          plan.description?.includes(query) ||
          plan.date.includes(query)
      )
    );
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction={"horizontal"}
        // direction={width >= 768 ? "horizontal" : "vertical"}
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="fixed md:relative h-full max-h-[800px] items-stretch "
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={10}
          maxSize={100}
          // @ts-ignore
          onCollapse={(collapsed) => {
            setIsCollapsed(collapsed);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
            // "min-w-[50px] transition-all duration-300 ease-in-out overflow-y-scroll"
          )}
        >
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Your Plans</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All plans
                </TabsTrigger>
                <TabsTrigger
                  value="date"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  date
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Archives
                </TabsTrigger>
              </TabsList>
            </div>

            <Separator />

            <div className="flex bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60  gap-4">
              <div className="grow">
                <Search onSearch={onSearch} />
              </div>
              {width < 768 && (
                <div className="md:hidden">
                  <Drawer
                    open={!!selectedPlan || showAddPlan}
                    onClose={() => {
                      if (showAddPlan) setShowAddPlan(false);
                      if (selectedPlan) setSelectedPlan(undefined);
                    }}
                  >
                    <Button onClick={() => setShowAddPlan(true)}>
                      Create Plan
                    </Button>
                    <DrawerContent className="md:hidden">
                      {selectedPlan ? <PlanDisplay /> : <AddPlan forDrawer />}
                    </DrawerContent>
                  </Drawer>
                </div>
              )}
            </div>

            <TabsContent value="all" className="m-0">
              <PlanList
                items={displayPlans}
                selectedPlan={selectedPlan}
                onSelectPlan={onSelectPlan}
              />
            </TabsContent>

            <TabsContent value="unread" className="m-0">
              <PlanList
                items={displayPlans.filter((item) => item.archived)}
                selectedPlan={selectedPlan}
              />
            </TabsContent>

            <TabsContent value="date" className="m-0">
              <PlanList
                items={displayPlans.filter((item) => item.date === currentDate)}
                selectedPlan={selectedPlan}
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>

        <div className="hidden md:contents">
          <ResizableHandle withHandle />
        </div>

        <ResizablePanel
          // className="bg-pattern"
          className="bg-background hidden md:block"
          defaultSize={defaultLayout[1]}
          minSize={10}
        >
          <PlanDisplay />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
