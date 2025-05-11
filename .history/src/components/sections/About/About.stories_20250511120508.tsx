import type { Meta, StoryObj } from '@storybook/react';
import { About } from './index';

const meta: Meta<typeof About> = {
  title: 'Sections/About',
  component: About,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof About>;

export const Default: Story = {}; 