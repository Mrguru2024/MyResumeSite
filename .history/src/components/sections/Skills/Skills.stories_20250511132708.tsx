import type { Meta, StoryObj } from "@storybook/react";
import Skills from "./index";

const meta: Meta<typeof Skills> = {
  title: "Sections/Skills",
  component: Skills,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skills>;

export const Default: Story = {
  args: {},
}; 