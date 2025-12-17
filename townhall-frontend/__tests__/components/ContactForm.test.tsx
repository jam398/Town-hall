import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '@/components/forms/ContactForm';

// Mock fetch
global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a subject/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for message too short', async () => {
    render(<ContactForm />);

    const messageInput = screen.getByLabelText(/message/i);
    fireEvent.change(messageInput, { target: { value: 'Hi' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Message sent' }),
    });

    render(<ContactForm />);

    // Fill in form
    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: 'Alex Johnson' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'alex.johnson@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: 'general' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'I have a question about your upcoming workshops.' },
    });

    // Submit
    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toContain('/contact');
      expect(options.method).toBe('POST');
      const body = JSON.parse(options.body);
      expect(body.name).toBe('Alex Johnson');
      expect(body.email).toBe('alex.johnson@example.com');
      expect(body.subject).toBe('general');
    });
  });

  it('shows success message after successful submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Message sent' }),
    });

    render(<ContactForm />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alex Johnson' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'general' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is my message to you.' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
      expect(screen.getByText(/thank you for reaching out/i)).toBeInTheDocument();
    });
  });

  it('shows error message when API call fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Failed to send message' }),
    });

    render(<ContactForm />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alex Johnson' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'general' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is my message to you.' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong|failed to send/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('allows sending another message after success', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alex' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'general' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });

    // Click "Send Another Message" button
    const sendAnotherButton = screen.getByText(/send another message/i);
    fireEvent.click(sendAnotherButton);

    // Form should be visible again
    await waitFor(() => {
      expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/your name/i)).toHaveValue('');
    });
  });

  it('disables submit button while submitting', async () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 100))
    );

    render(<ContactForm />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alex' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'general' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message here' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    // Button should be disabled during submission
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });
});
