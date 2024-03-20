import type { Meta, StoryObj } from "@storybook/react";
import { ModeToggle } from ".";

const meta = {
  title: "ModeToggle",
  component: ModeToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
