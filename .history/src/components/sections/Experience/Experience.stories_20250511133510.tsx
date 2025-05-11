import type { Meta, StoryObj } from "@storybook/react";
import Experience from "./index";

const meta: Meta<typeof Experience> = {
  title: "Sections/Experience",
  component: Experience,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Experience>;

export const Default: Story = {
  args: {},
};
