import { render, screen } from '@testing-library/react';
import { FeaturedEvent } from '@/components/ui/FeaturedEvent';

const mockEvent = {
  slug: 'ai-workshop',
  title: 'Introduction to AI Workshop',
  description: 'Learn the basics of artificial intelligence in this hands-on workshop.',
  date: '2024-02-15T12:00:00',
  time: '6:00 PM',
  location: 'Newark Public Library',
  capacity: 50,
  registered: 35,
  tags: ['AI', 'Beginner'],
};

describe('FeaturedEvent', () => {
  it('renders event title', () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
  });

  it('renders event description', () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText(mockEvent.description)).toBeInTheDocument();
  });

  it('renders event time', () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText(mockEvent.time)).toBeInTheDocument();
  });

  it('renders event location', () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
  });

  it('renders register link with correct href', () => {
    render(<FeaturedEvent event={mockEvent} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/events/${mockEvent.slug}`);
  });

  it('renders tags when provided', () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('handles event without tags', () => {
    const eventWithoutTags = { ...mockEvent, tags: undefined };
    render(<FeaturedEvent event={eventWithoutTags} />);
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
  });

  it('renders NEXT EVENT label', () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText('NEXT EVENT')).toBeInTheDocument();
  });

  it('renders Register Now text', () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText('Register Now')).toBeInTheDocument();
  });
});
