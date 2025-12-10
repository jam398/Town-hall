import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@/components/ui/Pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when totalPages is 0', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} onPageChange={mockOnPageChange} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders pagination with correct number of pages', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
    );
    
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
    expect(currentPageButton).toHaveClass('bg-bauhaus-blue');
  });

  it('calls onPageChange when clicking a page number', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
    );
    
    fireEvent.click(screen.getByText('3'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when clicking next button', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
    );
    
    fireEvent.click(screen.getByLabelText(/next page/i));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when clicking previous button', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
    );
    
    fireEvent.click(screen.getByLabelText(/previous page/i));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
    );
    
    const prevButton = screen.getByLabelText(/previous page/i);
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />
    );
    
    const nextButton = screen.getByLabelText(/next page/i);
    expect(nextButton).toBeDisabled();
  });

  it('shows ellipsis for many pages when in middle', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    // Should show ellipsis
    const ellipses = screen.getAllByText('...');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('shows all pages when totalPages is 7 or less', () => {
    render(
      <Pagination currentPage={4} totalPages={7} onPageChange={mockOnPageChange} />
    );
    
    // Should show all 7 pages
    for (let i = 1; i <= 7; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
    
    // Should not show ellipsis
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('always shows first and last page', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('has accessible navigation landmark', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
    );
    
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination');
  });

  it('applies custom className', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={mockOnPageChange}
        className="custom-class"
      />
    );
    
    expect(screen.getByRole('navigation')).toHaveClass('custom-class');
  });
});
