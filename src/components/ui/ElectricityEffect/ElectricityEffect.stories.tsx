import type { Meta, StoryObj } from '@storybook/react';
import ElectricityEffect from './index';

const meta: Meta<typeof ElectricityEffect> = {
  title: 'UI/ElectricityEffect',
  component: ElectricityEffect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    intensity: {
      control: 'select',
      options: ['low', 'medium', 'high'],
    },
    variation: {
      control: 'select',
      options: ['standard', 'pulse', 'spiral'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ElectricityEffect>;

export const Default: Story = {
  args: {
    x: 100,
    y: 100,
    radius: 20,
    color: '#fbbf24',
    intensity: 'medium',
    variation: 'standard',
  },
};

export const HighIntensity: Story = {
  args: {
    x: 100,
    y: 100,
    radius: 20,
    color: '#fbbf24',
    intensity: 'high',
    variation: 'standard',
  },
};

export const LowIntensity: Story = {
  args: {
    x: 100,
    y: 100,
    radius: 20,
    color: '#fbbf24',
    intensity: 'low',
    variation: 'standard',
  },
};

export const SpiralVariation: Story = {
  args: {
    x: 100,
    y: 100,
    radius: 20,
    color: '#fbbf24',
    intensity: 'medium',
    variation: 'spiral',
  },
};

export const PulseVariation: Story = {
  args: {
    x: 100,
    y: 100,
    radius: 20,
    color: '#fbbf24',
    intensity: 'medium',
    variation: 'pulse',
  },
};

export const CustomColor: Story = {
  args: {
    x: 100,
    y: 100,
    radius: 20,
    color: '#3b82f6',
    intensity: 'high',
    variation: 'spiral',
  },
}; 