import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TagFilter } from '@/components/ui/TagFilter';

describe('TagFilter', () => {
  const mockOnTagToggle = jest.fn();
  const mockOnClearAll = jest.fn();
  const defaultTags = ['AI', 'Workshop', 'Beginner', 'Advanced'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all tags', () => {
    render(
      <TagFilter 
        tags={defaultTags} 
        selectedTags={[]} 
        onTagToggle={mockOnTagToggle} 
      />
    );
    
    defaultTags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('calls onTagToggle when clicking a tag', () => {
    render(
      <TagFilter 
        tags={defaultTags} 
        selectedTags={[]} 
        onTagToggle={mockOnTagToggle} 
      />
    );
    
    fireEvent.click(screen.getByText('AI'));
    expect(mockOnTagToggle).toHaveBeenCalledWith('AI');
  });

  it('highlights selected tags', () => {
    render(
      <TagFilter 
        tags={defaultTags} 
        selectedTags={['AI', 'Workshop']} 
        onTagToggle={mockOnTagToggle} 
      />
    );
    
    const aiButton = screen.getByText('AI');
    const workshopButton = screen.getByText('Workshop');
    const beginnerButton = screen.getByText('Beginner');
    
    expect(aiButton).toHaveClass('bg-bauhaus-blue');
    expect(workshopButton).toHaveClass('bg-bauhaus-blue');
    expect(beginnerButton).not.toHaveClass('bg-bauhaus-blue');
  });

  it('sets aria-pressed correctly for selected tags', () => {
    render(
      <TagFilter 
        tags={defaultTags} 
        selectedTags={['AI']} 
        onTagToggle={mockOnTagToggle} 
      />
    );
    
    const aiButton = screen.getByText('AI');
    const workshopButton = screen.getByText('Workshop');
    
    expect(aiButton).toHaveAttribute('aria-pressed', 'true');
    expect(workshopButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows Clear All button when tags are selected and onClearAll is provided', () => {
    render(
      <TagFilter 
        tags={defaultTags} 
        selectedTags={['AI']} 
        onTagToggle={mockOnTagToggle}
        onClearAll={mockOnClearAll}
      />
    );
    
    expect(screen.getByText(/clear all/i)).toBeInTheDocument();
  });

  it('hides Clear All button when no tags are selected', () => {
    render(
      <TagFilter 
        tags={defaultTags} 
        selectedTags={[]} 
        onTagToggle={mockOnTagToggle}
        onClearAll={mockOnClearAll}
      />
    );
    
    expect(screen.queryByText(/clear all/i)).not.toBeInTheDocument();
  });

  it('hides Clear All button when onClearAll is not provided', () => {
    render(
      <TagFilter 
        tags={defaultTags} 
        selectedTags={['AI']} 
        onTagToggle={mockOnTagToggle}
      />
    );
    
    expect(screen.queryByText(/clear all/i)).not.toBeInTheDocument();
  });

  it('calls onClearAll when clicking Clear All button', () => {
    render(
      <TagFilter 
        tags={defaultTags} 
        selectedTags={['AI', 'Workshop']} 
        onTagToggle={mockOnTagToggle}
        onClearAll={mockOnClearAll}
      />
    );
    
    fireEvent.click(screen.getByText(/clear all/i));
    expect(mockOnClearAll).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TagFilter 
        tags={defaultTags} 
        selectedTags={[]} 
        onTagToggle={mockOnTagToggle}
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders empty when no tags provided', () => {
    const { container } = render(
      <TagFilter 
        tags={[]} 
        selectedTags={[]} 
        onTagToggle={mockOnTagToggle}
      />
    );
    
    // Should only have the container div with no buttons
    expect(container.querySelectorAll('button').length).toBe(0);
  });

  it('can toggle same tag multiple times', () => {
    render(
      <TagFilter 
        tags={defaultTags} 
        selectedTags={[]} 
        onTagToggle={mockOnTagToggle}
      />
    );
    
    const aiButton = screen.getByText('AI');
    
    fireEvent.click(aiButton);
    fireEvent.click(aiButton);
    fireEvent.click(aiButton);
    
    expect(mockOnTagToggle).toHaveBeenCalledTimes(3);
    expect(mockOnTagToggle).toHaveBeenCalledWith('AI');
  });
});
