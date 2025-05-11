import { render, screen } from '@testing-library/react';
import { Section } from './index';

describe('Section Component', () => {
  const mockProps = {
    id: 'test-section',
    title: 'Test Section',
    children: <div>Test Content</div>,
  };

  it('renders the section with title and content', () => {
    render(<Section {...mockProps} />);
    
    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the correct id to the section', () => {
    render(<Section {...mockProps} />);
    
    const section = document.getElementById('test-section');
    expect(section).toBeInTheDocument();
  });

  it('applies additional className when provided', () => {
    render(<Section {...mockProps} className="custom-class" />);
    
    const section = document.getElementById('test-section');
    expect(section).toHaveClass('custom-class');
  });
}); 