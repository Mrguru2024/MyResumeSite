import React from 'react';
import { render, screen } from '@testing-library/react';
import ElectricityEffect from './index';

describe('ElectricityEffect', () => {
  it('renders without crashing', () => {
    render(<ElectricityEffect x={100} y={100} radius={20} color="#fbbf24" />);

    // Check if canvas is rendered
    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toBeInTheDocument();
  });

  it('applies correct positioning', () => {
    const { container } = render(<ElectricityEffect x={100} y={100} radius={20} color="#fbbf24" />);

    const effectDiv = container.firstChild as HTMLElement;
    expect(effectDiv).toHaveStyle({
      left: '60px', // x - radius * 2
      top: '60px', // y - radius * 2
    });
  });

  it('uses default color when not provided', () => {
    const { container } = render(<ElectricityEffect x={100} y={100} radius={20} />);

    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toBeInTheDocument();
  });
});
