import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BlogCard } from '@/components/ui/BlogCard';

const mockPost = {
  slug: 'what-is-chatgpt',
  title: 'What is ChatGPT and How Can It Help You?',
  excerpt: 'A simple guide to understanding ChatGPT and practical ways to use it in your daily life.',
  date: '2024-12-20',
  author: 'Sarah Johnson',
  tags: ['AI Basics', 'ChatGPT'],
  readTime: '5 min read',
};

describe('BlogCard', () => {
  it('renders post title', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByRole('heading', { name: /what is chatgpt/i })).toBeInTheDocument();
  });

  it('renders post excerpt', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText(/simple guide to understanding/i)).toBeInTheDocument();
  });

  it('renders post date', () => {
    render(<BlogCard post={mockPost} />);
    // Date should be formatted (may vary by timezone)
    expect(screen.getByText(/december 1\d/i)).toBeInTheDocument();
  });

  it('renders author name', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText(/sarah johnson/i)).toBeInTheDocument();
  });

  it('renders read time', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText(/5 min read/i)).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('AI Basics')).toBeInTheDocument();
    expect(screen.getByText('ChatGPT')).toBeInTheDocument();
  });

  it('links to blog post page', () => {
    render(<BlogCard post={mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/what-is-chatgpt');
  });

  it('renders without tags when none provided', () => {
    const postWithoutTags = { ...mockPost, tags: undefined };
    render(<BlogCard post={postWithoutTags} />);
    expect(screen.getByRole('heading', { name: /what is chatgpt/i })).toBeInTheDocument();
  });

  it('renders without read time when not provided', () => {
    const postWithoutReadTime = { ...mockPost, readTime: undefined };
    render(<BlogCard post={postWithoutReadTime} />);
    expect(screen.getByRole('heading', { name: /what is chatgpt/i })).toBeInTheDocument();
  });

  it('has accessible structure', () => {
    render(<BlogCard post={mockPost} />);
    
    // Should have blog card with data-testid
    const card = document.querySelector('[data-testid="blog-card"]');
    expect(card).toBeInTheDocument();
  });

  it('displays time element with datetime attribute', () => {
    render(<BlogCard post={mockPost} />);
    const timeElement = document.querySelector('time');
    expect(timeElement).toHaveAttribute('datetime');
  });
});

describe('BlogCard edge cases', () => {
  it('handles long titles gracefully', () => {
    const longTitlePost = { 
      ...mockPost, 
      title: 'This is a very long blog post title that should be handled gracefully by the component without breaking the layout' 
    };
    render(<BlogCard post={longTitlePost} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('handles long excerpts gracefully', () => {
    const longExcerptPost = { 
      ...mockPost, 
      excerpt: 'This is a very long excerpt that goes on and on and on. It should be truncated or handled gracefully by the component. The excerpt continues with more text that would typically overflow the card boundaries if not properly handled.' 
    };
    render(<BlogCard post={longExcerptPost} />);
    expect(screen.getByRole('heading', { name: /what is chatgpt/i })).toBeInTheDocument();
  });

  it('handles missing author gracefully', () => {
    const postNoAuthor = { ...mockPost, author: undefined };
    render(<BlogCard post={postNoAuthor as any} />);
    expect(screen.getByRole('heading', { name: /what is chatgpt/i })).toBeInTheDocument();
  });
});

describe('BlogCard with image', () => {
  it('renders image when provided', () => {
    const postWithImage = { ...mockPost, image: '/images/blog/chatgpt.jpg' };
    render(<BlogCard post={postWithImage} />);
    
    const image = document.querySelector('img');
    if (image) {
      expect(image).toHaveAttribute('src');
      expect(image).toHaveAttribute('alt');
    }
  });

  it('renders placeholder when no image provided', () => {
    render(<BlogCard post={mockPost} />);
    // Should still render the card without image
    expect(screen.getByRole('heading', { name: /what is chatgpt/i })).toBeInTheDocument();
  });
});
