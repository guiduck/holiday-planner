import type { Meta, StoryObj } from "@storybook/react";
import PlanCard from ".";
import { mockedPlans } from "@/mocks/plan-mock";

const meta = {
  title: "PlanCard",
  component: PlanCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    plan: { control: "object" },
    selectedPlan: { control: "object" },
    onSelectPlan: { action: "onSelectPlan" },
  },
  args: {
    plan: mockedPlans[0],
    selectedPlan: mockedPlans[0],
    onSelectPlan: () => {},
  },
} satisfies Meta<typeof PlanCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: { plan: mockedPlans[0], selectedPlan: mockedPlans[0] },
};

export const UnSelected: Story = {
  args: { plan: mockedPlans[0], selectedPlan: mockedPlans[1] },
};
