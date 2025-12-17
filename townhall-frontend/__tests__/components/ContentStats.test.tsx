import { render, screen } from '@testing-library/react';
import { ContentStats } from '@/components/ui/ContentStats';

const mockStats = [
  { value: 25, label: 'Events' },
  { value: 100, label: 'Members' },
  { value: '5+', label: 'Partners' },
  { value: 50, label: 'Workshops' },
];

describe('ContentStats', () => {
  it('renders all stat values', () => {
    render(<ContentStats stats={mockStats} />);
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('renders all stat labels', () => {
    render(<ContentStats stats={mockStats} />);
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('Partners')).toBeInTheDocument();
    expect(screen.getByText('Workshops')).toBeInTheDocument();
  });

  it('renders with empty stats array', () => {
    const { container } = render(<ContentStats stats={[]} />);
    expect(container.querySelector('.grid')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ContentStats stats={mockStats} className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
