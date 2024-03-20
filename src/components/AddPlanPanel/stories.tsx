import type { Meta, StoryObj } from "@storybook/react";
import AddPlan from ".";

const meta = {
  title: "AddPlanPanel",
  component: AddPlan,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    forDrawer: {
      control: "boolean",
    },
  },
  args: {
    forDrawer: true,
  },
} satisfies Meta<typeof AddPlan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const forDrawer: Story = {
  args: { forDrawer: true },
};

export const noDrawer: Story = {
  args: { forDrawer: false },
};
