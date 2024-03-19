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
import { PlanList } from "./plan-list";
import { usePlansStore } from "@/stores/plan-store";
import { Search } from "../Search";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { Button } from "../ui/button";
import { Drawer, DrawerContent } from "../ui/drawer";
import { useModalStore } from "@/stores/modal-control";
import dynamic from "next/dynamic";
import { Spinner } from "../Spinner";
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
  plans: PlanType[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  currentDate?: string;
}

export function PlanView({
  plans,
  defaultLayout = [50, 50],
  defaultCollapsed = false,
  navCollapsedSize,
  currentDate,
}: Readonly<PlanProps>) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const { selectedPlan, setDisplayPlans, displayPlans, setSelectedPlan } =
    usePlansStore();
  const { showAddPlan, setShowAddPlan } = useModalStore();
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    if (plans.length > 0) {
      setDisplayPlans(plans);
    }
  }, [plans]);

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
                <Search plans={plans} />
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
              <PlanList items={displayPlans} selectedPlan={selectedPlan} />
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
