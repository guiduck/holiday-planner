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

interface PlanProps {
  plans: PlanType[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function PlanView({
  plans,
  defaultLayout = [50, 50],
  defaultCollapsed = false,
  navCollapsedSize,
}: Readonly<PlanProps>) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const { selectedPlan, setDisplayPlans, displayPlans } = usePlansStore();

  React.useEffect(() => {
    setDisplayPlans(plans);
  }, [plans]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={20}
          maxSize={50}
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
              <PlanList items={displayPlans as PlanType[]} />
            </TabsContent>

            <TabsContent value="unread" className="m-0">
              <PlanList
                items={
                  displayPlans?.filter((item) => !item.archive) as PlanType[]
                }
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>

        <div className="hidden md:contents">
          <ResizableHandle withHandle />
        </div>

        <ResizablePanel
          className=""
          defaultSize={defaultLayout[1]}
          minSize={30}
        >
          <div className="hidden md:block">
            <PlanDisplay
              plan={
                displayPlans?.find((item) => item.id === selectedPlan?.id) ||
                null
              }
            />
          </div>
          <div className="block absolute top-0 left-0 w-full md:hidden">
            <div className="h-screen flex flex-col mt-[40%]">
              <PlanDisplay
                plan={
                  displayPlans?.find((item) => item.id === selectedPlan?.id) ||
                  null
                }
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
