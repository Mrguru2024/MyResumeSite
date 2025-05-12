import type { Meta, StoryObj } from '@storybook/react';
import ElectricityEffect from './index';

const meta: Meta<typeof ElectricityEffect> = {
  title: 'UI/ElectricityEffect',
  component: ElectricityEffect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ElectricityEffect>;

export const Default: Story = {
  args: {
    x: 100,
    y: 100,
    radius: 20,
    color: '#fbbf24',
  },
};

export const Large: Story = {
  args: {
    x: 100,
    y: 100,
    radius: 40,
    color: '#fbbf24',
  },
};

export const CustomColor: Story = {
  args: {
    x: 100,
    y: 100,
    radius: 20,
    color: '#3b82f6',
  },
}; 