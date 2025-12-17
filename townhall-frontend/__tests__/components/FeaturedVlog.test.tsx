import { render, screen } from '@testing-library/react';
import { FeaturedVlog } from '@/components/ui/FeaturedVlog';

const mockVlog = {
  id: '1',
  youtubeId: 'abc123',
  title: 'AI Workshop Highlights',
  description: 'Watch the highlights from our latest AI workshop.',
  thumbnail: 'https://example.com/thumbnail.jpg',
  duration: '15:30',
  views: 1200,
  date: '2024-02-01',
};

describe('FeaturedVlog', () => {
  it('renders vlog title', () => {
    render(<FeaturedVlog vlog={mockVlog} />);
    expect(screen.getByText(mockVlog.title)).toBeInTheDocument();
  });

  it('renders vlog description', () => {
    render(<FeaturedVlog vlog={mockVlog} />);
    expect(screen.getByText(mockVlog.description)).toBeInTheDocument();
  });

  it('renders duration', () => {
    render(<FeaturedVlog vlog={mockVlog} />);
    expect(screen.getByText(mockVlog.duration)).toBeInTheDocument();
  });

  it('renders views count', () => {
    render(<FeaturedVlog vlog={mockVlog} />);
    expect(screen.getByText(/1,200 views/)).toBeInTheDocument();
  });

  it('renders watch now link', () => {
    render(<FeaturedVlog vlog={mockVlog} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining(mockVlog.youtubeId));
  });

  it('renders Watch Now text', () => {
    render(<FeaturedVlog vlog={mockVlog} />);
    expect(screen.getByText('Watch Now')).toBeInTheDocument();
  });
});
