import type { Meta, StoryObj } from "@storybook/react";
import PDFView, { PDFViewProps } from ".";
import { mockedPlans } from "@/mocks/plan-mock";

const Component = ({ ...args }: PDFViewProps) => (
  <div className="w-full h-full">
    <PDFView {...args} />
  </div>
);

const meta = {
  title: "PDF",
  component: Component,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    plan: { control: "object" },
  },
  args: {
    plan: mockedPlans[0],
    storybook: true,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PDFView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { plan: mockedPlans[0], storybook: true },
};
