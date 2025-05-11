import { render, screen, fireEvent } from '@testing-library/react';
import { Skills } from './index';

describe('Skills Component', () => {
  it('renders all skills initially', () => {
    render(<Skills />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Locksmithing')).toBeInTheDocument();
  });

  it('filters skills when category is selected', () => {
    render(<Skills />);
    
    // Click on Full Stack Dev category
    fireEvent.click(screen.getByText('Full Stack Dev'));
    
    // Should show React but not Locksmithing
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Locksmithing')).not.toBeInTheDocument();
  });

  it('shows skill description on hover', () => {
    render(<Skills />);
    
    const skillCard = screen.getByText('React').closest('div');
    fireEvent.mouseEnter(skillCard!);
    
    expect(screen.getByText(/Building modern, responsive web applications/)).toBeInTheDocument();
  });

  it('shows all skills when All category is selected', () => {
    render(<Skills />);
    
    // First select a category
    fireEvent.click(screen.getByText('Full Stack Dev'));
    // Then select All
    fireEvent.click(screen.getByText('All'));
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Locksmithing')).toBeInTheDocument();
  });
}); 