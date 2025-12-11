import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('bg-swiss-white');
    expect(card).toHaveClass('border');
  });

  it('renders elevated variant', () => {
    render(<Card variant="elevated" data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('shadow-swiss-md');
  });

  it('renders outlined variant', () => {
    render(<Card variant="outlined" data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('border-2');
  });

  it('renders accent-red variant', () => {
    render(<Card variant="accent-red" data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('border-l-swiss-red');
  });

  it('renders accent-black variant', () => {
    render(<Card variant="accent-black" data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('border-l-swiss-black');
  });

  it('renders interactive variant with hover styles', () => {
    render(<Card interactive data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('cursor-pointer');
  });

  it('renders without padding when padding is none', () => {
    render(<Card padding="none" data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).not.toHaveClass('p-6');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });
});

describe('CardHeader', () => {
  it('renders children', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CardHeader className="custom-header" data-testid="header">Content</CardHeader>);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('custom-header');
  });
});

describe('CardTitle', () => {
  it('renders as h3 by default', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveTextContent('Title');
  });

  it('applies font-semibold styling', () => {
    render(<CardTitle data-testid="title">Title</CardTitle>);
    const title = screen.getByTestId('title');
    expect(title).toHaveClass('font-semibold');
  });
});

describe('CardDescription', () => {
  it('renders description text', () => {
    render(<CardDescription>Description text</CardDescription>);
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('has muted text color', () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>);
    const desc = screen.getByTestId('desc');
    expect(desc).toHaveClass('text-swiss-gray');
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    render(<CardContent>Content here</CardContent>);
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('renders children', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('has border-top styling', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('border-t');
  });
});

describe('Card composition', () => {
  it('renders full card with all subcomponents', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Event Title</CardTitle>
          <CardDescription>Event description</CardDescription>
        </CardHeader>
        <CardContent>Main content</CardContent>
        <CardFooter>Footer actions</CardFooter>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /event title/i })).toBeInTheDocument();
    expect(screen.getByText('Event description')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByText('Footer actions')).toBeInTheDocument();
  });
});
