import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '@/components/ui/SearchInput';

describe('SearchInput', () => {
  const mockOnChange = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default placeholder', () => {
    render(<SearchInput />);
    
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchInput placeholder="Find events..." />);
    
    expect(screen.getByPlaceholderText('Find events...')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    render(<SearchInput onChange={mockOnChange} />);
    
    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');
    
    // onChange is called for each keystroke with the cumulative value
    expect(mockOnChange).toHaveBeenCalledTimes(4);
    expect(mockOnChange).toHaveBeenNthCalledWith(1, 't');
    expect(mockOnChange).toHaveBeenNthCalledWith(2, 'te');
    expect(mockOnChange).toHaveBeenNthCalledWith(3, 'tes');
    expect(mockOnChange).toHaveBeenNthCalledWith(4, 'test');
  });

  it('calls onChange with correct value on each keystroke', async () => {
    const user = userEvent.setup();
    const values: string[] = [];
    const trackingOnChange = (value: string) => values.push(value);
    
    render(<SearchInput onChange={trackingOnChange} />);
    
    const input = screen.getByRole('searchbox');
    await user.type(input, 'abc');
    
    // Verify the progression of values
    expect(values).toEqual(['a', 'ab', 'abc']);
  });

  it('calls onSearch when pressing Enter', async () => {
    const user = userEvent.setup();
    render(<SearchInput onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('searchbox');
    await user.type(input, 'test query');
    await user.keyboard('{Enter}');
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('shows clear button when there is a value', async () => {
    const user = userEvent.setup();
    render(<SearchInput />);
    
    const input = screen.getByRole('searchbox');
    
    // Initially no clear button
    expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();
    
    // Type something
    await user.type(input, 'test');
    
    // Clear button should appear
    expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
  });

  it('clears input when clicking clear button', async () => {
    const user = userEvent.setup();
    render(<SearchInput onChange={mockOnChange} onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');
    
    const clearButton = screen.getByLabelText(/clear search/i);
    await user.click(clearButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('works as controlled component', () => {
    render(<SearchInput value="controlled value" onChange={mockOnChange} />);
    
    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('controlled value');
  });

  it('works as uncontrolled component', async () => {
    const user = userEvent.setup();
    render(<SearchInput />);
    
    const input = screen.getByRole('searchbox');
    await user.type(input, 'uncontrolled');
    
    expect(input).toHaveValue('uncontrolled');
  });

  it('applies custom className', () => {
    render(<SearchInput className="custom-class" />);
    
    const container = screen.getByRole('searchbox').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('has accessible label', () => {
    render(<SearchInput placeholder="Search events" />);
    
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('aria-label', 'Search events');
  });

  it('hides clear button when value is empty', async () => {
    const user = userEvent.setup();
    render(<SearchInput />);
    
    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');
    
    // Clear button visible
    expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
    
    // Clear the input
    await user.clear(input);
    
    // Clear button should be hidden
    expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();
  });
});
