import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { subscribeNewsletter } from '@/lib/api';

jest.mock('@/lib/api', () => ({
  subscribeNewsletter: jest.fn(),
  ApiError: class ApiError extends Error {
    constructor(message: string, public status: number) {
      super(message);
      this.name = 'ApiError';
    }
  },
}));

const mockSubscribeNewsletter = subscribeNewsletter as jest.MockedFunction<typeof subscribeNewsletter>;

describe('NewsletterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with email input and submit button', () => {
    render(<NewsletterForm />);
    
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('shows error for empty email submission', async () => {
    render(<NewsletterForm />);
    
    fireEvent.submit(screen.getByRole('button', { name: /subscribe/i }).closest('form')!);
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/email is required/i);
    });
  });

  it('shows error for invalid email format', async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.submit(screen.getByRole('button', { name: /subscribe/i }).closest('form')!);
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);
    });
  });

  it('submits form with valid email', async () => {
    mockSubscribeNewsletter.mockResolvedValueOnce({ 
      success: true, 
      message: 'Successfully subscribed!' 
    });
    
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(screen.getByRole('button', { name: /subscribe/i }).closest('form')!);
    
    await waitFor(() => {
      expect(mockSubscribeNewsletter).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  it('shows success message after successful subscription', async () => {
    mockSubscribeNewsletter.mockResolvedValueOnce({ 
      success: true, 
      message: 'Successfully subscribed!' 
    });
    
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(screen.getByRole('button', { name: /subscribe/i }).closest('form')!);
    
    await waitFor(() => {
      expect(screen.getByText(/you're subscribed/i)).toBeInTheDocument();
    });
  });

  it('shows loading state while submitting', async () => {
    mockSubscribeNewsletter.mockImplementation(() => new Promise(() => {}));
    
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(screen.getByRole('button', { name: /subscribe/i }).closest('form')!);
    
    await waitFor(() => {
      expect(screen.getByText(/subscribing/i)).toBeInTheDocument();
    });
  });

  it('shows error message on API failure', async () => {
    mockSubscribeNewsletter.mockRejectedValueOnce(new Error('Network error'));
    
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(screen.getByRole('button', { name: /subscribe/i }).closest('form')!);
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/failed to subscribe/i);
    });
  });

  it('renders privacy notice', () => {
    render(<NewsletterForm />);
    expect(screen.getByText(/we respect your privacy/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<NewsletterForm className="custom-class" />);
    expect(container.querySelector('form')).toHaveClass('custom-class');
  });
});
