import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Alert } from "./index";

const meta = {
  title: "Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "string" },
  },
  args: {
    show: true,
    message: " this is an alert component",
    time: 50000,
    type: "neutral",
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NeutralType: Story = {
  args: { type: "neutral" },
};

export const ErrorType: Story = {
  args: { type: "error" },
};

export const SuccessType: Story = {
  args: { type: "success" },
};
