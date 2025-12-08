import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { EventCard } from '@/components/ui/EventCard';

const mockEvent = {
  slug: 'intro-to-ai',
  title: 'Introduction to AI',
  description: 'A beginner-friendly workshop covering the basics of artificial intelligence.',
  date: '2025-01-15',
  time: '6:00 PM',
  location: 'Newark Public Library',
  capacity: 50,
  registered: 32,
  tags: ['Beginner', 'Workshop'],
};

describe('EventCard', () => {
  it('renders event title', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByRole('heading', { name: /introduction to ai/i })).toBeInTheDocument();
  });

  it('renders event description', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText(/beginner-friendly workshop/i)).toBeInTheDocument();
  });

  it('renders event date', () => {
    render(<EventCard event={mockEvent} />);
    // Date should be formatted and displayed
    expect(screen.getByText(/january 15/i)).toBeInTheDocument();
  });

  it('renders event time', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText(/6:00 pm/i)).toBeInTheDocument();
  });

  it('renders event location', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText(/newark public library/i)).toBeInTheDocument();
  });

  it('renders event tags', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Workshop')).toBeInTheDocument();
  });

  it('renders capacity information', () => {
    render(<EventCard event={mockEvent} />);
    // Should show spots remaining or capacity
    expect(screen.getByText(/18 spots left|32\/50/i)).toBeInTheDocument();
  });

  it('links to event detail page', () => {
    render(<EventCard event={mockEvent} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/events/intro-to-ai');
  });

  it('shows full indicator when event is at capacity', () => {
    const fullEvent = { ...mockEvent, registered: 50 };
    render(<EventCard event={fullEvent} />);
    expect(screen.getByText(/full|no spots/i)).toBeInTheDocument();
  });

  it('renders without tags when none provided', () => {
    const eventWithoutTags = { ...mockEvent, tags: undefined };
    render(<EventCard event={eventWithoutTags} />);
    expect(screen.getByRole('heading', { name: /introduction to ai/i })).toBeInTheDocument();
  });

  it('has accessible structure', () => {
    render(<EventCard event={mockEvent} />);
    
    // Should have article or card role
    const card = screen.getByRole('article') || document.querySelector('[data-testid="event-card"]');
    expect(card).toBeInTheDocument();
  });

  it('displays time element with datetime attribute', () => {
    render(<EventCard event={mockEvent} />);
    const timeElement = document.querySelector('time');
    expect(timeElement).toHaveAttribute('datetime');
  });
});

describe('EventCard edge cases', () => {
  it('handles missing capacity gracefully', () => {
    const eventNoCapacity = { ...mockEvent, capacity: undefined, registered: undefined };
    render(<EventCard event={eventNoCapacity as any} />);
    expect(screen.getByRole('heading', { name: /introduction to ai/i })).toBeInTheDocument();
  });

  it('handles long titles gracefully', () => {
    const longTitleEvent = { 
      ...mockEvent, 
      title: 'This is a very long event title that should be handled gracefully by the component' 
    };
    render(<EventCard event={longTitleEvent} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
