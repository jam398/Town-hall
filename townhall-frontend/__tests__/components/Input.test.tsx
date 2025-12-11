import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input, Textarea, Select } from '@/components/ui/Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Input label="Name" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Input label="Password" helperText="Must be 8+ characters" />);
    expect(screen.getByText('Must be 8+ characters')).toBeInTheDocument();
  });

  it('applies error styles when error is present', () => {
    render(<Input label="Email" error="Invalid" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('border-swiss-error');
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(<Input label="Name" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Name');
    fireEvent.change(input, { target: { value: 'John' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Input label="Name" disabled />);
    expect(screen.getByLabelText('Name')).toBeDisabled();
  });

  it('supports different input types', () => {
    render(<Input label="Email" type="email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('applies custom className', () => {
    render(<Input label="Name" className="custom-input" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('custom-input');
  });
});

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders as textarea element', () => {
    render(<Textarea label="Message" />);
    const textarea = screen.getByLabelText('Message');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('shows error message', () => {
    render(<Textarea label="Message" error="Message is required" />);
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Textarea label="Bio" helperText="Max 500 characters" />);
    expect(screen.getByText('Max 500 characters')).toBeInTheDocument();
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(<Textarea label="Message" onChange={handleChange} />);
    
    const textarea = screen.getByLabelText('Message');
    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Textarea label="Message" disabled />);
    expect(screen.getByLabelText('Message')).toBeDisabled();
  });

  it('supports rows prop', () => {
    render(<Textarea label="Message" rows={6} />);
    expect(screen.getByLabelText('Message')).toHaveAttribute('rows', '6');
  });
});

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders with label', () => {
    render(<Select label="Category" options={options} />);
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select label="Category" options={options} />);
    
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
  });

  it('renders select element', () => {
    render(<Select label="Category" options={options} />);
    const select = screen.getByLabelText('Category');
    expect(select.tagName).toBe('SELECT');
  });

  it('shows error message', () => {
    render(<Select label="Category" options={options} error="Please select a category" />);
    expect(screen.getByText('Please select a category')).toBeInTheDocument();
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(<Select label="Category" options={options} onChange={handleChange} />);
    
    const select = screen.getByLabelText('Category');
    fireEvent.change(select, { target: { value: 'option2' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Select label="Category" options={options} disabled />);
    expect(screen.getByLabelText('Category')).toBeDisabled();
  });

  it('shows required indicator', () => {
    render(<Select label="Category" options={options} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
