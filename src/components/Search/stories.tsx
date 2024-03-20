import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Search } from ".";

const Exemple = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <Search onSearch={(query: string) => setValue(query)} /> <p>{value}</p>
    </>
  );
};

const meta = {
  title: "Search",
  component: Exemple,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onSearch: { action: "onSearch" },
  },
  args: {
    onSearch: () => {},
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
