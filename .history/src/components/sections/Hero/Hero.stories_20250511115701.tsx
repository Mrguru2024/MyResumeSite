import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./index";

const meta: Meta<typeof Hero> = {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    title: 'Anthony "Mrguru" Feaster',
    subtitle: "I fix. I code. I lead. I build what's needed.",
  },
};

export const CustomTitle: Story = {
  args: {
    title: "Custom Title",
    subtitle: "Custom subtitle text here.",
  },
};
