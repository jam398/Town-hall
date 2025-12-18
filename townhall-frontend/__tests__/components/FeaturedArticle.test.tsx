import { render, screen } from '@testing-library/react';
import { FeaturedArticle } from '@/components/ui/FeaturedArticle';

const mockPost = {
  slug: 'getting-started-with-ai',
  title: 'Getting Started with AI: A Beginner\'s Guide',
  excerpt: 'Learn the fundamentals of artificial intelligence and how to get started on your AI journey.',
  date: '2024-02-10',
  author: 'Dr. Sarah Chen',
  tags: ['AI', 'Tutorial'],
  readTime: '5 min read',
};

describe('FeaturedArticle', () => {
  it('renders article title', () => {
    render(<FeaturedArticle post={mockPost} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });

  it('renders article excerpt', () => {
    render(<FeaturedArticle post={mockPost} />);
    expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument();
  });

  it('renders author name', () => {
    render(<FeaturedArticle post={mockPost} />);
    expect(screen.getByText(mockPost.author)).toBeInTheDocument();
  });

  it('renders read time', () => {
    render(<FeaturedArticle post={mockPost} />);
    expect(screen.getByText(mockPost.readTime)).toBeInTheDocument();
  });

  it('renders read article link', () => {
    render(<FeaturedArticle post={mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/blog/${mockPost.slug}`);
  });

  it('renders tags when provided', () => {
    render(<FeaturedArticle post={mockPost} />);
    // Tags are rendered in the component
    expect(screen.getByText('Tutorial')).toBeInTheDocument();
  });

  it('handles post without tags', () => {
    const postWithoutTags = { ...mockPost, tags: undefined };
    render(<FeaturedArticle post={postWithoutTags} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });

  it('handles post without readTime', () => {
    const postWithoutReadTime = { ...mockPost, readTime: undefined };
    render(<FeaturedArticle post={postWithoutReadTime} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });
});
