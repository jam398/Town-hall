import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/ui/EmptyState';

describe('EmptyState', () => {
  describe('events variant', () => {
    it('renders default events title', () => {
      render(<EmptyState variant="events" />);
      expect(screen.getByText('No upcoming events')).toBeInTheDocument();
    });

    it('renders default events description', () => {
      render(<EmptyState variant="events" />);
      expect(screen.getByText(/Check back soon for new workshops/)).toBeInTheDocument();
    });
  });

  describe('posts variant', () => {
    it('renders default posts title', () => {
      render(<EmptyState variant="posts" />);
      expect(screen.getByText('No articles yet')).toBeInTheDocument();
    });

    it('renders default posts description', () => {
      render(<EmptyState variant="posts" />);
      expect(screen.getByText(/working on new content/)).toBeInTheDocument();
    });
  });

  describe('generic variant', () => {
    it('renders default generic title', () => {
      render(<EmptyState variant="generic" />);
      expect(screen.getByText('Nothing to show')).toBeInTheDocument();
    });

    it('renders default generic description', () => {
      render(<EmptyState variant="generic" />);
      expect(screen.getByText(/no content available/)).toBeInTheDocument();
    });
  });

  describe('custom content', () => {
    it('renders custom title', () => {
      render(<EmptyState title="Custom Title" />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('renders custom description', () => {
      render(<EmptyState description="Custom description text" />);
      expect(screen.getByText('Custom description text')).toBeInTheDocument();
    });
  });

  describe('action button', () => {
    it('renders action button when props provided', () => {
      render(
        <EmptyState
          actionLabel="View All"
          actionHref="/all"
        />
      );
      const link = screen.getByRole('link', { name: 'View All' });
      expect(link).toHaveAttribute('href', '/all');
    });

    it('does not render action button when props not provided', () => {
      render(<EmptyState />);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('defaults', () => {
    it('defaults to generic variant', () => {
      render(<EmptyState />);
      expect(screen.getByText('Nothing to show')).toBeInTheDocument();
    });
  });
});
