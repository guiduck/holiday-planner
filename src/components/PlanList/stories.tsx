import type { Meta, StoryObj } from "@storybook/react";
import { mockedPlans } from "@/mocks/plan-mock";
import { PlanList } from ".";

const meta = {
  title: "PlanList",
  component: PlanList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selectedPlan: { control: "object" },
    onSelectPlan: { action: "onSelectPlan" },
    items: { control: "array" },
  },
  args: {
    items: mockedPlans,
    selectedPlan: mockedPlans[0],
    onSelectPlan: () => {},
  },
} satisfies Meta<typeof PlanList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    items: mockedPlans,
    selectedPlan: mockedPlans[0],
    onSelectPlan: () => {},
  },
};

export const UnSelected: Story = {
  args: { items: mockedPlans, selectedPlan: undefined, onSelectPlan: () => {} },
};
