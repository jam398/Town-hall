import { render } from '@testing-library/react';
import { AccentBar } from '@/components/ui/AccentBar';

describe('AccentBar', () => {
  it('renders with default props', () => {
    const { container } = render(<AccentBar />);
    const bar = container.firstChild as HTMLElement;
    expect(bar).toHaveClass('bg-swiss-red');
    expect(bar).toHaveClass('w-12');
    expect(bar).toHaveClass('h-1');
  });

  it('renders with red color', () => {
    const { container } = render(<AccentBar color="red" />);
    const bar = container.firstChild as HTMLElement;
    expect(bar).toHaveClass('bg-swiss-red');
  });

  it('renders with black color', () => {
    const { container } = render(<AccentBar color="black" />);
    const bar = container.firstChild as HTMLElement;
    expect(bar).toHaveClass('bg-swiss-black');
  });

  it('renders with small size', () => {
    const { container } = render(<AccentBar size="sm" />);
    const bar = container.firstChild as HTMLElement;
    expect(bar).toHaveClass('w-8');
    expect(bar).toHaveClass('h-0.5');
  });

  it('renders with medium size', () => {
    const { container } = render(<AccentBar size="md" />);
    const bar = container.firstChild as HTMLElement;
    expect(bar).toHaveClass('w-12');
    expect(bar).toHaveClass('h-1');
  });

  it('renders with large size', () => {
    const { container } = render(<AccentBar size="lg" />);
    const bar = container.firstChild as HTMLElement;
    expect(bar).toHaveClass('w-16');
    expect(bar).toHaveClass('h-1');
  });

  it('applies custom className', () => {
    const { container } = render(<AccentBar className="mb-6" />);
    const bar = container.firstChild as HTMLElement;
    expect(bar).toHaveClass('mb-6');
  });

  it('has aria-hidden attribute for accessibility', () => {
    const { container } = render(<AccentBar />);
    const bar = container.firstChild as HTMLElement;
    expect(bar).toHaveAttribute('aria-hidden', 'true');
  });
});
