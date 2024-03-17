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
import { PlanDisplay } from "./plan-display";
import { usePlansStore } from "@/stores/plan-store";
import { Search } from "../Search";
import { useWindowDimensions } from "hooks/useWindowDimensions";

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
  const { selectedPlan, setDisplayPlans, displayPlans } = usePlansStore();
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    console.log("plans", plans);
    if (plans.length > 0) {
      setDisplayPlans(plans);
    }
    console.log(width);
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
        className="fixed md:relative h-full max-h-[800px] items-stretch"
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

            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <Search plans={plans} />
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

        {/* <ResizableHandle withHandle /> */}

        <ResizablePanel
          className=""
          defaultSize={defaultLayout[1]}
          minSize={10}
        >
          {/* <div>
            <PlanDisplay
              plan={
                displayPlans?.find((item) => item.id === selectedPlan?.id) ||
                null
              }
            />
          </div> */}
          <div className="hidden md:block">
            <PlanDisplay
              plan={
                displayPlans?.find((item) => item.id === selectedPlan?.id) ||
                null
              }
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <div className="block bg-background  absolute top-[90%] left-0 w-full md:hidden">
        <div className="h-screen flex flex-col">
          <PlanDisplay
            plan={
              displayPlans?.find((item) => item.id === selectedPlan?.id) || null
            }
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
