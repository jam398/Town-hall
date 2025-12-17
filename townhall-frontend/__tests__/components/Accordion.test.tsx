import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '@/components/ui/Accordion';

const mockItems = [
  { question: 'Question 1?', answer: 'Answer 1' },
  { question: 'Question 2?', answer: 'Answer 2' },
  { question: 'Question 3?', answer: 'Answer 3' },
];

describe('Accordion', () => {
  it('renders all items', () => {
    render(<Accordion items={mockItems} />);
    
    expect(screen.getByText('Question 1?')).toBeInTheDocument();
    expect(screen.getByText('Question 2?')).toBeInTheDocument();
    expect(screen.getByText('Question 3?')).toBeInTheDocument();
  });

  it('has proper ARIA attributes on buttons', () => {
    render(<Accordion items={mockItems} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button, index) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls', `accordion-content-${index}`);
    });
  });

  it('expands item when clicked', () => {
    render(<Accordion items={mockItems} />);
    
    const firstButton = screen.getByText('Question 1?').closest('button');
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(firstButton!);
    
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses item when clicked again', () => {
    render(<Accordion items={mockItems} />);
    
    const firstButton = screen.getByText('Question 1?').closest('button');
    
    fireEvent.click(firstButton!);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    
    fireEvent.click(firstButton!);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('only allows one item open at a time', () => {
    render(<Accordion items={mockItems} />);
    
    const firstButton = screen.getByText('Question 1?').closest('button');
    const secondButton = screen.getByText('Question 2?').closest('button');
    
    fireEvent.click(firstButton!);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(secondButton!);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('has proper region role', () => {
    render(<Accordion items={mockItems} />);
    
    const region = screen.getByRole('region', { name: /frequently asked questions/i });
    expect(region).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Accordion items={mockItems} className="custom-class" />);
    
    const region = screen.getByRole('region', { name: /frequently asked questions/i });
    expect(region).toHaveClass('custom-class');
  });

  it('renders answer content', () => {
    render(<Accordion items={mockItems} />);
    
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
    expect(screen.getByText('Answer 2')).toBeInTheDocument();
    expect(screen.getByText('Answer 3')).toBeInTheDocument();
  });
});
